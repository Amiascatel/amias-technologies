<?php

use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\QuotationController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SupportTicketController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PublicServiceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public routes ────────────────────────────────────────────
Route::get('/', fn () => Inertia::render('homepages/homepage'))->name('home');
Route::get('/services', [PublicServiceController::class, 'index'])->name('services');
Route::get('/about', fn () => Inertia::render('homepages/about'))->name('about');
Route::get('/contact', fn () => Inertia::render('homepages/contact'))->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// ── Admin routes (authenticated) ─────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('services',         ServiceController::class)->except(['show']);
        Route::resource('projects',         ProjectController::class)->except(['show']);
        Route::resource('invoices',         InvoiceController::class);
        Route::resource('quotations',       QuotationController::class);
        Route::resource('support-tickets',  SupportTicketController::class);
        Route::resource('documents',        DocumentController::class)->except(['edit', 'update', 'show']);
        Route::resource('contact-messages', ContactMessageController::class)->only(['index', 'show', 'update', 'destroy']);
    });
});

require __DIR__ . '/settings.php';
