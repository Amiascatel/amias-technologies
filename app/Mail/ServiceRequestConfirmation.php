<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ServiceRequestConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string  $clientName,
        public string  $service,
        public string  $package,
        public string  $price,
        public string  $period,
        public ?string $company,
        public ?string $phone,
        public string  $details,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new \Illuminate\Mail\Mailables\Address('info@amiastechnologies.com', 'Amias Technologies'),
            subject: 'Service Request Received — ' . $this->service,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.service-request-confirmation',
        );
    }
}
