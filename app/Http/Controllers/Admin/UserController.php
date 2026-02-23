<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('role')->orderBy('name')
            ->get(['id','name','email','role','phone','company','created_at']);
        return Inertia::render('admin/users/index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role'     => 'required|in:admin,employee,client',
            'phone'    => 'nullable|string|max:30',
            'company'  => 'nullable|string|max:255',
        ]);
        $v['password'] = Hash::make($v['password']);
        $v['email_verified_at'] = now();
        User::create($v);
        return redirect('/admin/users')->with('success', 'User account created.');
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user->only('id','name','email','role','phone','company'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $v = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,'.$user->id,
            'role'     => 'required|in:admin,employee,client',
            'phone'    => 'nullable|string|max:30',
            'company'  => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);
        if (empty($v['password'])) unset($v['password']);
        else $v['password'] = Hash::make($v['password']);
        $user->update($v);
        return redirect('/admin/users')->with('success', 'User updated.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect('/admin/users')->with('success', 'User deleted.');
    }
}
