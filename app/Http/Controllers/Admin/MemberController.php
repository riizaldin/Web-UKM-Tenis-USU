<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MemberController extends Controller
{
    public function show($id)
    {
        $user = User::with(['logs', 'kasTransactions'])  // Load relasi (sekarang kasTransactions ready)
                    ->findOrFail($id);

        // Hitung total kas: income positif, expense negatif
        $totalKas = $user->kasTransactions->sum(function ($tx) {
            return $tx->type === 'income' ? $tx->amount : -$tx->amount;
        });

        $transformedUser = [
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username ?? 'Tidak tersedia',
            'nim' => $user->nim ?? 'Tidak tersedia',
            'fakultas' => $user->fakultas ?? 'Tidak tersedia',
            'jurusan' => $user->jurusan ?? 'Tidak tersedia',
            'angkatan' => $user->angkatan ?? 'Tidak tersedia',
            'no_whatsapp' => $user->no_whatsapp ?? 'Tidak tersedia',
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at?->format('Y-m-d H:i') ?? null,
            'phone' => $user->no_whatsapp ?? 'Tidak tersedia',
            'address' => 'Tidak tersedia',  // Tambah field nanti
            'profile_photo_url' => $user->pasfoto ? Storage::url($user->pasfoto) : null,
            'ktm_url' => $user->ktm ? Storage::url($user->ktm) : null,
            're_reg_date' => null,  // Tambah field nanti
            'status' => 'active',
            'joined_at' => $user->created_at?->format('Y-m-d'),
            'logs' => $user->logs->map(function ($log) {
                return [
                    'date' => $log->created_at?->format('Y-m-d H:i'),
                    'action' => $log->action ?? 'Unknown',
                    'description' => $log->description ?? 'No description',
                ];
            }),
            'kas_details' => [
                'total' => $totalKas,  // Hitung real dari relasi
                'transactions' => $user->kasTransactions->map(function ($tx) {
                    return [
                        'date' => $tx->created_at?->format('Y-m-d'),
                        'description' => $tx->description ?? 'No description',
                        'amount' => $tx->amount,  // Tampilkan positif, sign dari type
                        'type' => $tx->type,  // 'income' atau 'expense'
                    ];
                }),
            ],
        ];

        return inertia('Admin/MemberDetail', [
            'member' => $transformedUser,
            'auth' => auth()->user(),
        ]);
    }
}