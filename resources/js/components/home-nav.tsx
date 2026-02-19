import { useState, useEffect, useRef, type ElementType } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight,
    Code, MonitorSmartphone, Headset, Network, Shield, Cloud, Wrench,
    Building2, Clock,
} from 'lucide-react';

const navServices: { icon: ElementType; label: string; href: string; desc: string }[] = [
    { icon: Code,              label: 'Software Development',   href: '/services#software',     desc: 'Custom web & enterprise apps' },
    { icon: MonitorSmartphone, label: 'Mobile Apps',            href: '/services#mobile',       desc: 'iOS & Android development' },
    { icon: Headset,           label: 'IT Consulting',          href: '/services#consulting',   desc: 'Strategy & technical support' },
    { icon: Network,           label: 'Networking',             href: '/services#networking',   desc: 'Infrastructure & installation' },
    { icon: Shield,            label: 'Cybersecurity',          href: '/services#cybersecurity',desc: 'Protection & training' },
    { icon: Cloud,             label: 'Cloud & Digital',        href: '/services#cloud',        desc: 'Migration & transformation' },
    { icon: Wrench,            label: 'IT Repair',              href: '/services#repair',       desc: 'Maintenance & support' },
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
    const { url }     = usePage();

    /* ── Scroll shadow ────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* ── Close dropdowns on outside click ─────────────── */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
            if (aboutRef.current    && !aboutRef.current.contains(e.target as Node))    setAboutOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /* ── Close mobile menu on navigation ──────────────── */
    useEffect(() => { setMobileOpen(false); }, [url]);

    /* ── Lock body scroll when sidebar open ───────────── */
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const isActive = (href: string) => href === '/' ? url === '/' : url.startsWith(href);
    const closeAll = () => { setServicesOpen(false); setAboutOpen(false); };

    return (
        <>
            {/* ── TOP INFO BAR ────────────────────────────────── */}
            <div className="hidden lg:block" style={{ backgroundColor: '#1e3a8a' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-9 items-center justify-between">
                        <div className="flex items-center gap-6">
                            <a
                                href="mailto:info@amiastechnologies.com"
                                className="flex items-center gap-1.5 text-[11px] transition-colors"
                                style={{ color: 'rgba(255,255,255,0.72)' }}
                                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.72)')}
                            >
                                <Mail className="size-3" /> info@amiastechnologies.com
                            </a>
                            <a
                                href="tel:+260777272528"
                                className="flex items-center gap-1.5 text-[11px] transition-colors"
                                style={{ color: 'rgba(255,255,255,0.72)' }}
                                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.72)')}
                            >
                                <Phone className="size-3" /> +260 777 272 528
                            </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                            <MapPin className="size-3" /> Lusaka, Zambia
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN NAVBAR ─────────────────────────────────── */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}
                style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #E5E7EB' }}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex h-[68px] items-center justify-between gap-6">

                        {/* Logo */}
                        <Link href="/" className="flex items-center shrink-0 transition-opacity hover:opacity-90">
                            <img src="/logo.png" alt="Amias Technologies" className="h-11 w-auto" />
                        </Link>

                        {/* ── Desktop Nav ────────────────────────── */}
                        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
                            <Link
                                href="/"
                                className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${isActive('/') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                Home
                            </Link>

                            {/* Services dropdown */}
                            <div className="relative" ref={servicesRef}>
                                <button
                                    onClick={() => { setServicesOpen(o => !o); setAboutOpen(false); }}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${isActive('/services') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    Services
                                    <ChevronDown className={`size-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {servicesOpen && (
                                    <div
                                        className="absolute top-full mt-2 w-[520px] rounded-2xl bg-white p-5"
                                        style={{
                                            left: '50%',
                                            border: '1px solid #E5E7EB',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
                                            animation: 'navDropdownCenter 0.18s ease-out both',
                                        }}
                                    >
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px]" style={{ color: '#9CA3AF' }}>Our Services</p>
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {navServices.map(svc => {
                                                const Icon = svc.icon;
                                                return (
                                                    <Link
                                                        key={svc.label}
                                                        href={svc.href}
                                                        onClick={() => setServicesOpen(false)}
                                                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-blue-50"
                                                    >
                                                        <div className="mt-0.5 rounded-lg p-2 shrink-0 transition-colors group-hover:bg-blue-100" style={{ background: 'rgba(37,99,235,0.08)' }}>
                                                            <Icon className="size-3.5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[13px] font-semibold transition-colors group-hover:text-primary" style={{ color: '#1F2937' }}>{svc.label}</p>
                                                            <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>{svc.desc}</p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #F3F4F6' }}>
                                            <p className="text-[12px]" style={{ color: '#9CA3AF' }}>Comprehensive IT solutions for your business</p>
                                            <Link
                                                href="/services"
                                                onClick={() => setServicesOpen(false)}
                                                className="flex items-center gap-1 text-[12px] font-bold text-primary hover:underline"
                                            >
                                                View All <ArrowRight className="size-3" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* About dropdown */}
                            <div className="relative" ref={aboutRef}>
                                <button
                                    onClick={() => { setAboutOpen(o => !o); setServicesOpen(false); }}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${isActive('/about') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                >
                                    About
                                    <ChevronDown className={`size-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {aboutOpen && (
                                    <div
                                        className="absolute right-0 top-full mt-2 w-[280px] rounded-2xl bg-white p-4"
                                        style={{
                                            border: '1px solid #E5E7EB',
                                            boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                                            animation: 'navDropdown 0.18s ease-out both',
                                        }}
                                    >
                                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[2px]" style={{ color: '#9CA3AF' }}>About Amias</p>
                                        <div className="space-y-1">
                                            {navAbout.map(item => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link
                                                        key={item.label}
                                                        href={item.href}
                                                        onClick={() => setAboutOpen(false)}
                                                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-blue-50"
                                                    >
                                                        <div className="mt-0.5 rounded-lg p-2 shrink-0 transition-colors group-hover:bg-blue-100" style={{ background: 'rgba(37,99,235,0.08)' }}>
                                                            <Icon className="size-3.5 text-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[13px] font-semibold transition-colors group-hover:text-primary" style={{ color: '#1F2937' }}>{item.label}</p>
                                                            <p className="text-[11px] mt-0.5" style={{ color: '#9CA3AF' }}>{item.desc}</p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/contact"
                                className={`px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${isActive('/contact') ? 'text-primary font-semibold bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Auth buttons (desktop) */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <Link
                                href="/login"
                                className="px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all hover:bg-gray-50"
                                style={{ color: '#374151', border: '1.5px solid #D1D5DB' }}
                            >
                                Log in
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:opacity-90 active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                            >
                                Get a Quote
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="lg:hidden p-2.5 rounded-xl transition-colors hover:bg-gray-100 active:scale-95"
                            style={{ color: '#374151' }}
                            aria-label="Open menu"
                        >
                            <Menu className="size-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── MOBILE SIDEBAR ──────────────────────────────── */}

            {/* Backdrop */}
            <div
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.52)',
                    backdropFilter: 'blur(4px)',
                    opacity: mobileOpen ? 1 : 0,
                    pointerEvents: mobileOpen ? 'auto' : 'none',
                }}
            />

            {/* Sidebar panel — slides from left */}
            <div
                className="fixed left-0 top-0 bottom-0 z-50 w-[300px] flex flex-col lg:hidden"
                style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '4px 0 40px rgba(0,0,0,0.18)',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                        <img src="/logo.png" alt="Amias Technologies" className="h-10 w-auto" />
                    </Link>
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="size-5 text-gray-600" />
                    </button>
                </div>

                {/* Sidebar nav links */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                    <Link
                        href="/"
                        onClick={closeAll}
                        className={`flex items-center px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${isActive('/') ? 'bg-blue-50 text-primary font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                        Home
                    </Link>

                    {/* Services group */}
                    <div className="pt-3 pb-1">
                        <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] mb-1" style={{ color: '#9CA3AF' }}>Services</p>
                        {navServices.map(svc => {
                            const Icon = svc.icon;
                            return (
                                <Link
                                    key={svc.label}
                                    href={svc.href}
                                    onClick={closeAll}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-colors text-gray-600 hover:bg-blue-50 hover:text-primary"
                                >
                                    <Icon className="size-4 shrink-0 text-primary" style={{ opacity: 0.7 }} />
                                    {svc.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* About group */}
                    <div className="pt-3 pb-1">
                        <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] mb-1" style={{ color: '#9CA3AF' }}>About</p>
                        {navAbout.map(item => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={closeAll}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-colors text-gray-600 hover:bg-blue-50 hover:text-primary"
                                >
                                    <Icon className="size-4 shrink-0 text-primary" style={{ opacity: 0.7 }} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/contact"
                            onClick={closeAll}
                            className={`flex items-center px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${isActive('/contact') ? 'bg-blue-50 text-primary font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            Contact
                        </Link>
                    </div>
                </nav>

                {/* Sidebar footer */}
                <div className="px-4 py-4 space-y-2" style={{ borderTop: '1px solid #F3F4F6' }}>
                    <Link
                        href="/login"
                        onClick={closeAll}
                        className="block px-4 py-3 text-center rounded-xl text-[14px] font-semibold transition-all hover:bg-gray-50"
                        style={{ border: '1.5px solid #D1D5DB', color: '#374151' }}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/contact"
                        onClick={closeAll}
                        className="block px-4 py-3 text-center rounded-xl text-[14px] font-bold text-white transition-all hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                    >
                        Get a Quote
                    </Link>
                    <p className="text-center text-[11px] pt-1" style={{ color: '#9CA3AF' }}>info@amiastechnologies.com</p>
                </div>
            </div>
        </>
    );
}
