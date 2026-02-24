import { Head, useForm, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { ArrowRight, CheckCircle2, CheckCircle, Clock, Users, Tag, HeadsetIcon, X, Mail } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';

/* ── palette ─────────────────────────────────────────────── */
const G    = '#FCA311';
const G_D  = '#e8940a';
const G_BG = 'rgba(252,163,17,0.10)';
const G_BD = 'rgba(252,163,17,0.28)';
const G_GL = 'rgba(252,163,17,0.38)';
const NAVY = '#14213D';
const NAVYm= '#1a2a4a';
const BLK  = '#000000';

const serviceOptions = [
    'Web Development — CMS Website',
    'Web Development — Custom Web Design',
    'Web Development — E-commerce',
    'Web Development — Landing Page',
    'Software Development — Business System',
    'Software Development — Enterprise Software',
    'Software Development — API Development',
    'Software Development — System Integration',
    'Mobile Apps — Android App',
    'Mobile Apps — iOS App',
    'Mobile Apps — Cross-Platform App',
    'IT Consulting — IT Audit & Assessment',
    'IT Consulting — IT Support & Helpdesk',
    'IT Consulting — IT Strategy & Roadmap',
    'Networking — LAN / WAN Infrastructure',
    'Networking — Wi-Fi Solutions',
    'Networking — CCTV & Surveillance',
    'Networking — Structured Cabling',
    'Cybersecurity — Vulnerability Assessment & Penetration Testing',
    'Cybersecurity — Security Operations Centre (SOC)',
    'Cybersecurity — Endpoint & Network Security',
    'Cybersecurity — Compliance & Risk Management',
    'Cybersecurity — Security Awareness Training',
    'Cloud & Digital — Cloud Migration & Adoption',
    'Cloud & Digital — Multi-cloud Architecture',
    'Cloud & Digital — Cloud Cost Optimisation',
    'Cloud & Digital — Serverless & Containerisation',
    'Cloud & Digital — Disaster Recovery Planning',
    'IT Repair — Hardware Repair',
    'IT Repair — Software & OS Services',
    'IT Repair — Data Recovery',
    'IT Repair — Maintenance Contract',
    'Other',
];

const inputCls = [
    'w-full rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400',
    'transition-all outline-none bg-white',
    'border border-[#E5E7EB]',
    'focus:border-[#FCA311] focus:ring-2 focus:ring-[rgba(252,163,17,0.18)]',
].join(' ');

interface Selection {
    service: string;
    package: string;
    price:   string;
    period:  string;
}

/* ── Success Popup Modal ─────────────────────────────────── */
function SuccessModal({ message, selection, email, onClose }: {
    message:   string;
    selection: Selection | null;
    email:     string;
    onClose:   () => void;
}) {
    /* Auto-close after 8 s */
    const [countdown, setCountdown] = useState(8);
    useEffect(() => {
        const t = setInterval(() => setCountdown(c => {
            if (c <= 1) { clearInterval(t); onClose(); return 0; }
            return c - 1;
        }), 1000);
        return () => clearInterval(t);
    }, [onClose]);

    return (
        /* Backdrop */
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor:'rgba(0,0,0,0.60)', backdropFilter:'blur(4px)', animation:'pageFadeIn 0.2s ease-out' }}
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>

            {/* Modal card */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden"
                style={{ background:'#fff', boxShadow:'0 24px 60px rgba(0,0,0,0.30)', animation:'pageFadeIn 0.25s ease-out' }}>

                {/* Gold top bar */}
                <div className="h-1.5" style={{ background:`linear-gradient(90deg,${G},${G_D})` }} />

                {/* Close button */}
                <button onClick={onClose}
                    className="absolute top-4 right-4 rounded-full p-1.5 transition-colors hover:bg-gray-100"
                    style={{ color:'#94A3B8' }}>
                    <X className="size-4" />
                </button>

                <div className="px-8 pt-8 pb-6 text-center">
                    {/* Animated checkmark */}
                    <div className="mx-auto mb-5 flex items-center justify-center size-16 rounded-full"
                        style={{ background:G_BG, border:`2px solid ${G_BD}` }}>
                        <CheckCircle2 className="size-8" style={{ color:G }} />
                    </div>

                    <h2 className="text-[22px] font-extrabold mb-1" style={{ color:BLK }}>
                        Request Submitted!
                    </h2>
                    <p className="text-[13px] leading-relaxed mb-5" style={{ color:'#475569' }}>
                        {message}
                    </p>

                    {/* Service summary inside modal */}
                    {selection && (
                        <div className="rounded-xl text-left mb-5 overflow-hidden"
                            style={{ border:`1px solid ${G_BD}` }}>
                            <div className="px-4 py-2" style={{ background:`linear-gradient(135deg,${G},${G_D})` }}>
                                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-black">Service Requested</p>
                            </div>
                            <div className="px-4 py-3 bg-white space-y-2">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:'#94A3B8' }}>Service</p>
                                    <p className="text-[13px] font-semibold" style={{ color:BLK }}>{selection.service}</p>
                                </div>
                                {selection.package && (
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:'#94A3B8' }}>Package</p>
                                        <p className="text-[13px] font-semibold" style={{ color:BLK }}>{selection.package}</p>
                                    </div>
                                )}
                                {selection.price && (
                                    <div className="flex items-baseline gap-1.5 pt-1">
                                        <span className="text-[22px] font-extrabold" style={{ color:G }}>{selection.price}</span>
                                        {selection.period && <span className="text-[12px]" style={{ color:'#94A3B8' }}>{selection.period}</span>}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Email note */}
                    {email && (
                        <div className="flex items-center justify-center gap-2 mb-6 rounded-xl px-4 py-2.5"
                            style={{ background:'#F0FDF4', border:'1px solid #BBF7D0' }}>
                            <Mail className="size-4 shrink-0" style={{ color:'#16A34A' }} />
                            <p className="text-[12px]" style={{ color:'#15803D' }}>
                                Confirmation email sent to <strong>{email}</strong>
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Link href="/services"
                            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold text-black transition-all hover:scale-[1.02]"
                            style={{ background:`linear-gradient(135deg,${G},${G_D})`, boxShadow:`0 4px 14px ${G_GL}` }}
                        >
                            Browse Services <ArrowRight className="size-3.5" />
                        </Link>
                        <button onClick={onClose}
                            className="flex-1 rounded-xl px-4 py-3 text-[13px] font-semibold transition-all hover:bg-gray-50"
                            style={{ border:`1.5px solid #E5E7EB`, color:'#475569' }}
                        >
                            Close
                        </button>
                    </div>

                    {/* Countdown */}
                    <p className="text-[11px] mt-4" style={{ color:'#CBD5E1' }}>
                        Closing automatically in {countdown}s
                    </p>
                    {/* Progress bar */}
                    <div className="mt-2 h-0.5 rounded-full overflow-hidden" style={{ background:'#F1F5F9' }}>
                        <div className="h-full rounded-full transition-none" style={{
                            background:`linear-gradient(90deg,${G},${G_D})`,
                            width:`${(countdown / 8) * 100}%`,
                            transition:'width 1s linear',
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function ServiceRequest() {
    const { props } = usePage<{ flash?: { success?: string } }>();
    const flash = props.flash;
    const [selection, setSelection] = useState<Selection | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', email: '', phone: '', company: '', service: '',
        package: '', price: '', period: '', message: '',
    });

    /* Read URL params on mount */
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const p = new URLSearchParams(window.location.search);
        const svc    = p.get('service') ?? '';
        const pkg    = p.get('package') ?? '';
        const price  = p.get('price')   ?? '';
        const period = p.get('period')  ?? '';

        if (svc) {
            setData(prev => ({
                ...prev,
                service: svc,
                package: pkg,
                price,
                period,
            }));
            setSelection({ service: svc, package: pkg, price, period });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Show modal when flash.success arrives */
    useEffect(() => {
        if (flash?.success) setShowModal(true);
    }, [flash?.success]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setSubmittedEmail(data.email);
        post('/quote', { onSuccess: () => reset() });
    };

    return (
        <HomeLayout>
            <Head title="Request a Service — Amias Technologies" />

            {/* Success popup */}
            {showModal && flash?.success && (
                <SuccessModal
                    message={flash.success}
                    selection={selection}
                    email={submittedEmail}
                    onClose={() => setShowModal(false)}
                />
            )}

            {/* ══ HERO HEADER ═══════════════════════════════════════ */}
            <section className="relative overflow-hidden py-16 lg:py-24"
                style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVYm} 100%)` }}>
                <div className="absolute inset-0" style={{ backgroundImage:`linear-gradient(rgba(252,163,17,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.06) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
                <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)` }} />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6 text-[12px]" style={{ color:'rgba(255,255,255,0.45)' }}>
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span style={{ color:G }}>/</span>
                        <Link href="/pricing" className="transition-colors hover:text-white">Pricing</Link>
                        <span style={{ color:G }}>/</span>
                        <span style={{ color:G }}>Request a Service</span>
                    </div>
                    <span className="inline-block mb-4 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]"
                        style={{ background:G_BG, color:G, border:`1px solid ${G_BD}` }}>Get Started</span>
                    <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-white leading-[1.06]">
                        Request a <span style={{ color:G }}>Service</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-[15px] leading-[1.75]" style={{ color:'rgba(255,255,255,0.60)' }}>
                        Fill in your details below and our team will confirm and get started within 24 hours.
                    </p>
                </div>
            </section>

            {/* ══ FORM SECTION ══════════════════════════════════════ */}
            <section className="py-16 lg:py-24" style={{ backgroundColor:'#F5F5F5' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">

                        {/* ── Sidebar ─────────────────────────────── */}
                        <div className="space-y-6">

                            {/* Selected service summary card */}
                            {selection && (
                                <div className="rounded-2xl overflow-hidden"
                                    style={{ border:`1.5px solid ${G_BD}`, boxShadow:`0 4px 24px rgba(252,163,17,0.12)` }}>
                                    <div className="px-5 py-3" style={{ background:`linear-gradient(135deg,${G},${G_D})` }}>
                                        <p className="text-[11px] font-bold uppercase tracking-[2px] text-black">
                                            Your Selected Service
                                        </p>
                                    </div>
                                    <div className="bg-white px-5 py-4 space-y-3">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color:'#94A3B8' }}>Service</p>
                                            <p className="text-[13px] font-semibold" style={{ color:BLK }}>{selection.service}</p>
                                        </div>
                                        {selection.package && (
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color:'#94A3B8' }}>Package</p>
                                                <p className="text-[13px] font-semibold" style={{ color:BLK }}>{selection.package}</p>
                                            </div>
                                        )}
                                        <div className="h-px" style={{ background:'#F0F0F0' }} />
                                        {selection.price && (
                                            <div className="flex items-baseline gap-1.5">
                                                <span className="text-[26px] font-extrabold leading-none" style={{ color:G }}>{selection.price}</span>
                                                {selection.period && <span className="text-[12px]" style={{ color:'#94A3B8' }}>{selection.period}</span>}
                                            </div>
                                        )}
                                        <p className="text-[11px]" style={{ color:'#94A3B8' }}>
                                            Final price confirmed after requirements discussion.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* What happens next */}
                            <div>
                                <h2 className="text-[17px] font-extrabold tracking-tight mb-4" style={{ color:BLK }}>
                                    What happens <span style={{ color:G }}>next?</span>
                                </h2>
                                {[
                                    { icon: Clock,       title: 'We respond within 24 hrs',  desc: 'A consultant reviews your request and contacts you to confirm details.' },
                                    { icon: Users,       title: 'Requirements call',           desc: 'Brief call to understand your exact needs and timeline.' },
                                    { icon: Tag,         title: 'Proposal sent',               desc: 'Clear scope of work and final pricing before we begin.' },
                                    { icon: HeadsetIcon, title: 'Dedicated support',           desc: 'A named account manager guides you through delivery.' },
                                ].map(item => (
                                    <div key={item.title} className="flex gap-3 mb-4">
                                        <div className="mt-0.5 shrink-0 rounded-lg p-1.5" style={{ background:G_BG, border:`1px solid ${G_BD}` }}>
                                            <item.icon className="size-4" style={{ color:G }} />
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold" style={{ color:BLK }}>{item.title}</p>
                                            <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color:'#475569' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Call instead */}
                            <div className="rounded-2xl p-5" style={{ background:G_BG, border:`1px solid ${G_BD}` }}>
                                <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color:G }}>Prefer to talk first?</p>
                                <a href="tel:+260777272528" className="text-[15px] font-bold transition-colors block"
                                    style={{ color:BLK }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = G)}
                                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = BLK)}
                                >+260 777 272 528</a>
                                <p className="mt-0.5 text-[12px]" style={{ color:'#475569' }}>Mon – Fri, 08:00–17:00 CAT</p>
                            </div>

                            <div className="flex items-start gap-2">
                                <CheckCircle className="size-4 shrink-0 mt-0.5" style={{ color:G }} />
                                <p className="text-[12px]" style={{ color:'#475569' }}>No commitment until you approve our proposal</p>
                            </div>
                        </div>

                        {/* ── Form ────────────────────────────────── */}
                        <div className="lg:col-span-2">
                            <form onSubmit={submit}
                                className="rounded-2xl bg-white overflow-hidden"
                                style={{ border:'1px solid #E5E7EB', boxShadow:'0 2px 20px rgba(0,0,0,0.06)' }}>

                                {/* Form header */}
                                <div className="px-8 py-5 border-b border-[#F0F0F0]" style={{ background:'#FAFAFA' }}>
                                    <h3 className="text-[15px] font-extrabold" style={{ color:BLK }}>Your Details</h3>
                                    <p className="text-[12px] mt-0.5" style={{ color:'#94A3B8' }}>Fields marked * are required</p>
                                </div>

                                <div className="p-8 space-y-5">

                                    {/* Inline service summary banner */}
                                    {selection && (
                                        <div className="rounded-xl overflow-hidden" style={{ border:`1px solid ${G_BD}` }}>
                                            <div className="px-4 py-2.5" style={{ background:`linear-gradient(135deg,${G},${G_D})` }}>
                                                <p className="text-[11px] font-bold uppercase tracking-[1.5px] text-black">
                                                    Requesting This Service
                                                </p>
                                            </div>
                                            <div className="px-4 py-3 bg-white flex flex-wrap items-center gap-x-6 gap-y-2">
                                                <div>
                                                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:'#94A3B8' }}>Service</p>
                                                    <p className="text-[13px] font-semibold" style={{ color:BLK }}>{selection.service}</p>
                                                </div>
                                                {selection.package && (
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:'#94A3B8' }}>Package</p>
                                                        <p className="text-[13px] font-semibold" style={{ color:BLK }}>{selection.package}</p>
                                                    </div>
                                                )}
                                                {selection.price && (
                                                    <div className="ml-auto text-right">
                                                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color:'#94A3B8' }}>Price</p>
                                                        <p className="text-[20px] font-extrabold leading-tight" style={{ color:G }}>
                                                            {selection.price}
                                                            {selection.period && <span className="text-[12px] font-normal ml-1" style={{ color:'#94A3B8' }}>{selection.period}</span>}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Hidden fields for package/price/period */}
                                    <input type="hidden" value={data.package} onChange={e => setData('package', e.target.value)} />
                                    <input type="hidden" value={data.price}   onChange={e => setData('price',   e.target.value)} />
                                    <input type="hidden" value={data.period}  onChange={e => setData('period',  e.target.value)} />

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color:'#374151' }}>Full Name *</label>
                                            <input className={inputCls} value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="John Banda" />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color:'#374151' }}>Email Address *</label>
                                            <input type="email" className={inputCls} value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="john@company.com" />
                                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color:'#374151' }}>Phone Number</label>
                                            <input className={inputCls} value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                placeholder="+260 77X XXX XXX" />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color:'#374151' }}>Company / Organisation</label>
                                            <input className={inputCls} value={data.company}
                                                onChange={e => setData('company', e.target.value)}
                                                placeholder="Your company name" />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color:'#374151' }}>Service Required</label>
                                            <select className={inputCls} value={data.service}
                                                onChange={e => setData('service', e.target.value)}>
                                                <option value="">Select a service…</option>
                                                {serviceOptions.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            {selection && (
                                                <p className="text-[11px] mt-1" style={{ color:'#94A3B8' }}>
                                                    Pre-filled from your selection — change if needed.
                                                </p>
                                            )}
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color:'#374151' }}>Additional Details</label>
                                            <textarea className={inputCls} rows={5} value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                placeholder="Describe your requirements, timeline, budget, or any questions about this service…" />
                                            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                        </div>
                                    </div>

                                    <button type="submit" disabled={processing}
                                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-bold text-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                                        style={{ background:`linear-gradient(135deg,${G},${G_D})`, boxShadow:`0 4px 20px ${G_GL}` }}
                                    >
                                        {processing ? 'Submitting…' : 'Submit Service Request'} <ArrowRight className="size-4" />
                                    </button>
                                    <p className="text-center text-[11px]" style={{ color:'#9CA3AF' }}>
                                        A confirmation email will be sent to your inbox. No commitment until you approve our proposal.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
