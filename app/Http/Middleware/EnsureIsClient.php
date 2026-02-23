<?php

namespace AppHttpMiddleware;

use Closure;
use IlluminateHttpRequest;
use SymfonyComponentHttpFoundationResponse;

class EnsureIsClient
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->role !== 'client') {
            return redirect('/dashboard');
        }

        return $next($request);
    }
}
