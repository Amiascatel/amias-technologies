import { Head, useForm, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { FormEventHandler } from 'react';

const services = [
    'Software Development', 'Mobile App Development', 'IT Consulting',
    'Networking & Infrastructure', 'Cybersecurity', 'Cloud & Digital Transformation',
    'IT Repair & Maintenance', 'Other',
];

const inputCls = 'w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500';
const sel = 'w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-gray-800 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500';

export default function QuoteRequest() {
    const { props } = usePage<{ flash?: { success?: string } }>();
    const flash = props.flash;
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', email: '', phone: '', company: '', service: '', message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/quote', { onSuccess: () => reset() });
    };

    return (
        <HomeLayout>
            <Head title="Request a Quote — Amias Technologies" />

            {/* Header */}
            <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">Request a Quote</span>
                    </div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Get Started</p>
                    <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-white">Request a Quote</h1>
                    <p className="mt-4 max-w-xl text-[15px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                        Tell us about your project and we&apos;ll provide a detailed, personalised quotation within 24 hours.
                    </p>
                </div>
            </section>

            <section style={{ backgroundColor: '#F7F8FA' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">
                        {/* Info */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-[18px] font-bold" style={{ color: '#111827' }}>Why choose us?</h2>
                                <p className="text-[13px] mt-2 leading-relaxed" style={{ color: '#6B7280' }}>We deliver tailored solutions for every budget and deadline.</p>
                            </div>
                            {[
                                { title: 'Fast Response', desc: 'Quotation delivered within 24 hours.' },
                                { title: 'Transparent Pricing', desc: 'No hidden fees — clear, itemised quotes.' },
                                { title: 'Expert Team', desc: 'Experienced engineers across all domains.' },
                                { title: 'Ongoing Support', desc: 'Post-delivery maintenance and support.' },
                            ].map(item => (
                                <div key={item.title} className="flex gap-3">
                                    <CheckCircle2 className="size-5 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-[13px] font-semibold" style={{ color: '#111827' }}>{item.title}</p>
                                        <p className="text-[12px]" style={{ color: '#6B7280' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            {flash?.success ? (
                                <div className="rounded-2xl bg-white p-8 text-center border" style={{ border: '1px solid #E5E7EB' }}>
                                    <CheckCircle2 className="size-12 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2" style={{ color: '#111827' }}>Quote Request Submitted!</h3>
                                    <p className="text-[14px] mb-6" style={{ color: '#6B7280' }}>{flash.success}</p>
                                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline">Back to Home <ArrowRight className="size-4" /></Link>
                                </div>
                            ) : (
                                <form onSubmit={submit} className="rounded-2xl bg-white p-8 space-y-5" style={{ border: '1px solid #E5E7EB' }}>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#374151' }}>Full Name *</label>
                                            <input className={inputCls} value={data.name} onChange={e => setData('name', e.target.value)} placeholder="John Banda" />
                                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#374151' }}>Email Address *</label>
                                            <input type="email" className={inputCls} value={data.email} onChange={e => setData('email', e.target.value)} placeholder="john@company.com" />
                                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#374151' }}>Phone Number</label>
                                            <input className={inputCls} value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="+260 77X XXX XXX" />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#374151' }}>Company / Organisation</label>
                                            <input className={inputCls} value={data.company} onChange={e => setData('company', e.target.value)} placeholder="Your company name" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#374151' }}>Service Required</label>
                                            <select className={sel} value={data.service} onChange={e => setData('service', e.target.value)}>
                                                <option value="">Select a service...</option>
                                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#374151' }}>Project Details *</label>
                                            <textarea className={inputCls} rows={5} value={data.message} onChange={e => setData('message', e.target.value)}
                                                placeholder="Describe your project, requirements, timeline, and any specific features you need..." />
                                            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                                        </div>
                                    </div>
                                    <button type="submit" disabled={processing}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 w-full justify-center"
                                        style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                                    >
                                        {processing ? 'Submitting...' : 'Submit Quote Request'} <ArrowRight className="size-4" />
                                    </button>
                                    <p className="text-center text-[11px]" style={{ color: '#9CA3AF' }}>We typically respond within 24 business hours.</p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}