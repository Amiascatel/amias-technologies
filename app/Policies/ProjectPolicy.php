<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;

/**
 * ProjectPolicy
 *
 * Defines who can do what with a Project record.
 * Auto-discovered by Laravel (App\Models\Project → App\Policies\ProjectPolicy).
 *
 * ┌─────────────┬────────────┬──────────────────────────────────────────────┐
 * │  Action     │  Roles     │  Condition                                   │
 * ├─────────────┼────────────┼──────────────────────────────────────────────┤
 * │  viewAny    │  admin     │  Sees all projects                           │
 * │             │  employee  │  Sees all (controller scopes by employee_id) │
 * │  view       │  admin     │  Any project                                 │
 * │             │  employee  │  Only their assigned project                 │
 * │             │  client    │  Only their own project                      │
 * │  create     │  admin     │  Unrestricted                                │
 * │  update     │  admin     │  Any project                                 │
 * │             │  employee  │  Only their assigned project                 │
 * │  delete     │  admin     │  Any project                                 │
 * └─────────────┴────────────┴──────────────────────────────────────────────┘
 */
class ProjectPolicy
{
    /** Admins bypass all policy checks. */
    public function before(User $user): ?bool
    {
        return $user->isAdmin() ? true : null;
    }

    /** List projects — both admin & employee enter this route (scoped in controller). */
    public function viewAny(User $user): bool
    {
        return $user->isStaff();
    }

    /** View a single project. */
    public function view(User $user, Project $project): bool
    {
        if ($user->isEmployee()) {
            return (int) $project->employee_id === $user->id;
        }

        if ($user->isClient()) {
            return (int) $project->client_id === $user->id;
        }

        return false;
    }

    /** Create a project — admin only (before() grants this automatically). */
    public function create(User $user): bool
    {
        return false; // only admin, handled by before()
    }

    /** Update a project. */
    public function update(User $user, Project $project): bool
    {
        if ($user->isEmployee()) {
            return (int) $project->employee_id === $user->id;
        }

        return false; // only admin or assigned employee
    }

    /** Delete a project — admin only (before() grants this automatically). */
    public function delete(User $user, Project $project): bool
    {
        return false; // only admin, handled by before()
    }
}
