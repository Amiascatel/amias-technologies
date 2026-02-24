<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Quotation;
use App\Models\Project;
use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $projects   = Project::where('client_id', $user->id)->orderByDesc('updated_at')
            ->get(['id','title','status','start_date','end_date','description','budget','currency']);
        $invoices   = Invoice::where('client_email', $user->email)->orderByDesc('invoice_date')
            ->get(['id','invoice_number','invoice_date','due_date','total','currency','status']);
        $quotations = Quotation::where('client_email', $user->email)->orderByDesc('quote_date')
            ->get(['id','quote_number','quote_date','total','currency','status']);
        $tickets    = SupportTicket::where('client_email', $user->email)->orderByDesc('created_at')
            ->get(['id','ticket_number','subject','status','priority','created_at']);
        return Inertia::render('client/dashboard', compact('projects','invoices','quotations','tickets'));
    }

    public function projectShow(Project $project)
    {
        // ProjectPolicy::view() ensures this client owns the project
        $this->authorize('view', $project);
        $project->load(['employee:id,name,email,phone']);
        return Inertia::render('client/project-show', ['project' => $project]);
    }
}
