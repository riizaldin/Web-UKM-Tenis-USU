<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\KasBill;
use App\Models\KasPayment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\KasExpense;
use App\Models\Heregistration;
use App\Models\HeregistrationPayment;

class AdminController extends Controller
{
    private function generateUniqueKodeAbsen(){
        do {
            $kode = Str::upper(Str::random(10));
        } while (Event::where('kode_absensi', $kode)->exists());

        return $kode;
    }

    public function index(){
        // Get real statistics
        $totalMembers = User::where('role', '!=', 'admin')->count();
        $totalEvents = Event::count();
        
        // Calculate total kas
        $kasIncome = KasPayment::where('status', 'approved')->sum('amount');
        $heregIncome = HeregistrationPayment::where('status', 'approved')->sum('amount');
        $totalIncome = $kasIncome + $heregIncome;
        $totalExpense = KasExpense::sum('amount');
        $totalKas = $totalIncome - $totalExpense;
        
        // Get total gallery photos
        $totalGalleryPhotos = \App\Models\GaleriPhotos::count();
        
        // Get recent activities (last 10)
        $recentActivities = collect();
        
        // Recent members (last 5)
        $recentMembers = User::where('role', '!=', 'admin')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($user) {
                return [
                    'type' => 'member',
                    'title' => 'Anggota Baru Bergabung',
                    'description' => $user->name . ' bergabung',
                    'time' => $user->created_at,
                ];
            });
        
        // Recent events (last 5)
        $recentEvents = Event::orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($event) {
                return [
                    'type' => 'event',
                    'title' => 'Event Dibuat',
                    'description' => $event->nama_event,
                    'time' => $event->created_at,
                ];
            });
        
        // Recent approved payments (last 5)
        $recentPayments = KasPayment::where('status', 'approved')
            ->with('user')
            ->orderBy('verified_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($payment) {
                return [
                    'type' => 'payment',
                    'title' => 'Pembayaran Diterima',
                    'description' => $payment->user->name . ' - Rp ' . number_format($payment->amount, 0, ',', '.'),
                    'time' => $payment->verified_at,
                ];
            });
        
        // Recent gallery uploads (last 5)
        $recentGallery = \App\Models\Galeri::orderBy('created_at', 'desc')
            ->with('user')
            ->limit(5)
            ->get()
            ->map(function ($galeri) {
                return [
                    'type' => 'gallery',
                    'title' => 'Galeri Diupload',
                    'description' => $galeri->judul . ' oleh ' . $galeri->user->name,
                    'time' => $galeri->created_at,
                ];
            });
        
        // Combine and sort all activities
        $recentActivities = $recentMembers
            ->concat($recentEvents)
            ->concat($recentPayments)
            ->concat($recentGallery)
            ->sortByDesc('time')
            ->take(10)
            ->values();
        
        // Get upcoming events
        $upcomingEvents = Event::where('tanggal', '>=', now()->toDateString())
            ->orderBy('tanggal')
            ->orderBy('waktu_mulai')
            ->limit(10)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'nama_event' => $event->nama_event,
                    'tanggal' => $event->tanggal,
                    'waktu_mulai' => $event->waktu_mulai,
                    'waktu_selesai' => $event->waktu_selesai,
                    'tipe' => $event->tipe,
                    'lokasi' => $event->lokasi,
                    'deskripsi' => $event->deskripsi,
                ];
            });

        return Inertia::render('AdminPage', [
            'auth' => auth()->user(),
            'stats' => [
                'total_members' => $totalMembers,
                'total_events' => $totalEvents,
                'total_kas' => $totalKas,
                'total_gallery_photos' => $totalGalleryPhotos,
            ],
            'recent_activities' => $recentActivities,
            'upcoming_events' => $upcomingEvents,
        ]);
    }

    public function member(){
        // Get all users except admins with their latest heregistration payment
        $members = User::where('role', '!=', 'admin')
            ->with(['heregistrationPayments' => function($query) {
                $query->where('status', 'approved')
                    ->latest('verified_at')
                    ->limit(1);
            }])
            ->orderBy('name')
            ->get()
            ->map(function ($user) {
                $latestHeregPayment = $user->heregistrationPayments->first();
                
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'nim' => $user->nim ?? 'N/A',
                    'email' => $user->email,
                    'phone' => $user->no_whatsapp ?? 'N/A',
                    'no_whatsapp' => $user->no_whatsapp ?? 'N/A',
                    'angkatan' => $user->angkatan ?? 'N/A',
                    'fakultas' => $user->fakultas ?? 'N/A',
                    'jurusan' => $user->jurusan ?? 'N/A',
                    'alamat' => $user->alamat ?? 'N/A',
                    'profile_photo_url' => $user->pasfoto ? Storage::url($user->pasfoto) : null,
                    'ktm_url' => $user->ktm ? Storage::url($user->ktm) : null,
                    'joined_at' => $user->created_at->format('Y-m-d'),
                    're_reg_date' => $latestHeregPayment ? $latestHeregPayment->verified_at->format('Y-m-d') : null,
                    'status' => $latestHeregPayment ? 'registered' : 'unregistered',
                    'logs' => [],
                    'kas_details' => [
                        'total' => 0,
                        'transactions' => [],
                    ],
                ];
            });

        return Inertia::render('Admin/Members', [
            'members' => $members,
            'auth' => auth()->user(),
        ]);
    }

    public function showMembers($id)
    {
        $user = User::with(['kasPayments.bill'])
                    ->findOrFail($id);

        // Hitung total kas dari approved payments
        $totalKas = $user->kasPayments->where('status', 'approved')->sum('amount');

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
                'transactions' => $user->kasPayments->where('status', 'approved')->map(function ($payment) {
                    return [
                        'date' => $payment->verified_at?->format('Y-m-d'),
                        'description' => $payment->bill->title ?? 'Pembayaran Kas',
                        'amount' => $payment->amount,
                        'type' => 'income',
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

        // Calculate summary - include both kas and heregistration payments
        $kasIncome = KasPayment::where('status', 'approved')->sum('amount');
        $heregIncome = HeregistrationPayment::where('status', 'approved')->sum('amount');
        $totalIncome = $kasIncome + $heregIncome;
        $totalExpense = KasExpense::sum('amount');
        $totalKas = $totalIncome - $totalExpense;

        // Get total member count (excluding admins)
        $totalMembers = User::where('role', '!=', 'admin')->count();

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
            ->map(function ($bill) use ($totalMembers) {
                $totalPaid = $bill->approvedPayments()->sum('amount');
                $totalPending = $bill->pendingPayments()->sum('amount');
                
                // For global bills, calculate how many members have paid
                $membersPaid = 0;
                $membersPending = 0;
                if ($bill->is_global) {
                    $membersPaid = KasPayment::where('kas_bill_id', $bill->id)
                        ->where('status', 'approved')
                        ->whereHas('user', function($q) {
                            $q->where('role', '!=', 'admin');
                        })
                        ->distinct('user_id')
                        ->count('user_id');
                    
                    $membersPending = KasPayment::where('kas_bill_id', $bill->id)
                        ->where('status', 'pending')
                        ->whereHas('user', function($q) {
                            $q->where('role', '!=', 'admin');
                        })
                        ->distinct('user_id')
                        ->count('user_id');
                }
                
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
                    'rejected_count' => $bill->rejected_count,
                    'members_paid' => $membersPaid,
                    'members_pending' => $membersPending,
                    'total_members' => $bill->is_global ? $totalMembers : 1,
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

        // Calculate summary - include both kas and heregistration payments
        $kasIncome = KasPayment::where('status', 'approved')->sum('amount');
        $heregIncome = HeregistrationPayment::where('status', 'approved')->sum('amount');
        $totalIncome = $kasIncome + $heregIncome;
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

    // ==================== HEREGISTRATION METHODS ====================

    public function heregistration()
    {
        $periods = Heregistration::withCount([
            'payments as total_registered',
            'pendingPayments as pending_count',
            'approvedPayments as approved_count',
            'rejectedPayments as rejected_count'
        ])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($period) {
            $totalUsers = User::where('role', '!=', 'admin')->count();
            $approvedCount = $period->approvedPayments()->count();
            $pendingCount = $period->pendingPayments()->count();
            
            return [
                'id' => $period->id,
                'semester' => $period->semester,
                'academic_year' => $period->academic_year,
                'fee_amount' => $period->fee_amount,
                'start_date' => $period->start_date->format('Y-m-d'),
                'end_date' => $period->end_date->format('Y-m-d'),
                'is_active' => $period->is_active,
                'description' => $period->description,
                'total_users' => $totalUsers,
                'approved_count' => $approvedCount,
                'pending_count' => $pendingCount,
                'rejected_count' => $period->rejected_count,
                'completion_percentage' => $totalUsers > 0 ? round(($approvedCount / $totalUsers) * 100, 2) : 0,
            ];
        });

        return Inertia::render('Admin/Heregistration', [
            'periods' => $periods,
            'auth' => auth()->user(),
        ]);
    }

    public function createHeregistration(Request $request)
    {
        $validated = $request->validate([
            'semester' => 'required|string|in:Ganjil,Genap',
            'academic_year' => 'required|string',
            'fee_amount' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
        ]);

        Heregistration::create($validated);

        return redirect()->route('admin.heregistration.index')->with('success', 'Periode heregistrasi berhasil dibuat!');
    }

    public function activateHeregistration($id)
    {
        // Deactivate all periods
        Heregistration::query()->update(['is_active' => false]);
        
        // Activate selected period
        $period = Heregistration::findOrFail($id);
        $period->update(['is_active' => true]);

        return redirect()->route('admin.heregistration.index')->with('success', 'Mode heregistrasi diaktifkan untuk periode ' . $period->semester . ' ' . $period->academic_year);
    }

    public function viewHeregistrationPayments($id)
    {
        $period = Heregistration::findOrFail($id);
        
        $payments = HeregistrationPayment::with('user')
            ->where('heregistration_id', $id)
            ->orderByRaw("CASE WHEN status = 'pending' THEN 1 WHEN status = 'approved' THEN 2 ELSE 3 END")
            ->orderBy('submitted_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'user_name' => $payment->user->name,
                    'user_email' => $payment->user->email,
                    'user_nim' => $payment->user->nim,
                    'amount' => $payment->amount,
                    'proof' => basename($payment->proof_image),
                    'payment_notes' => $payment->payment_notes,
                    'status' => $payment->status,
                    'admin_notes' => $payment->admin_notes,
                    'submitted_at' => $payment->submitted_at->format('Y-m-d H:i:s'),
                    'verified_at' => $payment->verified_at?->format('Y-m-d H:i:s'),
                ];
            });

        $totalUsers = User::where('role', '!=', 'admin')->count();
        $approvedCount = HeregistrationPayment::where('heregistration_id', $id)
            ->where('status', 'approved')
            ->count();
        $pendingCount = HeregistrationPayment::where('heregistration_id', $id)
            ->where('status', 'pending')
            ->count();

        $periodData = [
            'id' => $period->id,
            'semester' => $period->semester,
            'academic_year' => $period->academic_year,
            'fee_amount' => $period->fee_amount,
            'start_date' => $period->start_date->format('Y-m-d'),
            'end_date' => $period->end_date->format('Y-m-d'),
            'is_active' => $period->is_active,
            'description' => $period->description,
            'total_users' => $totalUsers,
            'approved_count' => $approvedCount,
            'pending_count' => $pendingCount,
            'completion_percentage' => $totalUsers > 0 ? round(($approvedCount / $totalUsers) * 100, 2) : 0,
        ];

        return Inertia::render('Admin/HeregistrationPayments', [
            'period' => $periodData,
            'payments' => $payments,
            'auth' => auth()->user(),
        ]);
    }

    public function approveHeregistrationPayment(Request $request, $id)
    {
        $validated = $request->validate([
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $payment = HeregistrationPayment::findOrFail($id);

        if ($payment->status !== 'pending') {
            return back()->with('error', 'Pembayaran sudah diverifikasi sebelumnya');
        }

        $payment->update([
            'status' => 'approved',
            'admin_notes' => $validated['admin_notes'] ?? null,
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pembayaran heregistrasi berhasil disetujui!');
    }

    public function rejectHeregistrationPayment(Request $request, $id)
    {
        $validated = $request->validate([
            'admin_notes' => 'required|string|max:500',
        ]);

        $payment = HeregistrationPayment::findOrFail($id);

        if ($payment->status !== 'pending') {
            return back()->with('error', 'Pembayaran sudah diverifikasi sebelumnya');
        }

        $payment->update([
            'status' => 'rejected',
            'admin_notes' => $validated['admin_notes'],
            'verified_by' => auth()->id(),
            'verified_at' => now(),
        ]);

        return back()->with('success', 'Pembayaran heregistrasi ditolak');
    }

    public function viewHeregistrationProof($filename)
    {
        $user = auth()->user();
        
        if ($user->role !== 'admin') {
            abort(403, 'Unauthorized to view proof');
        }

        $path = 'heregistration_payments/' . $filename;
        
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'File not found');
        }

        $file = Storage::disk('public')->get($path);
        $mimeType = Storage::disk('public')->mimeType($path);
        
        return response($file)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="' . $filename . '"');
    }

    // ==================== GALLERY MANAGEMENT ====================

    public function galleryManagement()
    {
        $galleries = \App\Models\Galeri::with(['user:id,name,nim', 'photos'])
            ->withCount('likes')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($galeri) {
                return [
                    'id' => $galeri->id,
                    'judul' => $galeri->judul,
                    'deskripsi' => $galeri->deskripsi,
                    'kategori' => $galeri->kategori,
                    'lokasi' => $galeri->lokasi,
                    'tanggal' => $galeri->tanggal,
                    'uploaded_by' => $galeri->user->name ?? 'Unknown',
                    'uploaded_by_nim' => $galeri->user->nim ?? 'N/A',
                    'view' => $galeri->view,
                    'likes_count' => $galeri->likes_count,
                    'photos_count' => $galeri->photos->count(),
                    'photos' => $galeri->photos->map(function ($photo) {
                        return [
                            'id' => $photo->id,
                            'photo_url' => Storage::url($photo->photo_path),
                        ];
                    }),
                    'created_at' => $galeri->created_at->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('Admin/GalleryManagement', [
            'galleries' => $galleries,
            'auth' => auth()->user(),
        ]);
    }

    public function deleteGallery($id)
    {
        $galeri = \App\Models\Galeri::findOrFail($id);
        
        // Delete all photos and their files
        foreach ($galeri->photos as $photo) {
            if (Storage::disk('public')->exists($photo->photo_path)) {
                Storage::disk('public')->delete($photo->photo_path);
            }
            $photo->delete();
        }

        // Delete all likes
        $galeri->likes()->delete();

        // Delete the gallery
        $galeri->delete();

        return redirect()->route('admin.gallery.management')->with('success', 'Galeri berhasil dihapus!');
    }

    public function deleteGalleryPhoto($id)
    {
        $photo = \App\Models\GaleriPhotos::findOrFail($id);
        $galeriId = $photo->galeri_id;
        
        // Delete the file
        if (Storage::disk('public')->exists($photo->photo_path)) {
            Storage::disk('public')->delete($photo->photo_path);
        }
        
        $photo->delete();

        // Check if gallery has no more photos, delete the gallery
        $galeri = \App\Models\Galeri::find($galeriId);
        if ($galeri && $galeri->photos()->count() === 0) {
            $galeri->likes()->delete();
            $galeri->delete();
            return redirect()->route('admin.gallery.management')->with('success', 'Foto terakhir dihapus, galeri ikut dihapus!');
        }

        return back()->with('success', 'Foto berhasil dihapus!');
    }
}
