<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            // Check if profile is completed
            if ($request->user()->nim && $request->user()->fakultas) {
                return redirect()->intended(route('home', absolute: false).'?verified=1');
            }
            return redirect()->intended(route('complete-profile'));
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // Show verification success page with redirect
        return Inertia::render('Auth/EmailVerificationSuccess', [
            'redirectUrl' => route('complete-profile')
        ]);
    }
}
