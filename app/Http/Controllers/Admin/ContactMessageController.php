<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/contact-messages/index', [
            'messages' => ContactMessage::latest()->get(),
            'newCount' => ContactMessage::where('status', 'new')->count(),
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        if ($contactMessage->status === 'new') {
            $contactMessage->update(['status' => 'read']);
        }

        return Inertia::render('admin/contact-messages/show', [
            'message' => $contactMessage,
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage)
    {
        $data = $request->validate([
            'status'      => 'required|in:new,read,replied',
            'reply_notes' => 'nullable|string',
        ]);

        $contactMessage->update($data);
        return redirect('/admin/contact-messages')->with('success', 'Message updated.');
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();
        return redirect('/admin/contact-messages')->with('success', 'Message deleted.');
    }
}
