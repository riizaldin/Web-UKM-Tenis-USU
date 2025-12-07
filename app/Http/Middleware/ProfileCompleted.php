<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProfileCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Skip check for complete-profile route itself, verification routes, and profile routes
        if ($request->routeIs('complete-profile') || 
            $request->routeIs('user.complete-profile') ||
            $request->routeIs('verification.*') ||
            $request->routeIs('profile.*') ||
            $request->routeIs('logout')) {
            return $next($request);
        }

        // Check if email is verified
        if (!$user->hasVerifiedEmail()) {
            return redirect()->route('verification.notice');
        }

        // Check if profile is completed
        $fields = ['nim', 'fakultas', 'jurusan', 'angkatan', 'no_whatsapp', 'ktm', 'pasfoto'];
        foreach ($fields as $field) {
            if (is_null($user->$field)) {
                return redirect()->route('complete-profile');
            }
        }
        
        return $next($request);
    }
}
