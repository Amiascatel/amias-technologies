<?php

namespace AppModels;

use IlluminateDatabaseEloquentFactoriesHasFactory;
use IlluminateFoundationAuthUser as Authenticatable;
use IlluminateNotificationsNotifiable;
use LaravelFortifyTwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'name', 'email', 'password', 'role', 'phone', 'company',
    ];

    protected $hidden = [
        'password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at'      => 'datetime',
            'password'               => 'hashed',
            'two_factor_confirmed_at'=> 'datetime',
        ];
    }

    // Role helpers
    public function isAdmin(): bool    { return $this->role === 'admin'; }
    public function isEmployee(): bool { return $this->role === 'employee'; }
    public function isClient(): bool   { return $this->role === 'client'; }

    // Relationships
    public function clientProjects()   { return $this->hasMany(Project::class, 'client_id'); }
    public function employeeProjects() { return $this->hasMany(Project::class, 'employee_id'); }
}
