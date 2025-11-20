<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KasExpense extends Model
{
    protected $fillable = [
        'date',
        'amount',
        'proof_image',
        'expense'
    ];

    protected $table = 'kas_expense';
}
