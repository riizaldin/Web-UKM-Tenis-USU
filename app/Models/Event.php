<?php

namespace App\Models;

use App\Models\Absensi;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $table = 'event';
    protected $fillable = [
        'nama_event',
        'lokasi',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
        'tipe',
        'deskripsi',
        'pelatih',
        'hadiah',
        'kode_absensi',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    public function attendance()
    {
        return $this->hasMany(Absensi::class, 'event_id');
    }
}
