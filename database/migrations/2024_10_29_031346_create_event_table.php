<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event', function (Blueprint $table) {
            $table->id();
            $table->string('nama_event');
            $table->string('lokasi');
            $table->date('tanggal');
            
            // waktu mulai dan selesai absen qr
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');

            $table->string('kode_absensi', 10)->unique();

            $table->enum('tipe', ['latihan', 'turnamen', 'lainnya']);
            $table->string('deskripsi')->nullable();
            $table->string('pelatih')->nullable();
            $table->string('hadiah')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event');
    }
};
