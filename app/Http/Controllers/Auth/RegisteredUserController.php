<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Rules\AspectRatio;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', Rules\Password::min(8)
                                        ->letters()
                                        ->numbers()
                                        ->uncompromised()],
        ],
        [
            'name.required' => 'Nama harus diisi',
            'email.required' => 'Email harus diisi',
            'email.lowercase' => 'Email harus menggunakan huruf kecil',
            'email.email' => 'Format email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'password.required' => 'Kata sandi harus diisi',
            'password.min' => 'Kata sandi minimal mempunyai 8 karakter',
            'password.letters' => 'Kata sandi harus mengandung huruf',
            'password.numbers' => 'Kata sandi harus mengandung angka',
            'password.uncompromised' => 'Kata sandi sudah pernah dibobol, Mohon gunakan kata sandi yang lain!',
        ]
    );

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

    public function completeProfile(Request $request){
        $fields = $request->validate([
            'nim' => ['required', 'numeric'],
            'fakultas' => ['required', 'max: 255', 'string'],
            'jurusan' => ['required', 'max: 255', 'string'],
            'angkatan' => ['required', 'numeric'],
            'no_whatsapp' => ['required', 'numeric'],
            'pasfoto' => ['bail' ,'required', 'mimes:jpeg,png,jpg', 'max:2048', new AspectRatio],
            'ktm' => ['bail', 'required', 'mimes:jpeg,png,jpg', 'max:2048'],
        ],
         [
            'nim.required' => 'Nim harus diisi',
            'nim.numeric' => 'Nim harus berupa angka',
            'fakultas.required' => 'Fakultas harus diisi',
            'fakultas.max' => 'Fakultas maksimal 255 karakter',
            'jurusan.required' => 'Jurusan harus diisi',
            'jurusan.max' => 'Jurusan maksimal 255 karakter',
            'angkatan.required' => 'Angkatan harus diisi',
            'no_whatsapp.required' => 'No. WhatsApp harus diisi',
            'pasfoto.required' => 'Pasfoto harus diisi',
            'pasfoto.image' => 'Pasfoto harus berupa gambar',
            'pasfoto.mimes' => 'Pasfoto harus berformat jpeg, jpg, atau png',
            'pasfoto.max' => 'Pasfoto maksimal 2MB',
            'ktm.required' => 'KTM harus diisi',
            'ktm.image' => 'KTM harus berupa gambar',
            'ktm.mimes' => 'KTM harus berformat jpeg, jpg, atau png',
            'ktm.max' => 'KTM maksimal 2MB',
        ]
    );
        $fields['pasfoto'] = $request->pasfoto->store('public/pasfoto');
        $fields['ktm'] = $request->ktm->store('public/ktm');
        $user = Auth::user();
        $user->update($fields);

        return redirect(route('dashboard'));

    }
}
