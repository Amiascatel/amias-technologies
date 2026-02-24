<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * EnsureIsAdmin
 *
 * Grants access ONLY to users with role = 'admin'.
 * Employees are redirected to the admin dashboard.
 * Clients are redirected to their portal.
 *
 * Applied to:  user management, services, invoices,
 *              quotations, documents, contact messages,
 *              full project CRUD.
 */
class EnsureIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user?->isAdmin()) {
            if ($request->expectsJson()) {
                abort(403, 'Administrator access required.');
            }

            // Send staff back to the admin panel; clients to their portal
            $redirect = $user?->isStaff() ? '/admin/dashboard' : '/client/dashboard';

            return redirect($redirect)
                ->with('error', 'You need administrator privileges to access that area.');
        }

        return $next($request);
    }
}
