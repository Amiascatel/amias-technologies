<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureIsEmployee
{
    public function handle(Request $request, Closure $next): Response
    {
        $role = $request->user()?->role;

        if (! in_array($role, ['admin', 'employee'])) {
            if ($request->expectsJson()) {
                abort(403, 'Forbidden.');
            }
            return redirect('/dashboard')->with('error', 'Access denied.');
        }

        return $next($request);
    }
}
