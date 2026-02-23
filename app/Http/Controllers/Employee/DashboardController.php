<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $projects = Project::where('employee_id', $user->id)
            ->with(['client:id,name,email,phone'])
            ->orderByDesc('updated_at')
            ->get(['id','client_id','employee_id','title','status','start_date','end_date','description','budget','currency','notes']);
        return Inertia::render('employee/dashboard', ['projects' => $projects]);
    }

    public function projectShow(Request $request, Project $project)
    {
        if ($request->user()->role === 'employee' && $project->employee_id !== $request->user()->id) abort(403);
        $project->load(['client:id,name,email,phone','employee:id,name,email']);
        return Inertia::render('employee/project-show', ['project' => $project]);
    }

    public function projectUpdate(Request $request, Project $project)
    {
        if ($request->user()->role === 'employee' && $project->employee_id !== $request->user()->id) abort(403);
        $v = $request->validate(['status'=>'required|in:planning,active,completed,on_hold,cancelled','notes'=>'nullable|string']);
        $project->update($v);
        return back()->with('success', 'Project updated.');
    }
}
