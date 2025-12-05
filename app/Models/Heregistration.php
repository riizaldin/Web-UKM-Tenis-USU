<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Heregistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'semester',
        'academic_year',
        'fee_amount',
        'start_date',
        'end_date',
        'is_active',
        'description',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_active' => 'boolean',
        'fee_amount' => 'decimal:2',
    ];

    public function payments()
    {
        return $this->hasMany(HeregistrationPayment::class);
    }

    public function pendingPayments()
    {
        return $this->hasMany(HeregistrationPayment::class)->where('status', 'pending');
    }

    public function approvedPayments()
    {
        return $this->hasMany(HeregistrationPayment::class)->where('status', 'approved');
    }

    public function rejectedPayments()
    {
        return $this->hasMany(HeregistrationPayment::class)->where('status', 'rejected');
    }
}
