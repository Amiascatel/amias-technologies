import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight, ChevronRight, Cloud, Code, Headset,
    MonitorSmartphone, Network, Shield, Wrench, CheckCircle,
} from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';

const HERO_IMG  = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80';

const services = [
    { icon: Code,              title: 'Software & Web Development',     desc: 'Custom web apps, e-commerce, CMS, ERP and API integrations built for your needs.' },
    { icon: MonitorSmartphone, title: 'Mobile App Development',         desc: 'Native and cross-platform apps for Android and iOS that delight users.' },
    { icon: Headset,           title: 'IT Consulting & Support',        desc: 'Expert guidance, 24/7 help desk, and IT strategy to drive your business.' },
    { icon: Network,           title: 'Networking & Systems',           desc: 'Enterprise-grade LAN/WAN, servers, cabling, CCTV and Wi-Fi solutions.' },
    { icon: Shield,            title: 'Cybersecurity Solutions',        desc: 'Security audits, firewall deployment, data encryption and staff training.' },
    { icon: Cloud,             title: 'Cloud & Digital Transformation', desc: 'Cloud migration to AWS, Azure & Google Cloud, plus SaaS integration.' },
    { icon: Wrench,            title: 'Computer Repair & Maintenance',  desc: 'Fast hardware repair, OS installation, and preventive maintenance.' },
];

const stats = [
    { value: '50+',  label: 'Clients Served' },
    { value: '7+',   label: 'Service Areas' },
    { value: '24/7', label: 'Support Available' },
    { value: '100%', label: 'Client Satisfaction' },
];

const reasons = [
    { title: 'Client-First Approach',   desc: 'Every solution tailored to your exact business needs and goals.' },
    { title: 'Local Market Expertise',  desc: 'Deep knowledge of the Zambian and SADC business environment.' },
    { title: 'Fast & Reliable Delivery',desc: 'Projects completed on time, every time, without compromise.' },
    { title: 'Transparent Pricing',     desc: 'Premium IT services at competitive and accessible rates.' },
    { title: 'Long-term Partnership',   desc: 'We grow with your business — not just fix problems and leave.' },
    { title: 'Proven Track Record',     desc: 'Successful IT projects delivered across multiple industries.' },
];

const trustItems = [
    'Trusted by 50+ Businesses',
    'Based in Lusaka, Zambia',
    'Serving the SADC Region',
    '24/7 Technical Support',
    'ISO-Aligned Practices',
];

export default function Homepage() {
    return (
        <HomeLayout>
            <Head title="Amias Technologies — Smart IT. Real Solutions." />

            {/* ── HERO ─────────────────────────────────────────── */}
            <section
                className="relative flex items-center overflow-hidden"
                style={{ minHeight: '92vh' }}
            >
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${HERO_IMG}')` }}
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(8,10,18,0.97) 0%, rgba(8,10,18,0.84) 55%, rgba(37,99,235,0.22) 100%)' }}
                />

                {/* Content */}
                <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8 py-20">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div
                            className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                            style={{ background: 'rgba(37,99,235,0.18)', border: '1px solid rgba(37,99,235,0.45)' }}
                        >
                            <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: '#93C5FD' }}>
                                Zambia&apos;s Leading IT Partner
                            </span>
                        </div>

                        {/* Heading */}
                        <h1
                            className="font-extrabold leading-[1.06] tracking-tight text-white"
                            style={{ fontSize: 'clamp(38px, 5.5vw, 66px)' }}
                        >
                            Powering Business<br />
                            <span style={{ color: '#60A5FA' }}>Growth Through</span><br />
                            Technology
                        </h1>

                        <p
                            className="mt-6 leading-[1.78] max-w-[560px]"
                            style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)' }}
                        >
                            We deliver smart, secure, and scalable IT solutions — from software development to cybersecurity — helping businesses across Zambia and Africa thrive in the digital age.
                        </p>

                        {/* CTAs */}
                        <div className="mt-9 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[14px] font-bold text-white transition-all hover:scale-[1.03]"
                                style={{
                                    background: 'linear-gradient(135deg, #2563EB, #1d4ed8)',
                                    boxShadow: '0 8px 30px rgba(37,99,235,0.45)',
                                }}
                            >
                                Get Started Today <ArrowRight className="size-4" />
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/20"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                Explore Services <ChevronRight className="size-4" />
                            </Link>
                        </div>

                        {/* Stats row */}
                        <div
                            className="mt-14 flex flex-wrap gap-x-10 gap-y-5 pt-8"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            {stats.map(s => (
                                <div key={s.label}>
                                    <p className="text-[34px] font-extrabold text-white leading-none">{s.value}</p>
                                    <p className="mt-1.5 text-[11px] uppercase tracking-[1.5px]" style={{ color: 'rgba(255,255,255,0.42)' }}>
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    <span className="text-[10px] uppercase tracking-[2px]">Scroll</span>
                    <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
                </div>
            </section>

            {/* ── TRUST BAR ────────────────────────────────────── */}
            <div style={{ backgroundColor: '#EFF6FF', borderBottom: '1px solid #BFDBFE' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-10">
                        {trustItems.map(t => (
                            <div key={t} className="flex items-center gap-2">
                                <CheckCircle className="size-3.5 text-primary shrink-0" />
                                <span className="text-[12px] font-semibold" style={{ color: '#1e40af' }}>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── SERVICES ─────────────────────────────────────── */}
            <section style={{ backgroundColor: '#F7F8FA' }} className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">What We Offer</p>
                        <h2 className="text-[30px] sm:text-[36px] font-extrabold tracking-tight" style={{ color: '#111827' }}>
                            Comprehensive IT Solutions
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color: '#4B5563' }}>
                            From development to cybersecurity — everything your business needs to succeed in the digital age.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {services.map(svc => (
                            <div
                                key={svc.title}
                                className="group relative rounded-2xl bg-white border p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    borderColor: '#E5E7EB',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = '#93C5FD';
                                    el.style.boxShadow = '0 10px 40px rgba(37,99,235,0.12)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLDivElement;
                                    el.style.borderColor = '#E5E7EB';
                                    el.style.boxShadow = 'none';
                                }}
                            >
                                <div
                                    className="mb-4 inline-flex rounded-xl p-3 transition-colors"
                                    style={{ background: 'rgba(37,99,235,0.08)' }}
                                >
                                    <svc.icon className="size-5 text-primary" />
                                </div>
                                <h3 className="mb-2 text-[14px] font-bold" style={{ color: '#111827' }}>{svc.title}</h3>
                                <p className="text-[12px] leading-relaxed" style={{ color: '#6B7280' }}>{svc.desc}</p>
                                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn more <ArrowRight className="size-3" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold transition-all hover:bg-gray-50"
                            style={{ border: '1.5px solid #D1D5DB', color: '#374151', backgroundColor: '#fff' }}
                        >
                            View All Services <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── ABOUT ────────────────────────────────────────── */}
            <section className="py-20 lg:py-28" style={{ backgroundColor: '#ffffff' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        {/* Image */}
                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3' }}>
                                <img
                                    src={ABOUT_IMG}
                                    alt="Amias Technologies team collaborating"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating stat card */}
                            <div
                                className="absolute -bottom-5 -right-5 rounded-2xl bg-white p-5"
                                style={{ border: '1px solid #E5E7EB', boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
                            >
                                <p className="text-[30px] font-extrabold leading-none" style={{ color: '#2563EB' }}>100%</p>
                                <p className="text-[12px] mt-1" style={{ color: '#6B7280' }}>Client Satisfaction</p>
                            </div>
                            {/* Decorative element */}
                            <div
                                className="absolute -top-4 -left-4 size-16 rounded-2xl"
                                style={{ background: 'linear-gradient(135deg, #2563EB, #3b82f6)', opacity: 0.12 }}
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">Who We Are</p>
                            <h2 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight" style={{ color: '#111827' }}>
                                Empowering Zambian<br />Businesses Through Technology
                            </h2>
                            <p className="mt-5 text-[15px] leading-[1.8]" style={{ color: '#4B5563' }}>
                                Amias Technologies is a modern IT solutions company delivering reliable, secure, and scalable digital services to businesses and individuals across Zambia and beyond.
                            </p>
                            <p className="mt-3 text-[15px] leading-[1.8]" style={{ color: '#4B5563' }}>
                                We specialise in software development, cybersecurity, networking, IT consulting, and digital transformation — empowering clients to operate efficiently and confidently.
                            </p>

                            <div className="mt-7 grid grid-cols-3 gap-3">
                                {[{ v: '7+', l: 'Services' }, { v: '50+', l: 'Clients' }, { v: '24/7', l: 'Support' }].map(s => (
                                    <div key={s.l} className="rounded-xl p-4 text-center" style={{ background: '#F7F8FA', border: '1px solid #E5E7EB' }}>
                                        <p className="text-[22px] font-extrabold text-primary">{s.v}</p>
                                        <p className="mt-0.5 text-[11px]" style={{ color: '#6B7280' }}>{s.l}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-white transition-all hover:opacity-90"
                                    style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                                >
                                    About Us <ArrowRight className="size-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold transition-all hover:bg-gray-50"
                                    style={{ border: '1.5px solid #D1D5DB', color: '#374151' }}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY US ───────────────────────────────────────── */}
            <section
                className="py-20 lg:py-28"
                style={{ backgroundColor: '#F0F2F5', borderTop: '1px solid #D1D5DB', borderBottom: '1px solid #D1D5DB' }}
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">Our Advantage</p>
                        <h2 className="text-[30px] sm:text-[36px] font-extrabold tracking-tight" style={{ color: '#111827' }}>
                            Why Choose Amias Technologies?
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {reasons.map((r, i) => (
                            <div
                                key={i}
                                className="flex gap-4 rounded-2xl bg-white p-5 transition-shadow hover:shadow-md"
                                style={{ border: '1px solid #E5E7EB' }}
                            >
                                <div
                                    className="mt-0.5 size-7 shrink-0 rounded-full flex items-center justify-center"
                                    style={{ background: 'rgba(37,99,235,0.1)' }}
                                >
                                    <CheckCircle className="size-3.5 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold" style={{ color: '#111827' }}>{r.title}</h4>
                                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: '#6B7280' }}>{r.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section
                className="relative overflow-hidden py-20 text-center"
                style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #3b82f6 100%)' }}
            >
                <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }} />

                <div className="relative z-10 mx-auto max-w-2xl px-6">
                    <h2 className="text-[28px] sm:text-[38px] font-extrabold tracking-tight text-white">
                        Ready to Transform<br />Your Business?
                    </h2>
                    <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.78)' }}>
                        Join businesses across Zambia powered by Amias Technologies. Let&apos;s build something great together.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-bold transition-all hover:scale-[1.03]"
                            style={{ background: '#fff', color: '#2563EB', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
                        >
                            Contact Us Today <ArrowRight className="size-4" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-[15px] font-bold transition-all hover:bg-white/20"
                            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)' }}
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
