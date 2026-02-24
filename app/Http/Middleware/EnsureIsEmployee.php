<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * EnsureIsEmployee  (alias: 'employee' / 'staff')
 *
 * Grants access to staff members: role = 'admin' OR 'employee'.
 * Clients are redirected to their own portal with an error.
 *
 * Applied to:  /admin/* prefix routes (shared admin panel),
 *              /employee/* prefix routes (employee portal).
 *
 * Permission summary inside the admin panel:
 *   admin    – everything (further restricted by EnsureIsAdmin)
 *   employee – dashboard, assigned projects (update only),
 *              support tickets
 */
class EnsureIsEmployee
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user?->isStaff()) {
            if ($request->expectsJson()) {
                abort(403, 'Staff access required.');
            }

            return redirect('/client/dashboard')
                ->with('error', 'That area is for staff members only.');
        }

        return $next($request);
    }
}
