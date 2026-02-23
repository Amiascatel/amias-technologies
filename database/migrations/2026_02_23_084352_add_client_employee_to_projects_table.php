<?php

use IlluminateDatabaseMigrationsMigration;
use IlluminateDatabaseSchemaBlueprint;
use IlluminateSupportFacadesSchema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained('users')->nullOnDelete();
            $table->foreignId('employee_id')->nullable()->after('client_id')->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeignIdFor(AppModelsUser::class, 'client_id');
            $table->dropForeignIdFor(AppModelsUser::class, 'employee_id');
            $table->dropColumn(['client_id', 'employee_id']);
        });
    }
};
