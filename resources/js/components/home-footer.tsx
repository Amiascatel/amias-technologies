import { type ElementType } from 'react';
import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const socialLinks: { icon: ElementType; label: string }[] = [
    { icon: Facebook,  label: 'Facebook' },
    { icon: Twitter,   label: 'Twitter' },
    { icon: Linkedin,  label: 'LinkedIn' },
    { icon: Instagram, label: 'Instagram' },
];

const serviceLinks = [
    'Software Development', 'Mobile Apps', 'IT Consulting',
    'Networking', 'Cybersecurity', 'Cloud & Digital', 'IT Repair',
];

const companyLinks: [string, string][] = [
    ['Company Profile', '/about'],
    ['Our History',     '/about#history'],
    ['Our Services',    '/services'],
    ['Contact Us',      '/contact'],
    ['Admin Portal',    '/login'],
];

export default function HomeFooter() {
    return (
        <footer style={{ backgroundColor: '#0D0F14' }}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-4">

                    {/* ── Brand column ──────────────────────────── */}
                    <div className="lg:col-span-1">
                        <img src="/logo.png" alt="Amias Technologies" className="h-10 w-auto mb-4 brightness-110" />
                        <p className="text-[13px] leading-relaxed mb-5" style={{ color: '#64748B' }}>
                            Smart, secure, and innovative technology solutions for businesses across Zambia and beyond.
                        </p>
                        <div className="flex items-center gap-2">
                            {socialLinks.map(s => {
                                const Icon = s.icon;
                                return (
                                    <button
                                        key={s.label}
                                        aria-label={s.label}
                                        className="size-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                                        style={{ background: 'rgba(255,255,255,0.06)', color: '#4B5563' }}
                                        onMouseEnter={e => {
                                            const b = e.currentTarget as HTMLButtonElement;
                                            b.style.backgroundColor = '#2563EB';
                                            b.style.color = '#fff';
                                        }}
                                        onMouseLeave={e => {
                                            const b = e.currentTarget as HTMLButtonElement;
                                            b.style.backgroundColor = 'rgba(255,255,255,0.06)';
                                            b.style.color = '#4B5563';
                                        }}
                                    >
                                        <Icon className="size-3.5" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Services column ───────────────────────── */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: '#E5E7EB' }}>Services</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map(s => (
                                <li key={s}>
                                    <Link
                                        href="/services"
                                        className="text-[13px] transition-colors"
                                        style={{ color: '#4B5563' }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#F9FAFB')}
                                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#4B5563')}
                                    >
                                        {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Company column ────────────────────────── */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: '#E5E7EB' }}>Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map(([label, href]) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="text-[13px] transition-colors"
                                        style={{ color: '#4B5563' }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#F9FAFB')}
                                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#4B5563')}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contact column ────────────────────────── */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: '#E5E7EB' }}>Get in Touch</h4>
                        <div className="space-y-4">
                            <a
                                href="mailto:info@amiastechnologies.com"
                                className="flex items-start gap-3 transition-colors"
                                style={{ color: '#4B5563' }}
                                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#F9FAFB')}
                                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#4B5563')}
                            >
                                <div className="mt-0.5 rounded-lg p-1.5 shrink-0" style={{ background: 'rgba(37,99,235,0.18)' }}>
                                    <Mail className="size-3.5 text-primary" />
                                </div>
                                <span className="text-[13px]">info@amiastechnologies.com</span>
                            </a>
                            <a
                                href="tel:+260777272528"
                                className="flex items-start gap-3 transition-colors"
                                style={{ color: '#4B5563' }}
                                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#F9FAFB')}
                                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#4B5563')}
                            >
                                <div className="mt-0.5 rounded-lg p-1.5 shrink-0" style={{ background: 'rgba(37,99,235,0.18)' }}>
                                    <Phone className="size-3.5 text-primary" />
                                </div>
                                <span className="text-[13px]">+260 777 272 528</span>
                            </a>
                            <div className="flex items-start gap-3" style={{ color: '#4B5563' }}>
                                <div className="mt-0.5 rounded-lg p-1.5 shrink-0" style={{ background: 'rgba(37,99,235,0.18)' }}>
                                    <MapPin className="size-3.5 text-primary" />
                                </div>
                                <span className="text-[13px]">Lusaka, Zambia</span>
                            </div>
                        </div>
                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                            style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                        >
                            Contact Us <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px]" style={{ color: '#374151' }}>
                        © {new Date().getFullYear()} Amias Technologies Limited. All rights reserved.
                    </p>
                    <p className="text-[12px]" style={{ color: '#374151' }}>Empowering Zambia Through Technology</p>
                </div>
            </div>
        </footer>
    );
}
