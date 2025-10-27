<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\MemberController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\ProfileCompleted;
use Inertia\Inertia;

// Landing Page (publik, default)
Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('landing');

Route::get('/home', function () {
    return Inertia::render('Home', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('home');

Route::get('/schedules', function () {
    return Inertia::render('Schedules');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('schedules');

Route::get('/gallery', function () {
    return Inertia::render('Gallery');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery');

Route::get('/gallery/upload', function () {
    return Inertia::render('GalleryUpload', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery.upload');

Route::post('/gallery/store', function () {
    // Backend implementation untuk menyimpan foto
    return redirect()->route('gallery')->with('success', 'Foto berhasil diupload!');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('gallery.store');

Route::get('/attendance', function () {
    return Inertia::render('Attendance');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('attendance');

Route::get('/finance', function () {
    return Inertia::render('Finance');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('finance');

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

Route::get('/reports', function () {
    return Inertia::render('Reports');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('reports');

Route::get('/complete-profile', function () {
    return Inertia::render('Auth/CompleteProfile');
})->middleware(['auth', 'verified'])->name('complete-profile');

Route::get('/admin', function () {
    return Inertia::render('AdminPage');
})->name('admin');

Route::get('/admin/members', function () {;
    return Inertia::render('Admin/Members');
})->name('admin.members');

Route::get('/admin/members/{id}', [MemberController::class, 'show'])
    ->name('admin.members.detail');

use App\Models\User;  // Opsional, kalau query real dari users

Route::get('/admin/attendance', function () {
    $attendances = [  // Dummy untuk test
        ['id' => 1, 'date' => '2025-10-20', 'time' => '14:00', 'location' => 'Ruang A101', 'description' => 'Rapat', 'qr_only' => false, 'attendance_count' => 45],
        ['id' => 2, 'date' => '2025-10-21', 'time' => '10:30', 'location' => 'Lapangan', 'description' => 'Olahraga', 'qr_only' => true, 'attendance_count' => 32],
    ];
    return Inertia::render('Admin/Absensi', [  // Match nama file JSX kamu
        'attendances' => $attendances,
        'auth' => auth()->user(),
    ]);
})->name('admin.attendance');

Route::get('/admin/kas', function () {
    $transactions = [
        [
            'id' => 1,
            'date' => '2025-10-20',
            'description' => 'Iuran bulanan Ade',
            'amount' => 50000,
            'type' => 'income',
            'category' => 'Iuran Anggota',
            'status' => 'approved',
            'proof_url' => null,  // Gak ada untuk income
        ],
        [
            'id' => 2,
            'date' => '2025-10-19',
            'description' => 'Biaya cetak banner rapat',
            'amount' => 150000,
            'type' => 'expense',
            'category' => 'Biaya Kegiatan',
            'status' => 'approved',
            'proof_url' => '/storage/proof/banner-kwitansi.jpg',  // Dummy URL bukti
        ],
        [
            'id' => 3,
            'date' => '2025-10-15',
            'description' => 'Donasi sponsor event',
            'amount' => 200000,
            'type' => 'income',
            'category' => 'Sponsor',
            'status' => 'pending',
            'proof_url' => null,
        ],
        [
            'id' => 4,
            'date' => '2025-10-18',
            'description' => 'Beli alat olahraga',
            'amount' => 300000,
            'type' => 'expense',
            'category' => 'Alat & Perlengkapan',
            'status' => 'approved',
            'proof_url' => '/storage/proof/alat-struk.pdf',
        ],
    ];

    $totalIncome = collect($transactions)->where('type', 'income')->sum('amount');
    $totalExpense = collect($transactions)->where('type', 'expense')->sum('amount');
    $totalKas = $totalIncome - $totalExpense;

    return Inertia::render('Admin/Kas', [
        'transactions' => $transactions,
        'total_kas' => $totalKas,
        'total_income' => $totalIncome,
        'total_expense' => $totalExpense,
        'auth' => auth()->user(),
    ]);
})->name('admin.kas');

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
