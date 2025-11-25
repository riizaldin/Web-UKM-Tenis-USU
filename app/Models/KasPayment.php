<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KasPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'kas_bill_id',
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

    /**
     * Get the bill that this payment belongs to.
     */
    public function bill(): BelongsTo
    {
        return $this->belongsTo(KasBill::class, 'kas_bill_id');
    }

    /**
     * Get the user who submitted this payment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the admin who verified this payment.
     */
    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Scope to get pending payments.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to get approved payments.
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope to get rejected payments.
     */
    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}
