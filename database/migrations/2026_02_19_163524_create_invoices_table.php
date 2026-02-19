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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number', 20)->unique();  // AT-INV-00001
            $table->date('invoice_date');
            $table->date('due_date')->nullable();
            $table->string('contract_ref')->nullable();      // AT-XXXXX-2025
            $table->enum('status', ['unpaid', 'partial', 'paid'])->default('unpaid');
            // Client
            $table->string('client_name');
            $table->string('client_company')->nullable();
            $table->text('client_address')->nullable();
            $table->string('client_phone')->nullable();
            $table->string('client_email')->nullable();
            // Project / service description
            $table->string('project_description')->nullable();
            // Line items stored as JSON
            $table->jsonb('items')->default('[]');
            // Totals
            $table->decimal('subtotal', 15, 2)->default(0);
            $table->decimal('discount', 15, 2)->default(0);
            $table->decimal('vat_rate', 5, 2)->default(16);
            $table->decimal('vat_amount', 15, 2)->default(0);
            $table->decimal('total', 15, 2)->default(0);
            $table->string('currency', 5)->default('ZMW');
            // Payment details
            $table->string('bank_name')->nullable();
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->string('branch_code')->nullable();
            $table->string('mobile_money')->nullable();
            // Notes
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
