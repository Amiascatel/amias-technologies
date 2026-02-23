<?php

namespace AppModels;

use IlluminateDatabaseEloquentModel;

class Project extends Model
{
    protected $fillable = [
        'client_id', 'employee_id',
        'title', 'client_name', 'client_email', 'client_phone',
        'description', 'status', 'start_date', 'end_date',
        'budget', 'currency', 'notes',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
        'budget'     => 'decimal:2',
    ];

    public function client()   { return $this->belongsTo(User::class, 'client_id'); }
    public function employee() { return $this->belongsTo(User::class, 'employee_id'); }
}
