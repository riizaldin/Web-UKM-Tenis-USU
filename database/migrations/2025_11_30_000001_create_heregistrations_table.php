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
        Schema::create('heregistrations', function (Blueprint $table) {
            $table->id();
            $table->string('semester'); // e.g., "Ganjil 2025/2026"
            $table->string('academic_year'); // e.g., "2025/2026"
            $table->decimal('fee_amount', 15, 2); // Registration fee
            $table->date('start_date'); // Registration period start
            $table->date('end_date'); // Registration period end
            $table->boolean('is_active')->default(false); // Only one can be active
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heregistrations');
    }
};
