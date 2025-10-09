<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/reports', function () {
    return Inertia::render('Reports');
})->middleware(['auth', 'verified', ProfileCompleted::class])->name('reports');

Route::get('/complete-profile', function () {
    return Inertia::render('Auth/CompleteProfile');
})->middleware(['auth', 'verified'])->name('complete-profile');

Route::middleware(['auth', 'verified', ProfileCompleted::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
