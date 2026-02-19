<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/projects/index', [
            'projects' => Project::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'client_name'  => 'required|string|max:255',
            'client_email' => 'nullable|email|max:255',
            'client_phone' => 'nullable|string|max:30',
            'description'  => 'nullable|string',
            'status'       => 'required|in:planning,active,completed,on_hold,cancelled',
            'start_date'   => 'nullable|date',
            'end_date'     => 'nullable|date|after_or_equal:start_date',
            'budget'       => 'nullable|numeric|min:0',
            'currency'     => 'required|string|max:5',
            'notes'        => 'nullable|string',
        ]);

        Project::create($data);
        return redirect('/admin/projects')->with('success', 'Project created.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', ['project' => $project]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'client_name'  => 'required|string|max:255',
            'client_email' => 'nullable|email|max:255',
            'client_phone' => 'nullable|string|max:30',
            'description'  => 'nullable|string',
            'status'       => 'required|in:planning,active,completed,on_hold,cancelled',
            'start_date'   => 'nullable|date',
            'end_date'     => 'nullable|date|after_or_equal:start_date',
            'budget'       => 'nullable|numeric|min:0',
            'currency'     => 'required|string|max:5',
            'notes'        => 'nullable|string',
        ]);

        $project->update($data);
        return redirect('/admin/projects')->with('success', 'Project updated.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect('/admin/projects')->with('success', 'Project deleted.');
    }
}
