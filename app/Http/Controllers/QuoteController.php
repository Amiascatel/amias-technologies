<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function show()
    {
        return Inertia::render('homepages/quote-request');
    }

    public function store(Request $request)
    {
        $v = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'phone'   => 'nullable|string|max:30',
            'company' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'message' => 'required|string|max:5000',
        ]);
        ContactMessage::create([
            'name'    => $v['name'],
            'email'   => $v['email'],
            'phone'   => $v['phone'] ?? null,
            'subject' => 'Quotation Request' . (!empty($v['service']) ? ': '.$v['service'] : ''),
            'message' => (!empty($v['company']) ? 'Company: '.$v['company']."\n\n" : '').$v['message'],
            'status'  => 'new',
        ]);
        return back()->with('success', 'Quote request submitted! We will get back to you shortly.');
    }
}
