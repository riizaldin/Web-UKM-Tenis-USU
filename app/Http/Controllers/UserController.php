<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\User;
use App\Models\Galeri;
use App\Models\Absensi;
use App\Models\KasBill;
use App\Models\KasExpense;
use App\Models\KasPayment;
use App\Models\GaleriPhotos;
use App\Models\GaleriLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // Home Dashboard
    public function home()
{
    $user = auth()->user();
    $tz = 'Asia/Jakarta';

    // Carbon instances in Asia/Jakarta
    $todayJkt = Carbon::today($tz);
    $nowJkt = Carbon::now($tz);
    $startOfMonthJkt = $nowJkt->copy()->startOfMonth();
    $endOfMonthJkt = $nowJkt->copy()->endOfMonth();
    $sevenDaysLaterJkt = $todayJkt->copy()->addDays(7)->endOfDay();

    // Statistics
    $totalMembers = User::count();

    $prevMonth = $nowJkt->copy()->subMonth();
    $previousMonthMembers = User::whereBetween('created_at', [
        $prevMonth->copy()->startOfMonth()->toDateTimeString(),
        $prevMonth->copy()->endOfMonth()->toDateTimeString(),
    ])->count();

    // Events this month (compare tanggal converted to Asia/Jakarta)
    $eventsThisMonth = Event::whereRaw(
        "DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) BETWEEN ? AND ?",
        [$startOfMonthJkt->toDateString(), $endOfMonthJkt->toDateString()]
    )->count();

    $latihanThisMonth = Event::whereRaw(
        "DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) BETWEEN ? AND ? AND tipe = ?",
        [$startOfMonthJkt->toDateString(), $endOfMonthJkt->toDateString(), 'latihan']
    )->count();

    $completedLatihan = Event::whereRaw(
        "DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) BETWEEN ? AND ? AND CONVERT_TZ(tanggal, '+00:00', '+07:00') < ? AND tipe = ?",
        [$startOfMonthJkt->toDateString(), $endOfMonthJkt->toDateString(), $todayJkt->toDateTimeString(), 'latihan']
    )->count();

    // Completed events this month (tanggal < today (Asia/Jakarta))
    $completedEvents = Event::whereRaw(
        "DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) BETWEEN ? AND ? AND CONVERT_TZ(tanggal, '+00:00', '+07:00') < ?",
        [$startOfMonthJkt->toDateString(), $endOfMonthJkt->toDateString(), $todayJkt->toDateTimeString()]
    )->count();

    // Attendance rate (attendance for events in this month)
    $totalAttendances = Absensi::whereHas('event', function ($query) use ($startOfMonthJkt, $endOfMonthJkt) {
        $query->whereRaw(
            "DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) BETWEEN ? AND ?",
            [$startOfMonthJkt->toDateString(), $endOfMonthJkt->toDateString()]
        );
    })->count();

    $expectedAttendances = $completedEvents * $totalMembers;
    $attendanceRate = $expectedAttendances > 0 ? round(($totalAttendances / $expectedAttendances) * 100) : 0;

    // Active tournaments (tanggal >= today in Asia/Jakarta)
    $activeTournaments = Event::whereRaw(
        "CONVERT_TZ(tanggal, '+00:00', '+07:00') >= ? AND tipe = ?",
        [$todayJkt->toDateTimeString(), 'turnamen']
    )->count();

    // Today's events (use between start and end of today in Asia/Jakarta)
    $todayEvents = Event::whereRaw(
            "CONVERT_TZ(tanggal, '+00:00', '+07:00') BETWEEN ? AND ?",
            [$todayJkt->copy()->startOfDay()->toDateTimeString(), $todayJkt->copy()->endOfDay()->toDateTimeString()]
        )
        ->with(['attendance' => function ($q) use ($user) {
            $q->where('user_id', $user->id);
        }])
        ->get();

    // Upcoming events (next 7 days) - consider date+time compared in Asia/Jakarta
    // We'll compare the full datetime formed by tanggal + waktu_selesai against current Jakarta datetime
    $upcomingEvents = Event::whereRaw(
        // compare tanggal datetime (tanggal + ' ' + waktu_selesai) converted to +07:00
        "CONCAT(DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')), ' ', TIME(waktu_selesai)) > ? 
         AND DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) <= ?",
        [$nowJkt->format('Y-m-d H:i:s'), $sevenDaysLaterJkt->toDateString()]
    )
    ->orderByRaw("DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) ASC")
    ->orderBy('waktu_mulai', 'asc')
    ->limit(5)
    ->get();

    // Recent activities
    $recentAttendances = Absensi::with(['user:id,name', 'event:id,nama_event'])
        ->orderBy('created_at', 'desc')
        ->limit(3)
        ->get()
        ->map(function ($item) {
            return [
                'type' => 'attendance',
                'user_name' => $item->user->name,
                'description' => 'melakukan absensi latihan',
                'time' => $item->created_at,
            ];
        });

    $recentGallery = Galeri::with('user:id,name')
        ->orderBy('created_at', 'desc')
        ->limit(2)
        ->get()
        ->map(function ($item) {
            return [
                'type' => 'gallery',
                'user_name' => $item->user->name,
                'description' => 'mengunggah foto galeri',
                'time' => $item->created_at,
            ];
        });

    $recentPayments = KasPayment::with('user:id,name')
        ->where('status', 'approved')
        ->orderBy('verified_at', 'desc')
        ->limit(2)
        ->get()
        ->map(function ($item) {
            return [
                'type' => 'payment',
                'user_name' => $item->user->name,
                'description' => 'melakukan pembayaran iuran',
                'time' => $item->verified_at,
            ];
        });

    $recentActivities = collect()
        ->concat($recentAttendances)
        ->concat($recentGallery)
        ->concat($recentPayments)
        ->sortByDesc('time')
        ->take(6)
        ->values();

    // All events for calendar display (future and current month) — convert tanggal to Jakarta Date for BETWEEN
    $allEvents = Event::whereRaw(
        "DATE(CONVERT_TZ(tanggal, '+00:00', '+07:00')) >= ?",
        [$todayJkt->copy()->startOfMonth()->toDateString()]
    )
    ->select('id', 'tanggal', 'nama_event')
    ->orderBy('tanggal', 'asc')
    ->get();

    return Inertia::render('Home', [
        'auth' => ['user' => $user],
        'statistics' => [
            'total_members' => $totalMembers,
            'new_members_this_month' => $previousMonthMembers,
            'latihan_this_month' => $latihanThisMonth,
            'completed_latihan' => $completedLatihan,
            'events_this_month' => $eventsThisMonth,
            'completed_events' => $completedEvents,
            'attendance_rate' => $attendanceRate,
            'active_tournaments' => $activeTournaments,
        ],
        'todayEvents' => $todayEvents,
        'upcomingEvents' => $upcomingEvents,
        'recentActivities' => $recentActivities,
        'allEvents' => $allEvents,
    ]);
}


    // Schedules
    public function schedules(){
        $auth = auth()->user();
        $events = Event::withCount('attendance')->orderBy('tanggal', 'desc')->orderBy('waktu_mulai', 'desc')->get();

        return Inertia::render('Schedules', [
            'auth' => ['user' => $auth],
            'schedules' => $events,
        ]);
    }

    // Attendance
    public function attendance(){
        $auth = auth()->user();

        $attendances = Absensi::with('event:id,nama_event')->where('user_id', auth()->id())->get();
        $attendedThisMonth = Absensi::where('user_id', auth()->id())
            ->whereHas('event', function ($query) {
                $query->whereYear('tanggal', Carbon::now('Asia/Jakarta')->year)
                      ->whereMonth('tanggal', Carbon::now('Asia/Jakarta')->month);
            })->count();
        $event_count = Event::count();
        $totalEventsThisMonth = Event::whereYear('tanggal', Carbon::now('Asia/Jakarta')->year)
            ->whereMonth('tanggal', Carbon::now('Asia/Jakarta')->month)
            ->count();
        return Inertia::render('Attendance', [
            'auth' => ['user' => $auth],
            'attendance' => $attendances,
            'event_count' => $event_count,
            'attended_this_month' => $attendedThisMonth,
            'total_events_this_month' => $totalEventsThisMonth,
        ]);
    }

    public function setAttendance(Request $request){
        $id = $request->query('id');

        $validated = $request->validate([
            'attendanceCode' => 'required|string|max:255',
        ]);

        $code = $validated['attendanceCode'];

        $event = Event::where('kode_absensi', $code)->first();

        if (!$event) {
            return redirect()->route('attendance')->with('error', 'Kode absensi tidak valid');
        }

        $existingAbsensi = Absensi::where('user_id', auth()->id())
            ->where('event_id', $event->id)
            ->first();

        if ($existingAbsensi) {
            return redirect()->route('attendance')->with('error', 'Anda sudah melakukan absensi untuk event ini.');
        }

        $today = Carbon::today()->toDateString();
        if ($event->tanggal !== $today) {
            return redirect()->route('attendance')->with('error', 'Absensi hanya bisa dilakukan pada hari kegiatan');
        }

        try {
            $start = Carbon::createFromFormat(
                'Y-m-d H:i:s', 
                "{$event->tanggal} {$event->waktu_mulai}", 
                'Asia/Jakarta'
            );
        } catch (\Exception $e) {
            return redirect()->route('attendance')->with('error', 'Waktu kegiatan tidak valid');
        }

        $now = Carbon::now('Asia/Jakarta');
        if ($event->waktu_selesai) {
            try {
                $end = Carbon::createFromFormat(
                    'Y-m-d H:i:s', 
                    "{$event->tanggal} {$event->waktu_selesai}", 
                    'Asia/Jakarta'
                );
            } catch (\Exception $e) {
                return redirect()->route('attendance')->with('error', 'Format waktu event tidak valid.');
            }
            
            if ($end->lessThanOrEqualTo($start)) {
                $end->addDay();
            }
            
            if (!$now->between($start, $end, true)) {
                return redirect()->route('attendance')->with('error', 'Absensi hanya bisa dilakukan saat kegiatan berlangsung!');
            }
        } else {
            if (!$now->isSameDay($start) || $now->lessThan($start)) {
                return redirect()->route('attendance')->with('error', 'Absensi hanya bisa dilakukan setelah kegiatan dimulai!');
            }
        }

        Absensi::create([
            'user_id' => auth()->id(),
            'event_id' => $event->id,
            'waktu_absen' => now('Asia/Jakarta'),
            'status' => 'hadir',
        ]);

        return redirect()->route('attendance')->with('success', 'Absensi berhasil dicatat!');
    }

    public function finance(){
        $user = auth()->user();
        
        // Get all bills for this user (both personal and global)
        $bills = KasBill::forUser($user->id)
            ->with(['payments' => function($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->orderBy('submitted_at', 'desc');
            }])
            ->orderBy('due_date', 'asc')
            ->get()
            ->map(function ($bill) use ($user) {
                // Calculate totals for this specific user
                $paidAmount = KasPayment::where('kas_bill_id', $bill->id)
                    ->where('user_id', $user->id)
                    ->where('status', 'approved')
                    ->sum('amount');
                
                $pendingAmount = KasPayment::where('kas_bill_id', $bill->id)
                    ->where('user_id', $user->id)
                    ->where('status', 'pending')
                    ->sum('amount');

                // Determine status for this bill for the current user.
                // Precedence: approved > pending > rejected > unpaid
                $userPayments = $bill->payments; // eager-loaded and already filtered to this user
                if ($userPayments->contains('status', 'approved')) {
                    $billStatus = 'approved';
                } elseif ($userPayments->contains('status', 'pending')) {
                    $billStatus = 'pending';
                } elseif ($userPayments->contains('status', 'rejected')) {
                    $billStatus = 'rejected';
                } else {
                    $billStatus = 'unpaid';
                }

                return [
                    'id' => $bill->id,
                    'title' => $bill->title,
                    'description' => $bill->description,
                    'amount' => $bill->amount,
                    'due_date' => $bill->due_date->format('Y-m-d'),
                    'bill_type' => $bill->bill_type,
                    'paid_amount' => $paidAmount,
                    'pending_amount' => $pendingAmount,
                    'remaining_amount' => max(0, $bill->amount - $paidAmount - $pendingAmount),
                    'status' => $billStatus, // computed per-user status
                    'payments' => $bill->payments->map(function ($payment) {
                        return [
                            'id' => $payment->id,
                            'amount' => $payment->amount,
                            'proof_image' => Storage::url($payment->proof_image),
                            'payment_notes' => $payment->payment_notes,
                            'status' => $payment->status,
                            'admin_notes' => $payment->admin_notes,
                            'submitted_at' => $payment->submitted_at->format('Y-m-d H:i'),
                            'verified_at' => $payment->verified_at?->format('Y-m-d H:i'),
                        ];
                    }),
                ];
            });

        // ---------- SUMMARY FIX ----------
        // total_unpaid: sum of remaining_amount for bills that are NOT fully approved for this user.
        // That way a bill with approved payment(s) is excluded even if DB table has no 'status' column.
        $totalUnpaid = $bills->filter(function($b) {
            return ($b['status'] ?? 'unpaid') !== 'approved';
        })->sum('remaining_amount');

        // keep existing semantics for pending/paid totals (they're per-user amounts)
        $totalPending = $bills->sum('pending_amount');
        $totalPaid = $bills->sum('paid_amount');

        $totalKas = KasPayment::where('status', 'approved')->sum('amount');
        $totalPemasukan3Bulan = KasPayment::where('status', 'approved')
            ->whereBetween('verified_at', [now()->subMonths(3), now()])
            ->sum('amount');

        // get the kas bill of each payment as well
        $payments = KasPayment::where('user_id', $user->id)
            ->with('bill')
            ->orderBy('submitted_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'bill_title' => $payment->bill->title,
                    'bill_type' => $payment->bill->bill_type,
                    'amount' => $payment->amount,
                    'proof' => basename($payment->proof_image), 
                    'payment_notes' => $payment->payment_notes,
                    'status' => $payment->status,
                    'admin_notes' => $payment->admin_notes,
                    'submitted_at' => $payment->submitted_at->format('Y-m-d H:i'),
                    'verified_at' => $payment->verified_at?->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('Finance', [
            'auth' => ['user' => $user],
            'bills' => $bills,
            'summary' => [
                'total_unpaid' => $totalUnpaid,
                'total_pending' => $totalPending,
                'total_paid' => $totalPaid,
            ],
            'total_kas' => $totalKas,
            'total_pemasukan_3_bulan' => $totalPemasukan3Bulan,            
            'payments_history' => $payments,
        ]);
    }



    public function financePay(Request $request){
        // kas_bill_id is an array
          $validated = $request->validate([
            'kas_bill_id' => 'required|exists:kas_bills,id',
            'amount' => 'required|numeric|min:0',
            'proof' => 'required|image|max:5120', // 5MB max
            'note' => 'nullable|string|max:500',
        ]);

        $billId = $validated['kas_bill_id'];
        $bill = KasBill::findOrFail($billId);
        
        // Check if user has access to this bill
        if (!$bill->is_global && $bill->user_id !== auth()->id()) {
            return back()->with('error', 'Anda tidak memiliki akses ke tagihan ini');
        }

        // Calculate remaining amount for this user
        $paidAmount = KasPayment::where('kas_bill_id', $bill->id)
            ->where('user_id', auth()->id())
            ->where('status', 'approved')
            ->sum('amount');
        
        $pendingAmount = KasPayment::where('kas_bill_id', $bill->id)
            ->where('user_id', auth()->id())
            ->where('status', 'pending')
            ->sum('amount');

        $remainingAmount = $bill->amount - $paidAmount - $pendingAmount;

        if ($validated['amount'] > $remainingAmount) {
            return back()->with('error', 'Jumlah pembayaran melebihi sisa tagihan');
        }

        // Store proof image
        $proofPath = $request->file('proof')->store('kas-payments', 'public');

        // Create payment record
        KasPayment::create([
            'kas_bill_id' => $validated['kas_bill_id'],
            'user_id' => auth()->id(),
            'amount' => $validated['amount'],
            'proof_image' => $proofPath,
            'payment_notes' => $validated['note'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Bukti pembayaran berhasil diupload. Menunggu verifikasi admin.');
    }

    public function submitPaymentProof(Request $request)
    {
        $validated = $request->validate([
            'kas_bill_id' => 'required|exists:kas_bills,id',
            'amount' => 'required|numeric|min:0',
            'proof_image' => 'required|image|max:5120', // 5MB max
            'payment_notes' => 'nullable|string|max:500',
        ]);

        $bill = KasBill::findOrFail($validated['kas_bill_id']);
        
        // Check if user has access to this bill
        if (!$bill->is_global && $bill->user_id !== auth()->id()) {
            return back()->with('error', 'Anda tidak memiliki akses ke tagihan ini');
        }

        // Store proof image
        $proofPath = $request->file('proof')->store('kas-payments', 'public');

        // Create payment record
        KasPayment::create([
            'kas_bill_id' => $validated['kas_bill_id'],
            'user_id' => auth()->id(),
            'amount' => $validated['amount'],
            'proof_image' => $proofPath,
            'payment_notes' => $validated['note'],
            'status' => 'pending',
            'submitted_at' => now('Asia/Jakarta'),
        ]);

        return back()->with('success', 'Bukti pembayaran berhasil diupload. Menunggu verifikasi admin.');
    }

    public function viewPaymentHistory()
    {
        $user = auth()->user();
        
        $payments = KasPayment::with(['bill', 'verifiedBy'])
            ->where('user_id', $user->id)
            ->orderBy('submitted_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'bill_title' => $payment->bill->title,
                    'amount' => $payment->amount,
                    'proof_image' => Storage::url($payment->proof_image),
                    'payment_notes' => $payment->payment_notes,
                    'status' => $payment->status,
                    'admin_notes' => $payment->admin_notes,
                    'verified_by_name' => $payment->verifiedBy?->name,
                    'submitted_at' => $payment->submitted_at->format('Y-m-d H:i'),
                    'verified_at' => $payment->verified_at?->format('Y-m-d H:i'),
                ];
            });

        return Inertia::render('PaymentHistory', [
            'auth' => ['user' => $user],
            'payments' => $payments,
        ]);
    }

    public function viewPaymentProof($filename)
    {
        $user = auth()->user();
        
        $path = 'kas-payments/' . $filename;
        
        if (!Storage::disk('public')->exists($path)) {
            abort(404, 'File not found');
        }

        $payment = KasPayment::where('proof_image', $path)->first();
        
        if (!$payment) {
            abort(404, 'Payment record not found');
        }

        if ($payment->user_id !== $user->id && $user->role !== 'admin') {
            abort(403, 'Unauthorized to view this payment proof');
        }

        $file = Storage::disk('public')->get($path);
        $mimeType = Storage::disk('public')->mimeType($path);

        return response($file, 200)->header('Content-Type', $mimeType);
    }

    public function reports(){
        $expense = KasExpense::all();
        $income = KasPayment::where('status', 'approved')
        ->with(['bill:id,title,description,bill_type'])
        ->with('user:id,name')
        ->get();
        return Inertia::render('Reports', [
            'expenses' => $expense,
            'income' => $income,
        ]);
    }

    public function gallery(){
        $user = auth()->user();
        $galleryItems = Galeri::with('photos')->with('user:id,name,nim')->withCount('likes')->get()->map(function($item) use ($user) {
            $item->is_liked = $item->isLikedBy($user->id);
            $item->like = $item->likes_count; // Add like count from relationship
            return $item;
        });

        $totalFoto = GaleriPhotos::count();
        $totalLikes = GaleriLike::count();
        $totalViews = Galeri::sum('view');

        return Inertia::render('Gallery', [
            'auth' => ['user' => $user],
            'galleryItems' => $galleryItems,
            'totalFoto' => $totalFoto,
            'totalLikes' => $totalLikes,
            'totalViews' => $totalViews,
        ]);
    }

    public function galleryUpload(){
        $user = auth()->user();
        return Inertia::render('GalleryUpload', [
            'auth' => ['user' => $user],
        ]);
    }

    public function handleGalleryUpload(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|in:latihan,turnamen,event,prestasi',
            'location' => 'string|max:255',
            'event_date' => 'date',
            'images' => 'required|array',
            'images.*' => 'required|image|max:10240'
        ]);

        $galeri = Galeri::create([
            'judul' => $validated['title'],
            'deskripsi' => $validated['description'],
            'kategori' => $validated['category'],
            'lokasi' => $validated['location'],
            'tanggal' => $validated['event_date'],
            'uploaded_by' => auth()->id(),
        ]); 

        foreach ($request->file('images') as $image) {
            $path = $image->store('gallery', 'public');

            GaleriPhotos::create([
                'galeri_id' => $galeri->id,
                'photo_path' => $path,
            ]);
        }

        return redirect()->route('gallery')->with('success', 'Foto galeri berhasil diupload!');
    }

    public function incrementGalleryView($id)
{
    $galeri = Galeri::findOrFail($id);
    $galeri->increment('view');

    return response()->json([
        'success' => true,
        'views'   => $galeri->view,
    ]);
}

    public function toggleGalleryLike($id){
        $user = auth()->user();
        $galeri = Galeri::findOrFail($id);
        
        $existingLike = GaleriLike::where('galeri_id', $id)
            ->where('user_id', $user->id)
            ->first();
        
        if ($existingLike) {
            $existingLike->delete();
            $isLiked = false;
        } else {
            GaleriLike::create([
                'galeri_id' => $id,
                'user_id' => $user->id,
            ]);
            $isLiked = true;
        }
        
        $newLikeCount = GaleriLike::where('galeri_id', $id)->count();
        
        return response()->json([
            'success' => true,
            'is_liked' => $isLiked,
            'new_like_count' => $newLikeCount
        ]);
    }

}
