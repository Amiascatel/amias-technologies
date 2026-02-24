import { type ElementType } from 'react';
import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const G    = '#FCA311';
const G_D  = '#e8940a';
const G_BG = 'rgba(252,163,17,0.10)';
const G_BD = 'rgba(252,163,17,0.20)';
const NAVY = '#14213D';

const socialLinks: { icon: ElementType; label: string; href: string }[] = [
    { icon: Facebook,  label: 'Facebook',  href: '#' },
    { icon: Twitter,   label: 'Twitter',   href: '#' },
    { icon: Linkedin,  label: 'LinkedIn',  href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
];

const serviceLinks = [
    ['Software Development', '/services#software'],
    ['Mobile Apps',          '/services#mobile'],
    ['IT Consulting',        '/services#consulting'],
    ['Networking',           '/services#networking'],
    ['Cybersecurity',        '/services#cybersecurity'],
    ['Cloud & Digital',      '/services#cloud'],
    ['IT Repair',            '/services#repair'],
] as const;

const companyLinks: [string, string][] = [
    ['Company Profile', '/about'],
    ['Our History',     '/about#history'],
    ['Our Services',    '/services'],
    ['Contact Us',      '/contact'],
    ['Client Portal',   '/login'],
];

export default function HomeFooter() {
    return (
        <footer style={{ backgroundColor: NAVY }}>
            {/* Gold top border */}
            <div style={{ height: 3, background: `linear-gradient(90deg,${G},${G_D},${G})` }} />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid gap-12 lg:grid-cols-4">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <img src="/logo.png" alt="Amias Technologies" className="h-10 w-auto mb-4 brightness-110" />
                        <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)' }}>
                            Smart, secure, and innovative technology solutions for businesses across Zambia and beyond.
                        </p>
                        <div className="flex items-center gap-2">
                            {socialLinks.map(({ icon: Icon, label, href }) => (
                                <a key={label} href={href} aria-label={label}
                                    className="size-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.45)' }}
                                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = G; el.style.color = '#000'; }}
                                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = 'rgba(255,255,255,0.07)'; el.style.color = 'rgba(255,255,255,0.45)'; }}
                                >
                                    <Icon className="size-3.5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: G }}>Services</h4>
                        <ul className="space-y-3">
                            {serviceLinks.map(([label, href]) => (
                                <li key={label}>
                                    <Link href={href} className="flex items-center gap-1.5 text-[13px] transition-colors group"
                                        style={{ color: 'rgba(255,255,255,0.45)' }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = G)}
                                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                                    >
                                        <span className="size-1 rounded-full shrink-0" style={{ background: G, opacity: 0.6 }} />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: G }}>Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map(([label, href]) => (
                                <li key={label}>
                                    <Link href={href} className="flex items-center gap-1.5 text-[13px] transition-colors"
                                        style={{ color: 'rgba(255,255,255,0.45)' }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = G)}
                                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                                    >
                                        <span className="size-1 rounded-full shrink-0" style={{ background: G, opacity: 0.6 }} />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[2px] mb-5" style={{ color: G }}>Get in Touch</h4>
                        <div className="space-y-4">
                            {[
                                { href: 'mailto:info@amiastechnologies.com', icon: Mail,   text: 'info@amiastechnologies.com' },
                                { href: 'tel:+260777272528',                 icon: Phone,  text: '+260 777 272 528' },
                            ].map(({ href, icon: Icon, text }) => (
                                <a key={text} href={href} className="flex items-start gap-3 transition-colors"
                                    style={{ color: 'rgba(255,255,255,0.45)' }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = G)}
                                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                                >
                                    <div className="mt-0.5 rounded-lg p-1.5 shrink-0" style={{ background: G_BG, border: `1px solid ${G_BD}` }}>
                                        <Icon className="size-3.5" style={{ color: G }} />
                                    </div>
                                    <span className="text-[13px]">{text}</span>
                                </a>
                            ))}
                            <div className="flex items-start gap-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
                                <div className="mt-0.5 rounded-lg p-1.5 shrink-0" style={{ background: G_BG, border: `1px solid ${G_BD}` }}>
                                    <MapPin className="size-3.5" style={{ color: G }} />
                                </div>
                                <span className="text-[13px]">Lusaka, Zambia</span>
                            </div>
                        </div>

                        <Link href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-black transition-all hover:opacity-90 hover:scale-[1.02]"
                            style={{ background: `linear-gradient(135deg,${G},${G_D})`, boxShadow: `0 4px 14px rgba(252,163,17,0.35)` }}
                        >
                            Contact Us <ArrowRight className="size-3.5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: `1px solid rgba(252,163,17,0.12)` }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.30)' }}>
                        © {new Date().getFullYear()} Amias Technologies Limited. All rights reserved.
                    </p>
                    <p className="text-[12px]" style={{ color: 'rgba(255,255,255,0.30)' }}>
                        Empowering <span style={{ color: G }}>Zambia</span> Through Technology
                    </p>
                </div>
            </div>
        </footer>
    );
}
