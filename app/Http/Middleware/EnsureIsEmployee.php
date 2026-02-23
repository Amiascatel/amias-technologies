<?php

namespace AppHttpMiddleware;

use Closure;
use IlluminateHttpRequest;
use SymfonyComponentHttpFoundationResponse;

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
