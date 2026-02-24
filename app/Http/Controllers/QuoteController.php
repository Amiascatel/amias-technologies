<?php

namespace App\Http\Controllers;

use App\Mail\ServiceRequestConfirmation;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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
            'service' => 'nullable|string|max:500',
            'package' => 'nullable|string|max:255',
            'price'   => 'nullable|string|max:50',
            'period'  => 'nullable|string|max:50',
            'message' => 'nullable|string|max:5000',
        ]);

        // Build a readable subject & body for the stored contact message
        $serviceLabel = trim(($v['service'] ?? '') . (isset($v['package']) ? ' — ' . $v['package'] : ''));
        $priceLabel   = isset($v['price']) ? $v['price'] . ' ' . ($v['period'] ?? '') : '';

        $bodyLines = [];
        if (!empty($v['company'])) $bodyLines[] = 'Company: '  . $v['company'];
        if (!empty($priceLabel))   $bodyLines[] = 'Price: '    . trim($priceLabel);
        if (!empty($v['message'])) $bodyLines[] = "\n" . $v['message'];

        ContactMessage::create([
            'name'    => $v['name'],
            'email'   => $v['email'],
            'phone'   => $v['phone'] ?? null,
            'subject' => 'Service Request' . ($serviceLabel ? ': ' . $serviceLabel : ''),
            'message' => implode("\n", $bodyLines),
            'status'  => 'new',
        ]);

        // Send confirmation email to the client
        try {
            Mail::to($v['email'])->send(new ServiceRequestConfirmation(
                clientName: $v['name'],
                service:    $v['service'] ?? 'Not specified',
                package:    $v['package'] ?? '',
                price:      $v['price']   ?? '',
                period:     $v['period']  ?? '',
                company:    $v['company'] ?? null,
                phone:      $v['phone']   ?? null,
                details:    $v['message'] ?? '',
            ));
        } catch (\Throwable $e) {
            Log::error('Service request confirmation email failed: ' . $e->getMessage());
        }

        return back()->with('success',
            'Your service request has been submitted! A confirmation email has been sent to ' . $v['email'] . '. Our team will be in touch within 24 business hours.'
        );
    }
}
