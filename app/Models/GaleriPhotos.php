<?php

namespace App\Models;

use App\Models\Galeri;
use Illuminate\Database\Eloquent\Model;

class GaleriPhotos extends Model
{
    protected $table = 'galeri_photos';

    protected $fillable = [
        'galeri_id',
        'photo_path',
    ];

    public function galeri()
    {
        return $this->belongsTo(Galeri::class, 'galeri_id');
    }
}
