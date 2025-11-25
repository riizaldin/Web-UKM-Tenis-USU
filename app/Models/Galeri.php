<?php

namespace App\Models;

use App\Models\GaleriPhotos;
use App\Models\GaleriLike;
use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $table = 'galeri';

    protected $fillable = [
        'judul',
        'deskripsi',
        'kategori',
        'lokasi',
        'tanggal',
        'uploaded_by',
    ];

    public function photos(){
        return $this->hasMany(GaleriPhotos::class, 'galeri_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function likes(){
        return $this->hasMany(GaleriLike::class, 'galeri_id');
    }

    public function isLikedBy($userId){
        return $this->likes()->where('user_id', $userId)->exists();
    }
}
