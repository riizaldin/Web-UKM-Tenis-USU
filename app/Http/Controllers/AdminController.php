<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\KasBill;
use App\Models\KasPayment;
use App\Models\KasTransaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\KasExpense;

class AdminController extends Controller
{
    private function generateUniqueKodeAbsen(){
        do {
            $kode = Str::upper(Str::random(10));
        } while (Event::where('kode_absensi', $kode)->exists());

        return $kode;
    }

    public function index(){
        return Inertia::render('AdminPage');
    }

    public function member(){
        return Inertia::render('Admin/Members');
    }

    public function showMembers($id)
    {
        $user = User::with(['logs', 'kasTransactions'])  // Load relasi (sekarang kasTransactions ready)
                    ->findOrFail($id);

        // Hitung total kas: income positif, expense negatif
        $totalKas = $user->kasTransactions->sum(function ($tx) {
            return $tx->type === 'income' ? $tx->amount : -$tx->amount;
        });

        $transformedUser = [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username ?? 'Tidak tersedia',
            'nim' => $user->nim ?? 'Tidak tersedia',
            'fakultas' => $user->fakultas ?? 'Tidak tersedia',
            'jurusan' => $user->jurusan ?? 'Tidak tersedia',
            'angkatan' => $user->angkatan ?? 'Tidak tersedia',
            'no_whatsapp' => $user->no_whatsapp ?? 'Tidak tersedia',
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at?->format('Y-m-d H:i') ?? null,
            'phone' => $user->no_whatsapp ?? 'Tidak tersedia',
            'address' => 'Tidak tersedia',  // Tambah field nanti
            'profile_photo_url' => $user->pasfoto ? Storage::url($user->pasfoto) : null,
            'ktm_url' => $user->ktm ? Storage::url($user->ktm) : null,
            're_reg_date' => null,  // Tambah field nanti
            'status' => 'active',
            'joined_at' => $user->created_at?->format('Y-m-d'),
            'logs' => $user->logs->map(function ($log) {
                return [
                    'date' => $log->created_at?->format('Y-m-d H:i'),
                    'action' => $log->action ?? 'Unknown',
                    'description' => $log->description ?? 'No description',
                ];
            }),
            'kas_details' => [
                'total' => $totalKas,  // Hitung real dari relasi
                'transactions' => $user->kasTransactions->map(function ($tx) {
                    return [
                        'date' => $tx->created_at?->format('Y-m-d'),
                        'description' => $tx->description ?? 'No description',
                        'amount' => $tx->amount,  // Tampilkan positif, sign dari type
                        'type' => $tx->type,  // 'income' atau 'expense'
                    ];
                }),
            ],
        ];

        return inertia('Admin/MemberDetail', [
            'member' => $transformedUser,
            'auth' => auth()->user(),
        ]);
    }

    public function attendance(){

        $attendances = Event::withCount('attendance')->orderBy('tanggal', 'desc')->orderBy('waktu_mulai', 'desc')->get();

        return Inertia::render('Admin/Absensi', [ 
            'attendances' => $attendances,
            'auth' => auth()->user(),
        ]);
    }

    public function storeAttendance(Request $request){

        $request->validate([
            'date' => 'required|date',
            'start_time' => 'required',
            'end_time' => 'required',
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:latihan,turnamen,lainnya',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'pelatih' => 'nullable|string|max:255',
            'hadiah' => 'nullable|string|max:255',
        ]);

        $kodeAbsensi = $this->generateUniqueKodeAbsen();

        // Simpan data absensi ke database
        Event::create([
            'tanggal' => $request->input('date'),
            'waktu_mulai' => $request->input('start_time'),
            'waktu_selesai' => $request->input('end_time'),
            'nama_event' => $request->input('name'),
            'tipe' => $request->input('type'),
            'lokasi' => $request->input('location'),
            'deskripsi' => $request->input('description'),
            'pelatih' => $request->input('pelatih'),
            'hadiah' => $request->input('hadiah'),
            'kode_absensi' => $kodeAbsensi,
        ]);

        return redirect()->route('admin.attendance')->with('message', 'Absensi berhasil dibuat!');
    }

    public function kas () {
        // Get all transactions
        $transactions = KasExpense::orderBy('created_at', 'desc')
            ->get()
            ->map(function ($tx) {
                return [
                    'id' => $tx->id,
                    'date' => $tx->date,
                    'description' => $tx->expense ?? 'No description',
                    'amount' => $tx->amount,
                    'proof_image' => basename($tx->proof_image), // Just the filename for protected route
                ];
            });

        // Calculate summary
        $totalIncome = KasPayment::where('status', 'approved')->sum('amount');
        $totalExpense = KasExpense::sum('amount');
        $totalKas = $totalIncome - $totalExpense;

        // Get all bills
        $bills = KasBill::with(['user', 'payments'])
            ->withCount([
                'payments as pending_count' => function ($query) {
                    $query->where('status', 'pending');
                },
                'payments as approved_count' => function ($query) {
                    $query->where('status', 'approved');
                },
                'payments as rejected_count' => function ($query) {
                    $query->where('status', 'rejected');
                }
            ])
            ->orderBy('due_date', 'desc')
            ->get()
            ->map(function ($bill) {
                $totalPaid = $bill->approvedPayments()->sum('amount');
                $totalPending = $bill->pendingPayments()->sum('amount');    
                
                return [
                    'id' => $bill->id,
                    'title' => $bill->title,
                    'description' => $bill->description,
                    'amount' => $bill->amount,
                    'due_date' => $bill->due_date->format('Y-m-d'),
                    'status' => $bill->status,
                    'bill_type' => $bill->bill_type,
                    'is_global' => $bill->is_global,
                    'user_name' => $bill->user?->name ?? 'Semua Anggota',
                    'total_paid' => $totalPaid,
                    'total_pending' => $totalPending,
                    'remaining' => max(0, $bill->amount - $totalPaid),
                    'pending_count' => $bill->pending_count,
                    'approved_count' => $bill->approved_count,
                    'rejected_count' => $bill->rejected_count
                ];
            });

        // Get all users for the bill form
        $users = User::select('id', 'name', 'email')
        ->where('id', '!=', auth()->id())
        ->orderBy('name')
        ->get();

        return Inertia::render('Admin/Kas', [
            'transactions' => $transactions,
            'bills' => $bills,
            'users' => $users,
            'total_kas' => $totalKas,
            'total_income' => $totalIncome,
            'total_expense' => $totalExpense,
            'auth' => auth()->user(),
        ]);
    }

    public function kasBills () {
        // Get all bills with payment counts
        $bills = KasBill::with(['user', 'payments'])
            ->withCount([
                'payments as pending_count' => function ($query) {
                    $query->where('status', 'pending');
                },
                'payments as approved_count' => function ($query) {
                    $query->where('status', 'approved');
                }
            ])
            ->orderBy('due_date', 'desc')
            ->get()
            ->map(function ($bill) {
                $totalPaid = $bill->approvedPayments()->sum('amount');
                $totalPending = $bill->pendingPayments()->sum('amount');
                
                return [
                    'id' => $bill->id,
                    'title' => $bill->title,
                    'description' => $bill->description,
                    'amount' => $bill->amount,
                    'due_date' => $bill->due_date->format('Y-m-d'),
                    'status' => $bill->status,
                    'bill_type' => $bill->bill_type,
                    'is_global' => $bill->is_global,
                    'user_name' => $bill->user?->name ?? 'Semua Anggota',
                    'total_paid' => $totalPaid,
                    'total_pending' => $totalPending,
                    'remaining' => max(0, $bill->amount - $totalPaid),
                    'pending_count' => $bill->pending_count,
                    'approved_count' => $bill->approved_count,
                ];
            });

        // Get pending payments
        $pendingPayments = KasPayment::with(['user', 'bill'])
            ->where('status', 'pending')
            ->orderBy('submitted_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user_name' => $payment->user->name,
                    'user_id' => $payment->user_id,
                    'bill_title' => $payment->bill->title,
                    'amount' => $payment->amount,
                    'proof_image' => Storage::url($payment->proof_image),
                    'payment_notes' => $payment->payment_notes,
                    'submitted_at' => $payment->submitted_at->format('Y-m-d H:i'),
                ];
            });

        // Calculate summary
        $totalIncome = KasPayment::where('status', 'approved')->sum('amount');
        $totalBills = KasBill::sum('amount');
        $totalUnpaid = $bills->sum('remaining');

        return Inertia::render('Admin/KasBills', [
            'bills' => $bills,
            'pending_payments' => $pendingPayments,
            'summary' => [
                'total_income' => $totalIncome,
                'total_bills' => $totalBills,
                'total_unpaid' => $totalUnpaid,
                'pending_count' => $pendingPayments->count(),
            ],
            'auth' => auth()->user(),
        ]);
    }

    public function createKasBill(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0|max:1000000000',
            'due_date' => 'required|date',
            'bill_type' => 'required|in:monthly,event,penalty,other',
            'is_global' => 'required|boolean',
            'user_id' => 'nullable|exists:users,id|required_if:is_global,false',
        ]);

        KasBill::create($validated);

        return redirect()->route('admin.kas')->with('success', 'Tagihan berhasil dibuat!');
    }

    public function viewPendingPayments()
    {
        $pendingPayments = KasPayment::with(['user', 'bill'])
            ->where('status', 'pending')
            ->orderBy('submitted_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user' => [
                        'id' => $payment->user->id,
                        'name' => $payment->user->name,
                        'email' => $payment->user->email,
                    ],
                    'bill' => [
                        'id' => $payment->bill->id,
                        'title' => $payment->bill->title,
                        'amount' => $payment->bill->amount,
                    ],
                    'amount' => $payment->amount,
                    'proof_image' => Storage::url($payment->proof_image),
                    'payment_notes' => $payment->payment_notes,
                    'submitted_at' => $payment->submitted_at->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('Admin/PendingPayments', [
            'pending_payments' => $pendingPayments,
            'auth' => auth()->user(),
        ]);
    }

    public function reviewBillPayments($billId)
    {
        $bill = KasBill::findOrFail($billId);
        
        // Get pending payments for this bill
        $pendingPayments = KasPayment::with('user')
            ->where('kas_bill_id', $billId)
            ->where('status', 'pending')
            ->orderBy('submitted_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user_name' => $payment->user->name,
                    'user_email' => $payment->user->email,
                    'amount' => $payment->amount,
                    'proof' => basename($payment->proof_image), // Just the filename
                    'payment_notes' => $payment->payment_notes,
                    'submitted_at' => $payment->submitted_at->format('Y-m-d H:i:s'),
                ];
            });

        // Calculate bill statistics
        $totalPaid = KasPayment::where('kas_bill_id', $billId)
            ->where('status', 'approved')
            ->sum('amount');
        
        $totalPending = KasPayment::where('kas_bill_id', $billId)
            ->where('status', 'pending')
            ->sum('amount');

        $billData = [
            'id' => $bill->id,
            'title' => $bill->title,
            'description' => $bill->description,
            'amount' => $bill->amount,
            'due_date' => $bill->due_date->format('Y-m-d'),
            'bill_type' => $bill->bill_type,
            'status' => $bill->status,
            'is_global' => $bill->is_global,
            'total_paid' => $totalPaid,
            'total_pending' => $totalPending,
            'remaining' => max(0, $bill->amount - $totalPaid - $totalPending),
        ];

        return Inertia::render('Admin/KasBillReview', [
            'bill' => $billData,
            'pending_payments' => $pendingPayments,
            'auth' => auth()->user(),
        ]);
    }

    public function approvePayment(Request $request, $id)
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $payment = KasPayment::with('bill')->findOrFail($id);

        if ($payment->status !== 'pending') {
            return back()->with('error', 'Pembayaran sudah diverifikasi sebelumnya');
        }

        // Update payment status
        $payment->update([
            'status' => 'approved',
            'admin_notes' => $validated['admin_notes'] ?? null,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pembayaran berhasil disetujui!');
    }

    public function rejectPayment(Request $request, $id)
    {
        $validated = $request->validate([
            'admin_notes' => 'required|string|max:500',
        ]);

        $payment = KasPayment::findOrFail($id);

        if ($payment->status !== 'pending') {
            return back()->with('error', 'Pembayaran sudah diverifikasi sebelumnya');
        }

        $payment->update([
            'status' => 'rejected',
            'admin_notes' => $validated['admin_notes'],
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        $hasApprovedPayments = KasPayment::where('kas_bill_id', $payment->kas_bill_id)
            ->where('user_id', $payment->user_id)
            ->where('status', 'approved')
            ->exists();

        return back()->with('success', 'Pembayaran ditolak');
    }

    public function deleteKasBill($id)
    {
        $bill = KasBill::findOrFail($id);
        
        // Check if there are any approved payments
        if ($bill->approvedPayments()->exists()) {
            return back()->with('error', 'Tidak dapat menghapus tagihan yang sudah memiliki pembayaran yang disetujui');
        }

        // Delete associated pending/rejected payments and their proof images
        foreach ($bill->payments as $payment) {
            if (Storage::disk('public')->exists($payment->proof_image)) {
                Storage::disk('public')->delete($payment->proof_image);
            }
            $payment->delete();
        }

        $bill->delete();

        return back()->with('success', 'Tagihan berhasil dihapus');
    }

    public function addExpense(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'proof' => 'required|image|max:2048',
            'description' => 'required|string',
        ]);

        // Handle file upload
        $path = $request->file('proof')->store('kas_expenses', 'public');

        // Create expense record
        KasExpense::create([
            'amount' => $validated['amount'],
            'date' => $validated['date'],
            'proof_image' => $path,
            'expense' => $validated['description'] ?? null,
        ]);

        return redirect()->route('admin.kas')->with('success', 'Pengeluaran kas berhasil ditambahkan!');
    }

    public function viewExpenseProof($filename)
    {
        $user = auth()->user();
        
        if ($user->role !== 'admin') {
            abort(403, 'Unauthorized to view proof');
        }

        $path = 'kas_expenses/' . $filename;
        
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'File not found');
        }

        $file = Storage::disk('public')->get($path);
        $mimeType = Storage::disk('public')->mimeType($path);
        
        return response($file)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="' . $filename . '"');
    }
}
