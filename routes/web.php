<?php

use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\QuotationController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\SupportTicketController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Client\DashboardController as ClientDashboard;
use App\Http\Controllers\Employee\DashboardController as EmployeeDashboard;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PublicServiceController;
use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// ── Public routes ─────────────────────────────────────────────
Route::get('/',        fn () => Inertia::render('homepages/homepage'))->name('home');
Route::get('/services',[PublicServiceController::class, 'index'])->name('services');
Route::get('/about',   fn () => Inertia::render('homepages/about'))->name('about');
Route::get('/contact', fn () => Inertia::render('homepages/contact'))->name('contact');
Route::post('/contact',[ContactController::class, 'store'])->name('contact.store');
Route::get('/quote',   [QuoteController::class, 'show'])->name('quote');
Route::post('/quote',  [QuoteController::class, 'store'])->name('quote.store');
Route::get('/pricing', fn () => Inertia::render('homepages/pricing'))->name('pricing');

// ── Smart dashboard redirect based on role ────────────────────
Route::middleware(['auth', 'verified'])->get('/dashboard', function () {
    $role = auth()->user()->role;
    return match ($role) {
        'admin', 'employee' => redirect($role === 'admin' ? '/admin/dashboard' : '/employee/dashboard'),
        default             => redirect('/client/dashboard'),
    };
})->name('dashboard');

// ── Admin & Employee shared routes ────────────────────────────
Route::middleware(['auth', 'verified', 'employee'])
    ->prefix('admin')->name('admin.')
    ->group(function () {
        // Admin dashboard
        Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

        // Full CRUD — admin only
        Route::middleware('admin')->group(function () {
            Route::resource('services',         ServiceController::class)->except(['show']);
            Route::resource('invoices',         InvoiceController::class);
            Route::resource('quotations',       QuotationController::class);
            Route::resource('documents',        DocumentController::class)->except(['edit','update','show']);
            Route::resource('contact-messages', ContactMessageController::class)->only(['index','show','update','destroy']);
            Route::resource('users',            UserController::class)->except(['show']);
        });

        // Projects & tickets — employees can see their own
        Route::resource('projects',        ProjectController::class)->except(['show']);
        Route::resource('support-tickets', SupportTicketController::class);
    });

// ── Employee portal ───────────────────────────────────────────
Route::middleware(['auth', 'verified', 'employee'])
    ->prefix('employee')->name('employee.')
    ->group(function () {
        Route::get('/dashboard',                  [EmployeeDashboard::class, 'index'])->name('dashboard');
        Route::get('/projects/{project}',         [EmployeeDashboard::class, 'projectShow'])->name('projects.show');
        Route::patch('/projects/{project}',       [EmployeeDashboard::class, 'projectUpdate'])->name('projects.update');
    });

// ── Client portal ─────────────────────────────────────────────
Route::middleware(['auth', 'verified', 'client'])
    ->prefix('client')->name('client.')
    ->group(function () {
        Route::get('/dashboard',             [ClientDashboard::class, 'index'])->name('dashboard');
        Route::get('/projects/{project}',    [ClientDashboard::class, 'projectShow'])->name('projects.show');
        // Alias sub-paths so the client sidebar links work
        Route::get('/projects',  fn () => redirect('/client/dashboard'))->name('projects');
        Route::get('/invoices',  fn () => redirect('/client/dashboard'))->name('invoices');
        Route::get('/quotations',fn () => redirect('/client/dashboard'))->name('quotations');
        Route::get('/tickets',   fn () => redirect('/client/dashboard'))->name('tickets');
    });

require __DIR__ . '/settings.php';
