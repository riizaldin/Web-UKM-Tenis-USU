<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeregistrationPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'heregistration_id',
        'user_id',
        'amount',
        'proof_image',
        'payment_notes',
        'status',
        'admin_notes',
        'verified_by',
        'verified_at',
        'submitted_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'verified_at' => 'datetime',
        'submitted_at' => 'datetime',
    ];

    public function heregistration()
    {
        return $this->belongsTo(Heregistration::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
