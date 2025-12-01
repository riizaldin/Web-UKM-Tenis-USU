<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Heregistration;
use App\Models\HeregistrationPayment;

class CheckHeregistration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        // Skip check for admin users
        if ($user && $user->role === 'admin') {
            return $next($request);
        }

        // Check if there's an active heregistration period
        $activePeriod = Heregistration::where('is_active', true)->first();

        if (!$activePeriod) {
            return $next($request);
        }

        // Check if user has paid and approved
        $payment = HeregistrationPayment::where('heregistration_id', $activePeriod->id)
            ->where('user_id', $user->id)
            ->where('status', 'approved')
            ->first();

        // If not paid/approved, redirect to heregistration page
        // Except if already on heregistration page
        if (!$payment && !$request->is('heregistration*')) {
            return redirect()->route('heregistration')
                ->with('warning', 'Anda harus menyelesaikan heregistrasi terlebih dahulu untuk melanjutkan aktivitas UKM.');
        }

        return $next($request);
    }
}
