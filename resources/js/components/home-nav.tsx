import { useState, useEffect, useRef, type ElementType } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight,
    Code, MonitorSmartphone, Headset, Network, Shield, Cloud, Wrench,
    Building2, Clock,
} from 'lucide-react';

/* ── Black & Gold Elegance palette ──────────────────────────── */
const G    = '#FCA311';          // gold
const G_D  = '#e8940a';          // dark gold
const G_BG = 'rgba(252,163,17,0.10)';
const G_BD = 'rgba(252,163,17,0.28)';
const G_GL = 'rgba(252,163,17,0.38)';
const NAVY = '#14213D';
const BLK  = '#000000';

const navServices: { icon: ElementType; label: string; href: string; desc: string }[] = [
    { icon: Code,              label: 'Software Development', href: '/services#software',     desc: 'Custom web & enterprise apps' },
    { icon: MonitorSmartphone, label: 'Mobile Apps',          href: '/services#mobile',       desc: 'iOS & Android development' },
    { icon: Headset,           label: 'IT Consulting',        href: '/services#consulting',   desc: 'Strategy & technical support' },
    { icon: Network,           label: 'Networking',           href: '/services#networking',   desc: 'Infrastructure & installation' },
    { icon: Shield,            label: 'Cybersecurity',        href: '/services#cybersecurity',desc: 'Protection & training' },
    { icon: Cloud,             label: 'Cloud & Digital',      href: '/services#cloud',        desc: 'Migration & transformation' },
    { icon: Wrench,            label: 'IT Repair',            href: '/services#repair',       desc: 'Maintenance & support' },
];

const navAbout: { icon: ElementType; label: string; href: string; desc: string }[] = [
    { icon: Building2, label: 'Company Profile', href: '/about',         desc: 'Our story, mission & values' },
    { icon: Clock,     label: 'Our History',     href: '/about#history', desc: 'Milestones & achievements' },
];

export default function HomeNav() {
    const [mobileOpen, setMobileOpen]     = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [aboutOpen, setAboutOpen]       = useState(false);
    const [scrolled, setScrolled]         = useState(false);
    const servicesRef = useRef<HTMLDivElement>(null);
    const aboutRef    = useRef<HTMLDivElement>(null);
    const { url, props } = usePage();
    const authUser = (props as any).auth?.user as { role: string } | null | undefined;
    const dashboardHref = authUser?.role === 'admin'    ? '/admin/dashboard'
                        : authUser?.role === 'employee' ? '/employee/dashboard'
                        : '/client/dashboard';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
            if (aboutRef.current    && !aboutRef.current.contains(e.target as Node))    setAboutOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [url]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isActive = (href: string) => href === '/' ? url === '/' : url.startsWith(href);
    const closeAll = () => { setServicesOpen(false); setAboutOpen(false); };

    return (
        <>
            {/* ══ TOP INFO BAR ═════════════════════════════════════ */}
            <div className="hidden lg:block" style={{ background: NAVY, borderBottom: `1px solid ${G_BD}` }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-9 items-center justify-between">
                        <div className="flex items-center gap-6">
                            {[
                                { href: 'mailto:info@amiastechnologies.com', icon: Mail, label: 'info@amiastechnologies.com' },
                                { href: 'tel:+260777272528',                 icon: Phone, label: '+260 777 272 528' },
                            ].map(({ href, icon: Icon, label }) => (
                                <a key={label} href={href}
                                    className="flex items-center gap-1.5 text-[11px] transition-colors"
                                    style={{ color: 'rgba(255,255,255,0.58)' }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = G)}
                                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.58)')}
                                >
                                    <Icon className="size-3" /> {label}
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.38)' }}>
                            <MapPin className="size-3" style={{ color: G }} /> Lusaka, Zambia
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ MAIN NAVBAR ══════════════════════════════════════ */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}
                style={{ backgroundColor: '#fff', borderBottom: '1px solid #E5E5E5' }}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-17 items-center justify-between gap-6">

                        {/* Logo */}
                        <Link href="/" className="shrink-0 transition-opacity hover:opacity-85">
                            <img src="/logo.png" alt="Amias Technologies" className="h-11 w-auto" />
                        </Link>

                        {/* Desktop nav links */}
                        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">

                            {/* Home */}
                            <Link href="/"
                                className="px-4 py-2 rounded-lg text-[14px] font-medium transition-all"
                                style={isActive('/') ? { color: G, fontWeight: 700, background: G_BG } : { color: '#374151' }}
                                onMouseEnter={e => { if (!isActive('/')) { const el = e.currentTarget as HTMLAnchorElement; el.style.color = G; } }}
                                onMouseLeave={e => { if (!isActive('/')) { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#374151'; } }}
                            >
                                Home
                            </Link>

                            {/* Services */}
                            <div className="relative" ref={servicesRef}>
                                <button
                                    onClick={() => { setServicesOpen(o => !o); setAboutOpen(false); }}
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-[14px] font-medium transition-all"
                                    style={isActive('/services') ? { color: G, fontWeight: 700, background: G_BG } : { color: '#374151' }}
                                    onMouseEnter={e => { if (!isActive('/services')) (e.currentTarget as HTMLButtonElement).style.color = G; }}
                                    onMouseLeave={e => { if (!isActive('/services')) (e.currentTarget as HTMLButtonElement).style.color = '#374151'; }}
                                >
                                    Services <ChevronDown className={`size-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {servicesOpen && (
                                    <div className="absolute top-full mt-2 w-130 rounded-2xl bg-white p-5"
                                        style={{ left: '50%', transform: 'translateX(-40%)', border: `1px solid #E5E5E5`, boxShadow: '0 20px 60px rgba(0,0,0,0.10)' }}
                                    >
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px]" style={{ color: G }}>Our Services</p>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {navServices.map(({ icon: Icon, label, href, desc }) => (
                                                <Link key={label} href={href} onClick={() => setServicesOpen(false)}
                                                    className="flex items-start gap-3 rounded-xl p-3 transition-colors"
                                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = G_BG; }}
                                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                                                >
                                                    <div className="mt-0.5 rounded-lg p-2 shrink-0" style={{ background: G_BG }}>
                                                        <Icon className="size-3.5" style={{ color: G }} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-semibold" style={{ color: BLK }}>{label}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>{desc}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: `1px solid #E5E5E5` }}>
                                            <p className="text-[12px]" style={{ color: '#9CA3AF' }}>Comprehensive IT solutions for your business</p>
                                            <Link href="/services" onClick={() => setServicesOpen(false)}
                                                className="flex items-center gap-1 text-[12px] font-bold hover:underline" style={{ color: G }}
                                            >
                                                View All <ArrowRight className="size-3" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* About */}
                            <div className="relative" ref={aboutRef}>
                                <button
                                    onClick={() => { setAboutOpen(o => !o); setServicesOpen(false); }}
                                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-[14px] font-medium transition-all"
                                    style={isActive('/about') ? { color: G, fontWeight: 700, background: G_BG } : { color: '#374151' }}
                                    onMouseEnter={e => { if (!isActive('/about')) (e.currentTarget as HTMLButtonElement).style.color = G; }}
                                    onMouseLeave={e => { if (!isActive('/about')) (e.currentTarget as HTMLButtonElement).style.color = '#374151'; }}
                                >
                                    About <ChevronDown className={`size-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {aboutOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-70 rounded-2xl bg-white p-4"
                                        style={{ border: `1px solid #E5E5E5`, boxShadow: '0 20px 60px rgba(0,0,0,0.10)' }}
                                    >
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px]" style={{ color: G }}>About Amias</p>
                                        <div className="space-y-1">
                                            {navAbout.map(({ icon: Icon, label, href, desc }) => (
                                                <Link key={label} href={href} onClick={() => setAboutOpen(false)}
                                                    className="flex items-start gap-3 rounded-xl p-3 transition-colors"
                                                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = G_BG; }}
                                                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                                                >
                                                    <div className="mt-0.5 rounded-lg p-2 shrink-0" style={{ background: G_BG }}>
                                                        <Icon className="size-3.5" style={{ color: G }} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[13px] font-semibold" style={{ color: BLK }}>{label}</p>
                                                        <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>{desc}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact */}
                            <Link href="/contact"
                                className="px-4 py-2 rounded-lg text-[14px] font-medium transition-all"
                                style={isActive('/contact') ? { color: G, fontWeight: 700, background: G_BG } : { color: '#374151' }}
                                onMouseEnter={e => { if (!isActive('/contact')) { const el = e.currentTarget as HTMLAnchorElement; el.style.color = G; } }}
                                onMouseLeave={e => { if (!isActive('/contact')) { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#374151'; } }}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Desktop auth */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            {authUser ? (
                                <Link href={dashboardHref}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:opacity-90 active:scale-95"
                                    style={{ background: `linear-gradient(135deg,${G},${G_D})`, boxShadow: `0 4px 14px ${G_GL}` }}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login"
                                        className="px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                                        style={{ color: '#374151', border: '1.5px solid #E5E5E5' }}
                                        onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = G_BD; el.style.color = G; }}
                                        onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#E5E5E5'; el.style.color = '#374151'; }}
                                    >
                                        Log in
                                    </Link>
                                    <Link href="/quote"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:scale-[1.03] active:scale-95"
                                        style={{ background: `linear-gradient(135deg,${G},${G_D})`, boxShadow: `0 4px 14px ${G_GL}` }}
                                    >
                                        Get a Quote
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-gray-50 active:scale-95"
                            style={{ color: NAVY }} aria-label="Open menu"
                        >
                            <Menu className="size-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ══ MOBILE BACKDROP ══════════════════════════════════ */}
            <div onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
                style={{ backgroundColor: 'rgba(20,33,61,0.70)', backdropFilter: 'blur(4px)', opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none' }}
            />

            {/* ══ MOBILE SIDEBAR ═══════════════════════════════════ */}
            <div className="fixed left-0 top-0 bottom-0 z-50 w-75 flex flex-col lg:hidden"
                style={{ backgroundColor: '#fff', boxShadow: '4px 0 40px rgba(0,0,0,0.18)', transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `2px solid ${G_BG}` }}>
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                        <img src="/logo.png" alt="Amias Technologies" className="h-10 w-auto" />
                    </Link>
                    <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl transition-colors hover:bg-yellow-50" aria-label="Close">
                        <X className="size-5" style={{ color: G }} />
                    </button>
                </div>

                {/* Links */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                    <Link href="/" onClick={closeAll}
                        className="flex items-center px-4 py-3 rounded-xl text-[14px] font-medium transition-colors"
                        style={isActive('/') ? { color: G, fontWeight: 700, background: G_BG } : { color: '#374151' }}
                    >
                        Home
                    </Link>

                    <div className="pt-3 pb-1">
                        <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ color: G }}>Services</p>
                        {navServices.map(({ icon: Icon, label, href }) => (
                            <Link key={label} href={href} onClick={closeAll}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-colors"
                                style={{ color: '#475569' }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = G_BG; el.style.color = G; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = '#475569'; }}
                            >
                                <Icon className="size-4 shrink-0" style={{ color: G, opacity: 0.85 }} />
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 pb-1">
                        <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ color: G }}>About</p>
                        {navAbout.map(({ icon: Icon, label, href }) => (
                            <Link key={label} href={href} onClick={closeAll}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-colors"
                                style={{ color: '#475569' }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = G_BG; el.style.color = G; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = '#475569'; }}
                            >
                                <Icon className="size-4 shrink-0" style={{ color: G, opacity: 0.85 }} />
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-2">
                        <Link href="/contact" onClick={closeAll}
                            className="flex items-center px-4 py-3 rounded-xl text-[14px] font-medium transition-colors"
                            style={isActive('/contact') ? { color: G, fontWeight: 700, background: G_BG } : { color: '#374151' }}
                        >
                            Contact
                        </Link>
                    </div>
                </nav>

                {/* Footer */}
                <div className="px-4 py-4 space-y-2.5" style={{ borderTop: `2px solid ${G_BG}` }}>
                    {authUser ? (
                        <Link href={dashboardHref} onClick={closeAll}
                            className="block px-4 py-3 text-center rounded-xl text-[14px] font-bold text-white"
                            style={{ background: `linear-gradient(135deg,${G},${G_D})`, boxShadow: `0 4px 14px ${G_GL}` }}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" onClick={closeAll}
                                className="block px-4 py-3 text-center rounded-xl text-[14px] font-semibold transition-all"
                                style={{ border: `2px solid ${G_BD}`, color: G }}
                            >
                                Log in
                            </Link>
                            <Link href="/quote" onClick={closeAll}
                                className="block px-4 py-3 text-center rounded-xl text-[14px] font-bold text-white"
                                style={{ background: `linear-gradient(135deg,${G},${G_D})`, boxShadow: `0 4px 14px ${G_GL}` }}
                            >
                                Get a Quote
                            </Link>
                        </>
                    )}
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                        <Mail className="size-3" style={{ color: G }} />
                        <p className="text-[11px]" style={{ color: '#9CA3AF' }}>info@amiastechnologies.com</p>
                    </div>
                </div>
            </div>
        </>
    );
}
