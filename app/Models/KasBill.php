<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class KasBill extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'amount',
        'due_date',
        'status',
        'bill_type',
        'is_global',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'is_global' => 'boolean',
    ];

    /**
     * Get the user that owns the bill.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all payments for this bill.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(KasPayment::class);
    }

    /**
     * Get approved payments for this bill.
     */
    public function approvedPayments(): HasMany
    {
        return $this->hasMany(KasPayment::class)->where('status', 'approved');
    }

    /**
     * Get pending payments for this bill.
     */
    public function pendingPayments(): HasMany
    {
        return $this->hasMany(KasPayment::class)->where('status', 'pending');
    }

    /**
     * Check if bill is overdue.
     */
    public function isOverdue(): bool
    {
        return $this->status === 'unpaid' && $this->due_date->isPast();
    }

    /**
     * Get total paid amount.
     */
    public function getTotalPaidAttribute(): float
    {
        return (float) $this->approvedPayments()->sum('amount');
    }

    /**
     * Get remaining amount to pay.
     */
    public function getRemainingAmountAttribute(): float
    {
        return max(0, (float) $this->amount - $this->total_paid);
    }

    /**
     * Check if bill is fully paid.
     */
    public function isFullyPaid(): bool
    {
        return $this->total_paid >= $this->amount;
    }

    /**
     * Scope to get bills for a specific user (including global bills).
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where(function ($q) use ($userId) {
            $q->where('user_id', $userId)
              ->orWhere('is_global', true);
        });
    }

    /**
     * Scope to get unpaid bills.
     */
    public function scopeUnpaid($query)
    {
        return $query->where('status', 'unpaid');
    }

    /**
     * Scope to get overdue bills.
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'unpaid')
                     ->where('due_date', '<', now());
    }
}
