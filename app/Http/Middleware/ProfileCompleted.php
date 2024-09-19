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
        $fields = ['nim', 'fakultas', 'jurusan', 'angkatan', 'no_whatsapp', 'ktm', 'pasfoto'];
        foreach ($fields as $field) {
            if (is_null(Auth::user()->$field)) {
                return redirect()->route('complete-profile');
            }
        }
        return $next($request);
    }
}
