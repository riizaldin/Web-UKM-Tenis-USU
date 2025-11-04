<?php

namespace App\Models;

use App\Models\User;
use App\Models\Event;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    protected $table = 'absensi';
    protected $fillable = [
        'user_id',
        'waktu_absen',
        'event_id',
        'status',
        'kode_absen',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class, 'event_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
