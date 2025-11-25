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
        Schema::create('kas_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kas_bill_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 12, 2); // Jumlah yang dibayarkan
            $table->string('proof_image'); // Path ke bukti transfer
            $table->text('payment_notes')->nullable(); // Catatan dari user
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable(); // Catatan dari admin saat approve/reject
            $table->foreignId('verified_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('submitted_at')->useCurrent();
            $table->timestamps();
            
            $table->index(['kas_bill_id', 'status']);
            $table->index(['user_id', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kas_payments');
    }
};
