<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'invoice_number', 'invoice_date', 'due_date', 'contract_ref', 'status',
        'client_name', 'client_company', 'client_address', 'client_phone', 'client_email',
        'project_description', 'items',
        'subtotal', 'discount', 'vat_rate', 'vat_amount', 'total', 'currency',
        'bank_name', 'account_name', 'account_number', 'branch_code', 'mobile_money',
        'notes',
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'due_date'     => 'date',
        'items'        => 'array',
        'subtotal'     => 'decimal:2',
        'discount'     => 'decimal:2',
        'vat_rate'     => 'decimal:2',
        'vat_amount'   => 'decimal:2',
        'total'        => 'decimal:2',
    ];

    /** Auto-generate next invoice number: AT-INV-00001 */
    public static function nextNumber(): string
    {
        $last = static::max('id') ?? 0;
        return 'AT-INV-' . str_pad($last + 1, 5, '0', STR_PAD_LEFT);
    }
}
