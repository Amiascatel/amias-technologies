<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    protected $fillable = [
        'ticket_number', 'subject', 'description', 'status', 'priority', 'category',
        'client_name', 'client_email', 'client_phone',
        'assigned_to', 'resolution', 'resolved_at',
    ];

    protected $casts = [
        'resolved_at' => 'datetime',
    ];

    public static function nextNumber(): string
    {
        $last = static::max('id') ?? 0;
        return 'AT-TKT-' . str_pad($last + 1, 5, '0', STR_PAD_LEFT);
    }
}
