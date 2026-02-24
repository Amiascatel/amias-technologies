<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /* ── Role constants ──────────────────────────────────────
     *
     *  admin    – Full system access. Manages everything:
     *             users, services, invoices, quotations,
     *             documents, messages, projects, tickets.
     *
     *  employee – Staff-level access. Can view the admin
     *             dashboard, manage their assigned projects
     *             and support tickets. Cannot manage users,
     *             billing, or system settings.
     *
     *  client   – Client portal only. Can view their own
     *             projects, invoices, quotations, and tickets.
     *             Cannot access any admin or employee area.
     * ─────────────────────────────────────────────────────── */
    const ROLE_ADMIN    = 'admin';
    const ROLE_EMPLOYEE = 'employee';
    const ROLE_CLIENT   = 'client';

    const ROLES = [
        self::ROLE_ADMIN    => 'Administrator',
        self::ROLE_EMPLOYEE => 'Employee',
        self::ROLE_CLIENT   => 'Client',
    ];

    protected $fillable = [
        'name', 'email', 'password', 'role', 'phone', 'company',
    ];

    protected $hidden = [
        'password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at'       => 'datetime',
            'password'                => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /* ── Role check helpers ───────────────────────────────── */

    /** Returns true if the user has any of the given role(s). */
    public function hasRole(string|array $role): bool
    {
        return in_array($this->role, (array) $role);
    }

    /** Administrator – unrestricted access. */
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /** Employee – staff access to the admin panel. */
    public function isEmployee(): bool
    {
        return $this->role === self::ROLE_EMPLOYEE;
    }

    /** Client – client portal access only. */
    public function isClient(): bool
    {
        return $this->role === self::ROLE_CLIENT;
    }

    /** Staff = admin OR employee (both can enter the admin panel). */
    public function isStaff(): bool
    {
        return $this->hasRole([self::ROLE_ADMIN, self::ROLE_EMPLOYEE]);
    }

    /** Human-readable role label, e.g. "Administrator". */
    public function roleLabel(): string
    {
        return self::ROLES[$this->role] ?? ucfirst((string) $this->role);
    }

    /* ── Relationships ────────────────────────────────────── */

    public function clientProjects()
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function employeeProjects()
    {
        return $this->hasMany(Project::class, 'employee_id');
    }
}
