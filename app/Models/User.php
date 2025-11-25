<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable 
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'nim', 
        'fakultas', 
        'jurusan', 
        'angkatan', 
        'no_whatsapp', 
        'pasfoto', 
        'ktm',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relasi Log dan Kas kosong
    public function logs()
    {
        return $this->hasMany(\App\Models\Log::class);
    }

    public function kasTransactions()
    {
        return $this->hasMany(\App\Models\KasTransaction::class);
    }

    // Kas Bills - New System
    public function kasBills()
    {
        return $this->hasMany(\App\Models\KasBill::class);
    }

    public function kasPayments()
    {
        return $this->hasMany(\App\Models\KasPayment::class);
    }
}