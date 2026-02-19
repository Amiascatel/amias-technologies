import { Head, useForm } from '@inertiajs/react';
import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { Link } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';

export default function Contact() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '', email: '', phone: '', subject: '', message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    const inputCls = 'w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-gray-800 placeholder:text-gray-400 transition-all outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500';

    return (
        <HomeLayout>
            <Head title="Contact Us — Amias Technologies" />

            {/* HEADER */}
            <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">Contact</span>
                    </div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Get In Touch</p>
                    <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-white">Contact Us</h1>
                    <p className="mt-4 max-w-xl text-[15px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                        Let&apos;s build something great together. Reach out and tell us about your project.
                    </p>
                </div>
            </section>

            {/* CONTENT */}
            <section style={{ backgroundColor: '#F7F8FA' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-3">

                        {/* INFO */}
                        <div className="space-y-4">
                            <h2 className="text-[18px] font-bold" style={{ color: '#111827' }}>Contact Information</h2>
                            <p className="text-[13px] leading-relaxed" style={{ color: '#6B7280' }}>
                                Always here when you need us. Reach out through any of these channels.
                            </p>

                            {[
                                { icon: Mail,    label: 'Email',    val: 'info@amiastechnologies.com', href: 'mailto:info@amiastechnologies.com' },
                                { icon: Phone,   label: 'Phone',    val: '+260 777 272 528',            href: 'tel:+260777272528' },
                                { icon: MapPin,  label: 'Location', val: 'Lusaka, Zambia',              href: null as null },
                                { icon: Clock,   label: 'Hours',    val: 'Mon–Fri, 8am–6pm CAT',       href: null as null },
                            ].map(c => (
                                <div key={c.label} className="flex gap-3 rounded-2xl bg-white p-4" style={{ border: '1px solid #E5E7EB' }}>
                                    <div className="mt-0.5 inline-flex rounded-xl p-2.5 shrink-0" style={{ background: 'rgba(37,99,235,0.08)' }}>
                                        <c.icon className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#9CA3AF' }}>{c.label}</p>
                                        {c.href ? (
                                            <a href={c.href} className="mt-0.5 text-[14px] font-medium transition-colors hover:text-primary" style={{ color: '#374151' }}>{c.val}</a>
                                        ) : (
                                            <p className="mt-0.5 text-[14px] font-medium" style={{ color: '#374151' }}>{c.val}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563EB)' }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="size-2 rounded-full bg-green-400 animate-pulse" />
                                    <p className="text-[13px] font-bold text-white">24/7 Support Available</p>
                                </div>
                                <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                                    Our support team is available around the clock for critical issues.
                                </p>
                            </div>
                        </div>

                        {/* FORM */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 lg:p-8" style={{ border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <h2 className="mb-6 text-[18px] font-bold" style={{ color: '#111827' }}>Send Us a Message</h2>
                                <form onSubmit={submit} className="space-y-5">
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Full Name</label>
                                            <input
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                placeholder="Your full name"
                                                className={inputCls}
                                                style={{ borderColor: errors.name ? '#EF4444' : '#E5E7EB' }}
                                            />
                                            {errors.name && <p className="mt-1.5 text-[11px]" style={{ color: '#EF4444' }}>{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Email Address</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                placeholder="you@example.com"
                                                className={inputCls}
                                                style={{ borderColor: errors.email ? '#EF4444' : '#E5E7EB' }}
                                            />
                                            {errors.email && <p className="mt-1.5 text-[11px]" style={{ color: '#EF4444' }}>{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Phone Number</label>
                                            <input
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                placeholder="+260 ..."
                                                className={inputCls}
                                                style={{ borderColor: '#E5E7EB' }}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Subject</label>
                                            <input
                                                value={data.subject}
                                                onChange={e => setData('subject', e.target.value)}
                                                placeholder="How can we help?"
                                                className={inputCls}
                                                style={{ borderColor: errors.subject ? '#EF4444' : '#E5E7EB' }}
                                            />
                                            {errors.subject && <p className="mt-1.5 text-[11px]" style={{ color: '#EF4444' }}>{errors.subject}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#6B7280' }}>Message</label>
                                        <textarea
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            placeholder="Tell us about your project..."
                                            rows={5}
                                            className={inputCls + ' resize-none'}
                                            style={{ borderColor: errors.message ? '#EF4444' : '#E5E7EB' }}
                                        />
                                        {errors.message && <p className="mt-1.5 text-[11px]" style={{ color: '#EF4444' }}>{errors.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[14px] font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                                        style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                                    >
                                        {processing ? 'Sending...' : (<>Send Message <ArrowRight className="size-4" /></>)}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
