<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Service Request Received — Amias Technologies</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#111827;">

    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F5F5;padding:40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" role="presentation"
                    style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

                    <!-- ── HEADER ──────────────────────────────── -->
                    <tr>
                        <td style="background:#14213D;padding:0;">
                            <!-- Gold top bar -->
                            <div style="height:4px;background:linear-gradient(90deg,#FCA311,#e8940a,#FCA311);"></div>
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                                style="padding:28px 40px;">
                                <tr>
                                    <td>
                                        <img src="{{ config('app.url') }}/logo.png"
                                            alt="Amias Technologies" height="40"
                                            style="display:block;height:40px;width:auto;" />
                                    </td>
                                    <td align="right">
                                        <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.35);">
                                            Service Confirmation
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ── HERO ────────────────────────────────── -->
                    <tr>
                        <td style="background:#14213D;padding:0 40px 40px;">
                            <!-- Checkmark circle -->
                            <div style="width:64px;height:64px;border-radius:50%;background:rgba(252,163,17,0.15);border:2px solid rgba(252,163,17,0.35);display:flex;align-items:center;justify-content:center;margin-bottom:20px;">
                                <div style="width:64px;height:64px;border-radius:50%;background:rgba(252,163,17,0.12);text-align:center;line-height:64px;font-size:28px;">
                                    ✓
                                </div>
                            </div>
                            <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">
                                Request Received,<br />
                                <span style="color:#FCA311;">{{ $clientName }}!</span>
                            </h1>
                            <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.60);line-height:1.7;">
                                Thank you for choosing Amias Technologies. We have received your service request
                                and our team will be in touch within <strong style="color:#FCA311;">24 business hours</strong>.
                            </p>
                        </td>
                    </tr>

                    <!-- ── SERVICE SUMMARY ─────────────────────── -->
                    <tr>
                        <td style="background:#ffffff;padding:0;">
                            <!-- Gold label bar -->
                            <div style="background:linear-gradient(135deg,#FCA311,#e8940a);padding:10px 40px;">
                                <span style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#000000;">
                                    Your Service Request Summary
                                </span>
                            </div>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                                style="padding:28px 40px 24px;">
                                <!-- Service -->
                                <tr>
                                    <td style="padding-bottom:16px;">
                                        <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Service</p>
                                        <p style="margin:0;font-size:15px;font-weight:700;color:#111827;">{{ $service }}</p>
                                    </td>
                                </tr>

                                @if($package)
                                <!-- Package -->
                                <tr>
                                    <td style="padding-bottom:16px;">
                                        <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Package</p>
                                        <p style="margin:0;font-size:15px;font-weight:700;color:#111827;">{{ $package }}</p>
                                    </td>
                                </tr>
                                @endif

                                @if($price)
                                <!-- Price -->
                                <tr>
                                    <td style="padding-bottom:16px;">
                                        <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Quoted Price</p>
                                        <p style="margin:0;font-size:26px;font-weight:800;color:#FCA311;line-height:1;">
                                            {{ $price }}
                                            @if($period)
                                                <span style="font-size:13px;font-weight:400;color:#94A3B8;margin-left:4px;">{{ $period }}</span>
                                            @endif
                                        </p>
                                        <p style="margin:4px 0 0;font-size:11px;color:#94A3B8;">
                                            Final price confirmed after requirements discussion.
                                        </p>
                                    </td>
                                </tr>
                                @endif

                                <!-- Divider -->
                                <tr>
                                    <td style="padding-bottom:16px;">
                                        <div style="height:1px;background:#F0F0F0;"></div>
                                    </td>
                                </tr>

                                <!-- Contact details -->
                                <tr>
                                    <td>
                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                                <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                                                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Name</p>
                                                    <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">{{ $clientName }}</p>
                                                </td>
                                                @if($company)
                                                <td width="50%" style="padding-bottom:12px;vertical-align:top;">
                                                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Company</p>
                                                    <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">{{ $company }}</p>
                                                </td>
                                                @endif
                                            </tr>
                                            @if($phone)
                                            <tr>
                                                <td style="padding-bottom:12px;vertical-align:top;">
                                                    <p style="margin:0 0 3px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Phone</p>
                                                    <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">{{ $phone }}</p>
                                                </td>
                                            </tr>
                                            @endif
                                        </table>
                                    </td>
                                </tr>

                                @if($details)
                                <!-- Additional details -->
                                <tr>
                                    <td style="padding-top:4px;">
                                        <p style="margin:0 0 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#94A3B8;">Additional Details</p>
                                        <p style="margin:0;font-size:13px;color:#475569;line-height:1.7;background:#F9FAFB;border-left:3px solid #FCA311;padding:12px 16px;border-radius:0 8px 8px 0;">
                                            {{ $details }}
                                        </p>
                                    </td>
                                </tr>
                                @endif
                            </table>
                        </td>
                    </tr>

                    <!-- ── WHAT HAPPENS NEXT ───────────────────── -->
                    <tr>
                        <td style="background:#F9FAFB;padding:28px 40px;border-top:1px solid #F0F0F0;">
                            <h2 style="margin:0 0 20px;font-size:16px;font-weight:800;color:#111827;">
                                What happens next?
                            </h2>
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                @foreach ([
                                    ['01', 'We review your request', 'A consultant reviews the details and prepares for your call.'],
                                    ['02', 'Requirements call', 'We reach out within 24 hrs to discuss your needs and timeline.'],
                                    ['03', 'Proposal sent', 'You receive a clear scope of work and final pricing to approve.'],
                                    ['04', 'We get to work', 'Once approved, your dedicated team begins immediately.'],
                                ] as [$step, $title, $desc])
                                <tr>
                                    <td style="padding-bottom:16px;vertical-align:top;">
                                        <table cellpadding="0" cellspacing="0" role="presentation">
                                            <tr>
                                                <td style="vertical-align:top;padding-right:14px;">
                                                    <div style="width:32px;height:32px;border-radius:50%;background:#FCA311;text-align:center;line-height:32px;font-size:11px;font-weight:800;color:#000;">
                                                        {{ $step }}
                                                    </div>
                                                </td>
                                                <td style="vertical-align:top;">
                                                    <p style="margin:0 0 3px;font-size:13px;font-weight:700;color:#111827;">{{ $title }}</p>
                                                    <p style="margin:0;font-size:12px;color:#64748B;line-height:1.6;">{{ $desc }}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>

                    <!-- ── CONTACT / CTA ───────────────────────── -->
                    <tr>
                        <td style="background:#14213D;padding:28px 40px;text-align:center;">
                            <p style="margin:0 0 16px;font-size:13px;color:rgba(255,255,255,0.55);">
                                Have questions? Reach out to us directly.
                            </p>
                            <table cellpadding="0" cellspacing="0" role="presentation" align="center">
                                <tr>
                                    <td style="padding:0 6px;">
                                        <a href="tel:+260777272528"
                                            style="display:inline-block;background:linear-gradient(135deg,#FCA311,#e8940a);color:#000;font-size:13px;font-weight:700;text-decoration:none;padding:10px 22px;border-radius:10px;">
                                            +260 777 272 528
                                        </a>
                                    </td>
                                    <td style="padding:0 6px;">
                                        <a href="mailto:info@amiastechnologies.com"
                                            style="display:inline-block;border:1.5px solid rgba(252,163,17,0.40);color:#FCA311;font-size:13px;font-weight:600;text-decoration:none;padding:10px 22px;border-radius:10px;">
                                            info@amiastechnologies.com
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- ── FOOTER ──────────────────────────────── -->
                    <tr>
                        <td style="background:#0f1a2e;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
                            <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.25);">
                                © {{ date('Y') }} Amias Technologies Limited. All rights reserved.
                            </p>
                            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.15);">
                                Empowering <span style="color:#FCA311;">Zambia</span> Through Technology · Lusaka, Zambia
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
