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
        Schema::create('kas_bills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title'); // e.g., "Iuran Bulanan Oktober 2025"
            $table->text('description')->nullable();
            $table->decimal('amount', 12, 2); // Nominal yang harus dibayar
            $table->date('due_date'); // Tanggal jatuh tempo
            $table->enum('bill_type', ['monthly', 'event', 'penalty', 'other'])->default('monthly');
            $table->boolean('is_global')->default(false); // true = untuk semua user, false = specific user
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kas_bills');
    }
};
