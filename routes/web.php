<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\ProfileCompleted;
use League\CommonMark\Node\Block\Document;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\User\ScheduleController;

// Landing Page (publik, default)
Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->name('landing');

// Route::get('/home', function () {
//     return Inertia::render('Home', [
//         'auth' => [
//             'user' => Auth::user(),
//         ],
//     ]);
// })->middleware(['auth', 'verified', ProfileCompleted::class])->name('home');

Route::get('/home', [UserController::class, 'home'])->middleware('auth')->name('home');

// Schedules
Route::get('/schedules', [UserController::class, 'schedules'])->name('schedules');

// Attendance
Route::get('/attendance', [UserController::class, 'attendance'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('attendance');

Route::get('/attendance/set', [UserController::class, 'routeAttendance'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('set-attendance.form');

Route::post('/attendance/set', [UserController::class, 'setAttendance'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('set-attendance');

// Gallery
Route::get('/gallery', [UserController::class, 'gallery'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery');

Route::get('/gallery/upload', [UserController::class, 'galleryUpload'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery.upload');

Route::post('/gallery/store', [UserController::class, 'handleGalleryUpload'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery.store');

Route::post('/gallery/{id}/increment-view', [UserController::class, 'incrementGalleryView'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery.increment-view');

Route::post('/gallery/{id}/toggle-like', [UserController::class, 'toggleGalleryLike'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery.toggle-like');

// Finance (KAS)
Route::get('/finance', [UserController::class, 'finance'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('finance');

Route::post('/finance/pay', [UserController::class, 'financePay'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('finance-pay');

Route::get('/finance/proof/{filename}', [UserController::class, 'viewPaymentProof'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('finance.proof');

// Kas - User Routes
Route::middleware(['auth', 'verified', ProfileCompleted::class])->group(function () {
    Route::get('/kas', [UserController::class, 'viewKas'])->name('kas.view');
    Route::post('/kas/submit-payment', [UserController::class, 'submitPaymentProof'])->name('user.kas.submit-payment');
    Route::get('/kas/payment-history', [UserController::class, 'viewPaymentHistory'])->name('kas.payment.history');
});

Route::get('/evaluation', function () {
    return Inertia::render('Evaluation', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('evaluation');

Route::post('/evaluation/store', function () {
    // Backend implementation untuk menyimpan penilaian
    return redirect()->route('evaluation')->with('success', 'Penilaian berhasil dikirim!');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('evaluation.store');

Route::get('/reports', [UserController::class, 'reports'])->middleware(['auth', 'verified', ProfileCompleted::class])->name('reports');

Route::get('/complete-profile', function () {
    return Inertia::render('Auth/CompleteProfile');
})->middleware(['auth', 'verified'])->name('complete-profile');

Route::get('/admin', [AdminController::class, 'index'])->name('admin');

Route::get('/admin/members', [AdminController::class, 'member'])->name('admin.members');

Route::get('/admin/members/{id}', [AdminController::class, 'showMembers'])->name('admin.members.detail');

Route::get('/admin/attendance', [AdminController::class, 'attendance'])->name('admin.attendance');

Route::post('/admin/attendance', [AdminController::class, 'storeAttendance'])->name('admin.attendance.store');

Route::get('/admin/kas', [AdminController::class, 'kas'])->name('admin.kas');
Route::get('/admin/kas/bills', [AdminController::class, 'kasBills'])->name('admin.kas.bills');

// Kas - Admin Routes
Route::prefix('admin/kas')->name('admin.kas.')->group(function () {
    Route::post('/bill', [AdminController::class, 'createKasBill'])->name('bill.create');
    Route::delete('/bill/{id}', [AdminController::class, 'deleteKasBill'])->name('bill.delete');
    Route::get('/bill/{billId}/review', [AdminController::class, 'reviewBillPayments'])->name('bill.review');
    Route::get('/pending-payments', [AdminController::class, 'viewPendingPayments'])->name('pending');
    Route::post('/payment/{id}/approve', [AdminController::class, 'approvePayment'])->name('payment.approve');
    Route::post('/payment/{id}/reject', [AdminController::class, 'rejectPayment'])->name('payment.reject');
    Route::post('/expense', [AdminController::class, 'addExpense'])->name('expense.add');
    Route::get('/expense/proof/{filename}', [AdminController::class, 'viewExpenseProof'])->name('expense.proof');
});

// Route Admin: View & Upload Dokumen (tanpa middleware, asumsi auth di level lain)
Route::get('/admin/documentation', function () {
    // Dummy data - ganti dengan query: Document::with('uploader')->latest()->paginate(10)
    $documents = [
        [
            'id' => 1,
            'title' => 'Foto Latihan Sepak Bola',
            'caption' => 'Latihan mingguan di lapangan utama, partisipasi 25 anggota.',
            'file_url' => '/storage/docs/latihan1.jpg',
            'file_type' => 'image',
            'uploader_name' => 'Ade Pratama',
            'category' => 'Event',
            'tags' => ['#Latihan', '#Sepakbola'],
            'uploaded_at' => '2025-10-20 16:00',
        ],
        [
            'id' => 2,
            'title' => 'Laporan Rapat Pengurus',
            'caption' => 'Diskusi anggaran Q4, disetujui Rp 5jt untuk event.',
            'file_url' => '/storage/docs/rapat.pdf',
            'file_type' => 'pdf',
            'uploader_name' => 'Budi Santoso',
            'category' => 'Rapat',
            'tags' => ['#Anggaran', '#Rapat'],
            'uploaded_at' => '2025-10-19 19:30',
        ],
        [
            'id' => 3,
            'title' => 'Video Highlight Turnamen',
            'caption' => 'Highlight gol kemenangan vs UI, durasi 2 menit.',
            'file_url' => '/storage/docs/turnamen.mp4',
            'file_type' => 'video',
            'uploader_name' => 'Citra Dewi',
            'category' => 'Event',
            'tags' => ['#Turnamen', '#Highlight'],
            'uploaded_at' => '2025-10-18 14:00',
        ],
    ];

    $totalDocs = count($documents);
    $recentDocs = array_slice($documents, 0, 3);

    return Inertia::render('Admin/Dokumentasi', [
        'documents' => $documents,
        'total_docs' => $totalDocs,
        'recent_docs' => $recentDocs,
        'auth' => auth()->user(),
    ]);
})->name('admin.documentation');

Route::post('/admin/documentation', function (Request $request) {
    // Validate & upload file
    $request->validate([
        'caption' => 'required|string|max:255',
        'category' => 'required|string',
        'tags' => 'nullable|string',
        'files.*' => 'required|file|mimes:jpg,png,pdf,mp4|max:10240',  // Max 10MB
    ]);

    $uploadedFiles = [];
    if ($request->hasFile('files')) {
        foreach ($request->file('files') as $file) {
            $path = $file->store('docs', 'public');
            $uploadedFiles[] = Storage::url($path);
        }
    }

    // Simpan ke DB: Document::create([...]) - asumsi model Document
    // Contoh:
    // Document::create([
    //     'title' => $request->caption,
    //     'caption' => $request->caption,
    //     'file_url' => json_encode($uploadedFiles),
    //     'file_type' => $request->file('files')->first()->extension(),
    //     'uploader_id' => auth()->id(),
    //     'category' => $request->category,
    //     'tags' => $request->tags,
    // ]);

    return redirect()->back()->with('success', 'Dokumen berhasil diupload!');
})->name('admin.documentation.store');

Route::get('/admin/laporan-akhir', function () {
    // Dummy rekap dana (dari kas)
    $rekapDana = [
        'total_income' => 750000,
        'total_expense' => 450000,
        'total_saldo' => 300000,
        'transactions' => [  // 5 terbaru
            ['date' => '2025-10-20', 'description' => 'Iuran Ade', 'amount' => 50000, 'type' => 'income'],
            ['date' => '2025-10-19', 'description' => 'Biaya Banner', 'amount' => 150000, 'type' => 'expense'],
            // Tambah 3 lagi...
        ],
    ];

    // Dummy rekap kegiatan (dari attendance/calendar)
    $rekapKegiatan = [
        'total_kegiatan' => 15,
        'total_absensi' => 120,  // Total hadir
        'events' => [  // 5 terbaru
            ['title' => 'Latihan Sepak Bola', 'date' => '2025-10-22', 'attendance' => 25],
            ['title' => 'Rapat Pengurus', 'date' => '2025-10-28', 'attendance' => 12],
            // Tambah 3 lagi...
        ],
    ];

    // Dummy rekap dokumentasi
    $rekapDokumen = [
        'total_docs' => 25,
        'recent_docs' => [  // 3 terbaru
            ['title' => 'Foto Latihan', 'category' => 'Event', 'uploaded_at' => '2025-10-20'],
            // Tambah 2 lagi...
        ],
    ];

    return Inertia::render('Admin/LaporanAkhir', [
        'rekap_dana' => $rekapDana,
        'rekap_kegiatan' => $rekapKegiatan,
        'rekap_dokumen' => $rekapDokumen,
        'auth' => auth()->user(),
    ]);
})->name('admin.laporan-akhir');

// Route Admin: Penilaian Pengurus
Route::get('/admin/penilaian', function () {
    // Dummy data pengurus dengan rating
    $pengurus = [
        [
            'id' => 1,
            'nama' => 'Ahmad Rizki',
            'jabatan' => 'Ketua',
            'rating' => 4.5,
            'total_rating' => 25,
            'rating_breakdown' => [
                5 => 15,
                4 => 8,
                3 => 2,
                2 => 0,
                1 => 0
            ],
            'essay_responses' => 12,
        ],
        [
            'id' => 2,
            'nama' => 'Siti Nurhaliza',
            'jabatan' => 'Wakil Ketua',
            'rating' => 4.7,
            'total_rating' => 22,
            'rating_breakdown' => [
                5 => 18,
                4 => 3,
                3 => 1,
                2 => 0,
                1 => 0
            ],
            'essay_responses' => 10,
        ],
        [
            'id' => 3,
            'nama' => 'Budi Santoso',
            'jabatan' => 'Sekretaris',
            'rating' => 4.3,
            'total_rating' => 20,
            'rating_breakdown' => [
                5 => 12,
                4 => 6,
                3 => 2,
                2 => 0,
                1 => 0
            ],
            'essay_responses' => 8,
        ],
        [
            'id' => 4,
            'nama' => 'Dewi Lestari',
            'jabatan' => 'Bendahara',
            'rating' => 4.8,
            'total_rating' => 23,
            'rating_breakdown' => [
                5 => 20,
                4 => 2,
                3 => 1,
                2 => 0,
                1 => 0
            ],
            'essay_responses' => 11,
        ],
    ];

    // Dummy data pertanyaan penilaian
    $questions = [
        [
            'id' => 1,
            'question_text' => 'Bagaimana penilaian Anda terhadap kepemimpinan pengurus?',
            'question_type' => 'rating',
            'responses' => 25,
            'created_at' => '2025-10-01',
        ],
        [
            'id' => 2,
            'question_text' => 'Seberapa baik komunikasi pengurus dengan anggota?',
            'question_type' => 'rating',
            'responses' => 25,
            'created_at' => '2025-10-01',
        ],
        [
            'id' => 3,
            'question_text' => 'Apa saran Anda untuk peningkatan kinerja pengurus ke depannya?',
            'question_type' => 'essay',
            'responses' => 15,
            'created_at' => '2025-10-01',
        ],
        [
            'id' => 4,
            'question_text' => 'Bagaimana penilaian Anda terhadap inisiatif dan kreativitas pengurus?',
            'question_type' => 'rating',
            'responses' => 23,
            'created_at' => '2025-10-02',
        ],
    ];

    return Inertia::render('Admin/Penilaian', [
        'pengurus' => $pengurus,
        'questions' => $questions,
        'auth' => auth()->user(),
    ]);
})->name('admin.penilaian');

// Route untuk menambah pertanyaan baru
Route::post('/admin/penilaian/questions', function (Request $request) {
    $request->validate([
        'question_text' => 'required|string|max:500',
        'question_type' => 'required|in:rating,essay',
    ]);

    // Simpan ke database
    // AssessmentQuestion::create([
    //     'question_text' => $request->question_text,
    //     'question_type' => $request->question_type,
    //     'created_by' => auth()->id(),
    // ]);

    return redirect()->back()->with('success', 'Pertanyaan berhasil ditambahkan!');
})->name('admin.penilaian.questions.store');

// Route untuk update pertanyaan
Route::put('/admin/penilaian/questions/{id}', function (Request $request, $id) {
    $request->validate([
        'question_text' => 'required|string|max:500',
        'question_type' => 'required|in:rating,essay',
    ]);

    // Update di database
    // $question = AssessmentQuestion::findOrFail($id);
    // $question->update([
    //     'question_text' => $request->question_text,
    //     'question_type' => $request->question_type,
    // ]);

    return redirect()->back()->with('success', 'Pertanyaan berhasil diupdate!');
})->name('admin.penilaian.questions.update');

// Route untuk hapus pertanyaan
Route::delete('/admin/penilaian/questions/{id}', function ($id) {
    // Hapus dari database
    // $question = AssessmentQuestion::findOrFail($id);
    // $question->delete();

    return redirect()->back()->with('success', 'Pertanyaan berhasil dihapus!');
})->name('admin.penilaian.questions.destroy');

// Route untuk lihat detail penilaian pengurus tertentu
Route::get('/admin/penilaian/{id}', function ($id) {
    // Dummy data detail pengurus
    $pengurus = [
        'id' => $id,
        'nama' => 'Ahmad Rizki',
        'jabatan' => 'Ketua',
        'rating' => 4.5,
        'total_rating' => 25,
        'rating_breakdown' => [
            5 => 15,
            4 => 8,
            3 => 2,
            2 => 0,
            1 => 0
        ],
    ];

    // Dummy data jawaban essay (anonim)
    $essayResponses = [
        [
            'id' => 1,
            'question' => 'Apa saran Anda untuk peningkatan kinerja pengurus?',
            'answer' => 'Sangat baik dalam koordinasi, namun perlu lebih responsif dalam komunikasi.',
            'submitted_at' => '2025-10-20 14:30',
        ],
        [
            'id' => 2,
            'question' => 'Apa saran Anda untuk peningkatan kinerja pengurus?',
            'answer' => 'Leadership bagus, mungkin bisa lebih sering mengadakan gathering.',
            'submitted_at' => '2025-10-19 10:15',
        ],
        [
            'id' => 3,
            'question' => 'Apa saran Anda untuk peningkatan kinerja pengurus?',
            'answer' => 'Sudah sangat baik, pertahankan!',
            'submitted_at' => '2025-10-18 16:45',
        ],
    ];

    // Dummy rating per pertanyaan
    $ratingPerQuestion = [
        [
            'question' => 'Bagaimana penilaian Anda terhadap kepemimpinan pengurus?',
            'average_rating' => 4.6,
            'total_responses' => 25,
        ],
        [
            'question' => 'Seberapa baik komunikasi pengurus dengan anggota?',
            'average_rating' => 4.4,
            'total_responses' => 25,
        ],
        [
            'question' => 'Bagaimana penilaian Anda terhadap inisiatif dan kreativitas pengurus?',
            'average_rating' => 4.5,
            'total_responses' => 23,
        ],
    ];

    return Inertia::render('Admin/PenilaianDetail', [
        'pengurus' => $pengurus,
        'essay_responses' => $essayResponses,
        'rating_per_question' => $ratingPerQuestion,
        'auth' => auth()->user(),
    ]);
})->name('admin.penilaian.detail');

Route::middleware(['auth', 'verified', ProfileCompleted::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
