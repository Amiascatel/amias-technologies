<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportTicketController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/support-tickets/index', [
            'tickets' => SupportTicket::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/support-tickets/create', [
            'nextNumber' => SupportTicket::nextNumber(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'ticket_number' => 'required|string|unique:support_tickets',
            'subject'       => 'required|string|max:255',
            'description'   => 'required|string',
            'status'        => 'required|in:open,in_progress,resolved,closed',
            'priority'      => 'required|in:low,medium,high,urgent',
            'category'      => 'required|in:technical,billing,general,feature_request',
            'client_name'   => 'required|string|max:255',
            'client_email'  => 'required|email|max:255',
            'client_phone'  => 'nullable|string|max:30',
            'assigned_to'   => 'nullable|string|max:255',
            'resolution'    => 'nullable|string',
        ]);

        SupportTicket::create($data);
        return redirect('/admin/support-tickets')->with('success', 'Ticket created.');
    }

    public function show(SupportTicket $supportTicket)
    {
        return Inertia::render('admin/support-tickets/show', ['ticket' => $supportTicket]);
    }

    public function edit(SupportTicket $supportTicket)
    {
        return Inertia::render('admin/support-tickets/edit', ['ticket' => $supportTicket]);
    }

    public function update(Request $request, SupportTicket $supportTicket)
    {
        $data = $request->validate([
            'subject'     => 'required|string|max:255',
            'description' => 'required|string',
            'status'      => 'required|in:open,in_progress,resolved,closed',
            'priority'    => 'required|in:low,medium,high,urgent',
            'category'    => 'required|in:technical,billing,general,feature_request',
            'client_name' => 'required|string|max:255',
            'client_email'=> 'required|email|max:255',
            'client_phone'=> 'nullable|string|max:30',
            'assigned_to' => 'nullable|string|max:255',
            'resolution'  => 'nullable|string',
        ]);

        if ($data['status'] === 'resolved' && !$supportTicket->resolved_at) {
            $data['resolved_at'] = now();
        }

        $supportTicket->update($data);
        return redirect('/admin/support-tickets')->with('success', 'Ticket updated.');
    }

    public function destroy(SupportTicket $supportTicket)
    {
        $supportTicket->delete();
        return redirect('/admin/support-tickets')->with('success', 'Ticket deleted.');
    }
}
