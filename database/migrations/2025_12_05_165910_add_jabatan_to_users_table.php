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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('jabatan', [
                'ketua',
                'wakil_ketua',
                'bendahara',
                'wakil_bendahara',
                'sekretaris',
                'wakil_sekretaris',
                'koordinator_kepelatihan',
                'koordinator_medinfo',
                'koordinator_keperalatan',
                'anggota'
            ])->default('anggota')->after('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('jabatan');
        });
    }
};
