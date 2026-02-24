<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * EnsureIsClient
 *
 * Grants access ONLY to users with role = 'client'.
 * Staff (admin / employee) are redirected to the admin panel
 * since they have no business being in the client portal.
 *
 * Applied to:  /client/* prefix routes.
 *
 * Client permissions (enforced via ProjectPolicy):
 *   – View their own projects
 *   – View their own invoices and quotations
 *   – Raise and view their own support tickets
 */
class EnsureIsClient
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user?->isClient()) {
            if ($request->expectsJson()) {
                abort(403, 'Client access only.');
            }

            // Staff members should go to the admin panel, not the client portal
            $redirect = $user?->isStaff() ? '/admin/dashboard' : '/login';

            return redirect($redirect)
                ->with('error', 'That area is for clients only.');
        }

        return $next($request);
    }
}
