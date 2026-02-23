<?php

namespace AppHttpMiddleware;

use Closure;
use IlluminateHttpRequest;
use SymfonyComponentHttpFoundationResponse;

class EnsureIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isAdmin()) {
            if ($request->expectsJson()) {
                abort(403, 'Forbidden.');
            }
            return redirect('/dashboard')->with('error', 'Access denied.');
        }

        return $next($request);
    }
}
