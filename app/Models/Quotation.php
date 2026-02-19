<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    protected $fillable = [
        'quote_number', 'quote_date', 'validity_date', 'status',
        'client_name', 'client_company', 'client_address', 'client_phone', 'client_email',
        'project_description', 'items',
        'subtotal', 'discount', 'vat_rate', 'vat_amount', 'total', 'currency',
        'notes', 'terms',
    ];

    protected $casts = [
        'quote_date'    => 'date',
        'validity_date' => 'date',
        'items'         => 'array',
        'subtotal'      => 'decimal:2',
        'discount'      => 'decimal:2',
        'vat_rate'      => 'decimal:2',
        'vat_amount'    => 'decimal:2',
        'total'         => 'decimal:2',
    ];

    public static function nextNumber(): string
    {
        $last = static::max('id') ?? 0;
        return 'AT-QUO-' . str_pad($last + 1, 5, '0', STR_PAD_LEFT);
    }
}
