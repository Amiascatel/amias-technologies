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

/*
|--------------------------------------------------------------------------
| Role & Permission Summary
|--------------------------------------------------------------------------
|
|  admin    – Full access to everything in /admin/*.
|  employee – /admin/dashboard, assigned projects (update only via
|              /employee/*), support tickets. Cannot manage users,
|              billing, services, or other admin-only resources.
|  client   – /client/* only. Sees their own projects, invoices,
|              quotations, and tickets. No access to any admin area.
|
*/

// ── Public routes (no auth required) ──────────────────────────
Route::get('/',        fn () => Inertia::render('homepages/homepage'))->name('home');
Route::get('/services', [PublicServiceController::class, 'index'])->name('services');
Route::get('/about',    fn () => Inertia::render('homepages/about'))->name('about');
Route::get('/contact',  fn () => Inertia::render('homepages/contact'))->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/quote',    [QuoteController::class, 'show'])->name('quote');
Route::post('/quote',   [QuoteController::class, 'store'])->name('quote.store');
Route::get('/pricing',  fn () => Inertia::render('homepages/pricing'))->name('pricing');

// ── Smart dashboard redirect ───────────────────────────────────
// Sends each role to their correct portal after login.
Route::middleware(['auth', 'verified'])
    ->get('/dashboard', function () {
        return match (auth()->user()->role) {
            'admin'    => redirect()->route('admin.dashboard'),
            'employee' => redirect()->route('employee.dashboard'),
            default    => redirect()->route('client.dashboard'),
        };
    })->name('dashboard');

// ── Admin panel — staff entry point ───────────────────────────
// Both admin AND employee can enter this panel.
// Admin-only sub-routes are guarded by the 'admin' middleware.
// Employee-only project actions are handled in /employee/*.
Route::middleware(['auth', 'verified', 'employee'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        // Shared: admin dashboard (both admin and employee see this)
        Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');

        // ── Admin-only resources ───────────────────────────
        // role = admin required for all routes in this group
        Route::middleware('admin')->group(function () {

            // Service catalogue
            Route::resource('services', ServiceController::class)
                ->except(['show']);

            // Billing
            Route::resource('invoices',   InvoiceController::class);
            Route::resource('quotations', QuotationController::class);

            // Documents
            Route::resource('documents', DocumentController::class)
                ->except(['edit', 'update', 'show']);

            // Incoming contact messages
            Route::resource('contact-messages', ContactMessageController::class)
                ->only(['index', 'show', 'update', 'destroy']);

            // User management (create, edit, delete, change roles)
            Route::resource('users', UserController::class)
                ->except(['show']);

            // Full project CRUD (admin creates / deletes projects)
            Route::resource('projects', ProjectController::class)
                ->except(['show']);
        });

        // ── Shared: support tickets (admin + employee) ─────
        // Employees manage tickets assigned to them.
        // Authorization enforced inside SupportTicketController.
        Route::resource('support-tickets', SupportTicketController::class);
    });

// ── Employee portal ───────────────────────────────────────────
// Employees see their own dashboard and can update the status
// of projects assigned to them. They cannot create or delete.
Route::middleware(['auth', 'verified', 'employee'])
    ->prefix('employee')
    ->name('employee.')
    ->group(function () {
        Route::get('/dashboard',             [EmployeeDashboard::class, 'index'])->name('dashboard');

        // View a project assigned to this employee
        Route::get('/projects/{project}',    [EmployeeDashboard::class, 'projectShow'])->name('projects.show');

        // Update status / notes on an assigned project
        Route::patch('/projects/{project}',  [EmployeeDashboard::class, 'projectUpdate'])->name('projects.update');
    });

// ── Client portal ─────────────────────────────────────────────
// Clients can only see their own data.
// ProjectPolicy enforces ownership on projectShow.
Route::middleware(['auth', 'verified', 'client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/dashboard',          [ClientDashboard::class, 'index'])->name('dashboard');
        Route::get('/projects/{project}', [ClientDashboard::class, 'projectShow'])->name('projects.show');

        // Convenience redirects so sidebar links resolve correctly
        Route::get('/projects',   fn () => redirect()->route('client.dashboard'))->name('projects');
        Route::get('/invoices',   fn () => redirect()->route('client.dashboard'))->name('invoices');
        Route::get('/quotations', fn () => redirect()->route('client.dashboard'))->name('quotations');
        Route::get('/tickets',    fn () => redirect()->route('client.dashboard'))->name('tickets');
    });

require __DIR__ . '/settings.php';
