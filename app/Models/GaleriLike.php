<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriLike extends Model
{
    protected $table = 'galeri_likes';

    protected $fillable = [
        'galeri_id',
        'user_id',
    ];

    public function galeri()
    {
        return $this->belongsTo(Galeri::class, 'galeri_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
