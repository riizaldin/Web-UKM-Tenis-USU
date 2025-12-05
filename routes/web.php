<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\ProfileCompleted;
use App\Http\Middleware\CheckHeregistration;
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

Route::get('/home', [UserController::class, 'home'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('home');

// Schedules
Route::get('/schedules', [UserController::class, 'schedules'])->middleware('auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class)->name('schedules');

// Attendance
Route::get('/attendance', [UserController::class, 'attendance'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('attendance');

Route::get('/attendance/set', [UserController::class, 'routeAttendance'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('set-attendance.form');

Route::post('/attendance/set', [UserController::class, 'setAttendance'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('set-attendance');

// Gallery
Route::get('/gallery', [UserController::class, 'gallery'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('gallery');

Route::get('/gallery/upload', [UserController::class, 'galleryUpload'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('gallery.upload');

Route::post('/gallery/store', [UserController::class, 'handleGalleryUpload'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('gallery.store');

Route::post('/gallery/{id}/increment-view', [UserController::class, 'incrementGalleryView'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('gallery.increment-view');

Route::post('/gallery/{id}/toggle-like', [UserController::class, 'toggleGalleryLike'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('gallery.toggle-like');

// Finance (KAS)
Route::get('/finance', [UserController::class, 'finance'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('finance');

Route::post('/finance/pay', [UserController::class, 'financePay'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('finance-pay');

Route::get('/finance/proof/{filename}', [UserController::class, 'viewPaymentProof'])->middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->name('finance.proof');
// Kas - User Routes
Route::middleware(['auth', 'verified', 'user', ProfileCompleted::class, CheckHeregistration::class])->group(function () {
    Route::get('/kas', [UserController::class, 'viewKas'])->name('kas.view');
    Route::post('/kas/submit-payment', [UserController::class, 'submitPaymentProof'])->name('user.kas.submit-payment');
    Route::get('/kas/payment-history', [UserController::class, 'viewPaymentHistory'])->name('kas.payment.history');
});

Route::get('/complete-profile', function () {
    return Inertia::render('Auth/CompleteProfile');
})->middleware(['auth', 'verified'])->name('complete-profile');

Route::get('/admin', [AdminController::class, 'index'])->middleware(['auth', 'verified', 'admin'])->name('admin');

Route::get('/admin/members', [AdminController::class, 'member'])->middleware(['auth', 'verified', 'admin'])->name('admin.members');

Route::get('/admin/members/{id}', [AdminController::class, 'showMembers'])->middleware(['auth', 'verified', 'admin'])->name('admin.members.detail');

Route::get('/admin/attendance', [AdminController::class, 'attendance'])->middleware(['auth', 'verified', 'admin'])->name('admin.attendance');

Route::post('/admin/attendance', [AdminController::class, 'storeAttendance'])->middleware(['auth', 'verified', 'admin'])->name('admin.attendance.store');

Route::get('/admin/kas', [AdminController::class, 'kas'])->middleware(['auth', 'verified', 'admin'])->name('admin.kas');
Route::get('/admin/kas/bills', [AdminController::class, 'kasBills'])->middleware(['auth', 'verified', 'admin'])->name('admin.kas.bills');

// Kas - Admin Routes
Route::prefix('admin/kas')->middleware(['auth', 'verified', 'admin'])->name('admin.kas.')->group(function () {
    Route::post('/bill', [AdminController::class, 'createKasBill'])->name('bill.create');
    Route::delete('/bill/{id}', [AdminController::class, 'deleteKasBill'])->name('bill.delete');
    Route::get('/bill/{billId}/review', [AdminController::class, 'reviewBillPayments'])->name('bill.review');
    Route::get('/pending-payments', [AdminController::class, 'viewPendingPayments'])->name('pending');
    Route::post('/payment/{id}/approve', [AdminController::class, 'approvePayment'])->name('payment.approve');
    Route::post('/payment/{id}/reject', [AdminController::class, 'rejectPayment'])->name('payment.reject');
    Route::post('/expense', [AdminController::class, 'addExpense'])->name('expense.add');
    Route::get('/expense/proof/{filename}', [AdminController::class, 'viewExpenseProof'])->name('expense.proof');
});

// Heregistration - Admin Routes
Route::prefix('admin/heregistration')->middleware(['auth', 'verified', 'admin'])->name('admin.heregistration.')->group(function () {
    Route::get('/', [AdminController::class, 'heregistration'])->name('index');
    Route::post('/create', [AdminController::class, 'createHeregistration'])->name('create');
    Route::post('/{id}/activate', [AdminController::class, 'activateHeregistration'])->name('activate');
    Route::get('/{id}/payments', [AdminController::class, 'viewHeregistrationPayments'])->name('payments');
    Route::post('/payment/{id}/approve', [AdminController::class, 'approveHeregistrationPayment'])->name('payment.approve');
    Route::post('/payment/{id}/reject', [AdminController::class, 'rejectHeregistrationPayment'])->name('payment.reject');
    Route::get('/payment/proof/{filename}', [AdminController::class, 'viewHeregistrationProof'])->name('payment.proof');
});

// Gallery Management - Admin Routes
Route::prefix('admin/gallery')->middleware(['auth', 'verified', 'admin'])->name('admin.gallery.')->group(function () {
    Route::get('/', [AdminController::class, 'galleryManagement'])->name('management');
    Route::delete('/{id}', [AdminController::class, 'deleteGallery'])->name('delete');
    Route::delete('/photo/{id}', [AdminController::class, 'deleteGalleryPhoto'])->name('photo.delete');
});

// Heregistration - User Routes
Route::middleware(['auth', 'verified', 'user', ProfileCompleted::class])->group(function () {
    Route::get('/heregistration', [UserController::class, 'heregistration'])->name('heregistration');
    Route::post('/heregistration/pay', [UserController::class, 'heregistrationPay'])->name('heregistration.pay');
    Route::get('/heregistration/proof/{filename}', [UserController::class, 'viewHeregistrationProof'])->name('heregistration.proof');
});

Route::middleware(['auth', 'verified', 'user', ProfileCompleted::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
