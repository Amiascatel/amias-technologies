import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight, ChevronRight, Cloud, Code, Headset,
    MonitorSmartphone, Network, Shield, Wrench, CheckCircle,
    Zap, Smartphone, Search, Palette, Quote,
} from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';
import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

/* ── Black & Gold Elegance palette ──────────────────────────── */
const G    = '#FCA311';
const G_D  = '#e8940a';
const G_BG = 'rgba(252,163,17,0.10)';
const G_BD = 'rgba(252,163,17,0.28)';
const G_GL = 'rgba(252,163,17,0.40)';
const NAVY = '#14213D';
const NAVYm= '#1a2a4a';
const BLK  = '#000000';

/* ── shared button styles ────────────────────────────────────── */
const btnGold    = { background: `linear-gradient(135deg,${G},${G_D})`, boxShadow: `0 8px 28px ${G_GL}` } as const;
const btnOutline = { background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.22)', backdropFilter: 'blur(4px)' } as const;
const btnDark    = { background: '#fff', border: `2px solid ${G_BD}`, color: G } as const;

/* ── Spinning Globe ─────────────────────────────────────────── */
function HeroGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let phi = 0, width = 0;
        const onResize = () => { if (canvasRef.current) width = canvasRef.current.offsetWidth; };
        window.addEventListener('resize', onResize);
        onResize();
        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2, width: width * 2, height: width * 2,
            phi: 0, theta: 0.25, dark: 1, diffuse: 1.4,
            mapSamples: 20000, mapBrightness: 5,
            baseColor:   [0.08, 0.13, 0.24],
            markerColor: [0.99, 0.64, 0.07],
            glowColor:   [0.99, 0.64, 0.07],
            markers: [
                { location: [-13.1339,  27.8493], size: 0.14 },
                { location: [51.5074,   -0.1278], size: 0.06 },
                { location: [40.7128,  -74.0060], size: 0.06 },
                { location: [25.2048,   55.2708], size: 0.06 },
                { location: [-26.2041,  28.0473], size: 0.07 },
            ],
            onRender(state) { state.phi = phi; phi += 0.0025; state.width = width * 2; state.height = width * 2; },
        });
        return () => { globe.destroy(); window.removeEventListener('resize', onResize); };
    }, []);
    return <canvas ref={canvasRef} className="w-full h-full" style={{ contain: 'layout paint size' }} />;
}

/* ── Animations ─────────────────────────────────────────────── */
const heroAnimations = `
@keyframes heroFadeUp   { from{opacity:0;transform:translateY(36px)}  to{opacity:1;transform:translateY(0)} }
@keyframes heroFadeLeft { from{opacity:0;transform:translateX(60px)}  to{opacity:1;transform:translateX(0)} }
@keyframes heroFloat    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.hero-line1 { animation: heroFadeUp   0.6s ease both 0.10s; }
.hero-line2 { animation: heroFadeUp   0.6s ease both 0.28s; }
.hero-btns  { animation: heroFadeUp   0.6s ease both 0.44s; }
.hero-img   { animation: heroFadeLeft 0.85s cubic-bezier(0.22,1,0.36,1) both 0.20s; }
.hero-float { animation: heroFloat 5s ease-in-out infinite 1.1s; }
`;

/* ── Data ───────────────────────────────────────────────────── */
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

const reasons = [
    { title: 'Client-First Approach',    desc: 'Every solution tailored to your exact business needs and goals.' },
    { title: 'Local Market Expertise',   desc: 'Deep knowledge of the Zambian and SADC business environment.' },
    { title: 'Fast & Reliable Delivery', desc: 'Projects completed on time, every time, without compromise.' },
    { title: 'Transparent Pricing',      desc: 'Premium IT services at competitive and accessible rates.' },
    { title: 'Long-term Partnership',    desc: 'We grow with your business — not just fix problems and leave.' },
    { title: 'Proven Track Record',      desc: 'Successful IT projects delivered across multiple industries.' },
];

export default function Homepage() {
    return (
        <HomeLayout>
            <Head title="Amias Technologies — Smart IT. Real Solutions." />
            <style>{heroAnimations}</style>

            {/* ══ HERO ═══════════════════════════════════════════════ */}
            <section className="relative flex lg:items-center overflow-hidden"
                style={{ minHeight: '100vh', background: `linear-gradient(135deg,${NAVY} 0%,${NAVYm} 55%,#0f1f3d 100%)` }}>
                {/* Grid */}
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(252,163,17,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.06) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(252,163,17,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.03) 1px,transparent 1px)`, backgroundSize: '20px 20px' }} />
                {/* Globe */}
                <div className="pointer-events-none absolute" style={{ width: 'clamp(500px,70vw,900px)', aspectRatio:'1', top:'50%', right:'-10%', transform:'translateY(-50%)', opacity:0.22, maskImage:'radial-gradient(circle,black 40%,transparent 72%)', WebkitMaskImage:'radial-gradient(circle,black 40%,transparent 72%)' }}>
                    <HeroGlobe />
                </div>
                {/* Glows */}
                <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full" style={{ background:'radial-gradient(circle,rgba(252,163,17,0.08) 0%,transparent 65%)' }} />
                <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)`, transform:'translate(30%,30%)' }} />

                <div className="relative z-10 mx-auto max-w-7xl w-full px-6 lg:px-8 pt-24 pb-16">
                    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4 lg:gap-8 xl:gap-12 items-center">
                        {/* LEFT */}
                        <div>
                            <div className="hero-line1 mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: G_BG, border:`1px solid ${G_BD}` }}>
                                <span className="size-1.5 rounded-full animate-pulse" style={{ background: G }} />
                                <span className="text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: G }}>Zambia&apos;s Leading IT Partner</span>
                            </div>
                            <h1 className="hero-line1 font-extrabold leading-[1.06] tracking-tight text-white" style={{ fontSize: 'clamp(42px,5.5vw,72px)' }}>
                                Grow Your<br /><span style={{ color: G }}>Business!</span>
                            </h1>
                            <p className="hero-line2 mt-5 leading-[1.75] max-w-[460px]" style={{ fontSize:'16px', color:'rgba(255,255,255,0.58)' }}>
                                Smart, secure, and scalable IT solutions helping businesses across Zambia thrive in the digital age.
                            </p>
                            <div className="hero-btns mt-9 flex flex-wrap gap-4">
                                <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.03] active:scale-95" style={btnGold}>
                                    Get Started Today <ArrowRight className="size-4" />
                                </Link>
                                <Link href="/services" className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-[15px] font-semibold text-white transition-all hover:bg-white/10" style={btnOutline}>
                                    Explore Services <ChevronRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                        {/* RIGHT */}
                        <div className="hero-img relative flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
                            <img src="/background.png" alt="Amias Technologies" className="hero-float w-full object-contain select-none"
                                style={{ maxWidth:'min(90vw,820px)', filter:`drop-shadow(0 20px 60px ${G_GL}) drop-shadow(0 0 80px rgba(20,33,61,0.5))` }}
                                draggable={false} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ FEATURES STRIP ════════════════════════════════════ */}
            <div style={{ background: BLK, borderTop:`2px solid ${G_BD}`, borderBottom:`1px solid rgba(252,163,17,0.15)` }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
                        {[
                            { icon: Zap,        label: 'Fast Turnaround',  desc: 'Projects delivered on time, every time' },
                            { icon: Smartphone, label: 'Mobile Optimised', desc: 'Fully responsive on every device' },
                            { icon: Search,     label: 'SEO Friendly',     desc: 'Built for search engine visibility' },
                            { icon: Palette,    label: 'Custom Design',    desc: 'Tailored to your brand identity' },
                        ].map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex items-center gap-4 px-6 py-6 first:pl-0 last-of-type:pr-0">
                                <div className="shrink-0 flex items-center justify-center rounded-xl" style={{ width:44, height:44, background:G_BG, border:`1px solid ${G_BD}` }}>
                                    <Icon className="size-5" style={{ color: G }} />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-white">{label}</p>
                                    <p className="text-[11px] mt-0.5" style={{ color:'rgba(255,255,255,0.40)' }}>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ══ SERVICES ══════════════════════════════════════════ */}
            <section className="py-20 lg:py-28" style={{ backgroundColor:'#F5F5F5' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <span className="inline-block mb-3 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G }}>What We Offer</span>
                        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-tight" style={{ color:BLK }}>
                            Comprehensive <span style={{ color:G }}>IT Solutions</span>
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color:'#475569' }}>
                            From development to cybersecurity — everything your business needs to succeed in the digital age.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {services.map(svc => (
                            <div key={svc.title} className="group relative rounded-2xl bg-white border p-6 cursor-pointer transition-all duration-250 hover:-translate-y-1"
                                style={{ borderColor:'#E5E5E5' }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = G; el.style.boxShadow = `0 10px 40px ${G_BG}`; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = '#E5E5E5'; el.style.boxShadow = 'none'; }}
                            >
                                <div className="absolute top-0 left-6 right-6 h-[2px] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background:`linear-gradient(90deg,${G},${G_D})` }} />
                                <div className="mb-4 inline-flex rounded-xl p-3" style={{ background:'#F5F5F5' }}>
                                    <svc.icon className="size-5" style={{ color:G }} />
                                </div>
                                <h3 className="mb-2 text-[14px] font-bold" style={{ color:BLK }}>{svc.title}</h3>
                                <p className="text-[12px] leading-relaxed" style={{ color:'#64748B' }}>{svc.desc}</p>
                                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:G }}>
                                    Learn more <ArrowRight className="size-3" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/services" className="inline-flex items-center gap-2.5 rounded-xl px-8 py-4 text-[14px] font-bold text-white transition-all hover:scale-[1.02]" style={btnGold}>
                            View All Services <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══ ABOUT ═════════════════════════════════════════════ */}
            <section className="py-20 lg:py-28" style={{ backgroundColor:'#ffffff' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio:'4/3' }}>
                                <img src={ABOUT_IMG} alt="Amias Technologies team" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -top-4 -left-4 size-14 rounded-2xl" style={{ background:`linear-gradient(135deg,${G},${G_D})` }} />
                            <div className="absolute -bottom-5 -right-5 rounded-2xl bg-white p-5" style={{ border:`2px solid ${G_BD}`, boxShadow:`0 12px 40px ${G_BG}` }}>
                                <p className="text-[30px] font-extrabold leading-none" style={{ color:G }}>100%</p>
                                <p className="text-[12px] mt-1" style={{ color:'#64748B' }}>Client Satisfaction</p>
                            </div>
                        </div>
                        <div>
                            <span className="inline-block mb-4 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G }}>Who We Are</span>
                            <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight leading-[1.15]" style={{ color:BLK }}>
                                Empowering Zambian<br /><span style={{ color:G }}>Businesses</span> Through Technology
                            </h2>
                            <p className="mt-5 text-[15px] leading-[1.85]" style={{ color:'#475569' }}>
                                Amias Technologies is a modern IT solutions company delivering reliable, secure, and scalable digital services to businesses and individuals across Zambia and beyond.
                            </p>
                            <div className="mt-6 rounded-xl p-5 relative" style={{ background:G_BG, borderLeft:`4px solid ${G}` }}>
                                <Quote className="absolute top-4 right-4 size-8 opacity-20" style={{ color:G }} />
                                <p className="text-[14px] italic leading-[1.8]" style={{ color:'#7c4a00' }}>
                                    "We specialise in software development, cybersecurity, networking, and digital transformation — empowering clients to operate efficiently and confidently."
                                </p>
                            </div>
                            <div className="mt-8 grid grid-cols-3 gap-3">
                                {[{ v:'7+', l:'Services' }, { v:'50+', l:'Clients' }, { v:'24/7', l:'Support' }].map(s => (
                                    <div key={s.l} className="rounded-xl p-4 text-center" style={{ background:'#F5F5F5', border:`1px solid ${G_BD}` }}>
                                        <p className="text-[24px] font-extrabold" style={{ color:G }}>{s.v}</p>
                                        <p className="mt-0.5 text-[11px] font-medium" style={{ color:'#64748B' }}>{s.l}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link href="/about" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold text-white transition-all hover:scale-[1.02]" style={btnGold}>
                                    About Us <ArrowRight className="size-4" />
                                </Link>
                                <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[14px] font-bold transition-all hover:shadow-md" style={btnDark}>
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ WHY US — dark navy ════════════════════════════════ */}
            <section className="py-20 lg:py-28 relative overflow-hidden" style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVYm} 100%)` }}>
                <div className="absolute inset-0" style={{ backgroundImage:`linear-gradient(rgba(252,163,17,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.05) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
                <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)`, transform:'translate(30%,30%)' }} />
                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <span className="inline-block mb-3 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G, border:`1px solid ${G_BD}` }}>Our Advantage</span>
                        <h2 className="text-[30px] sm:text-[38px] font-extrabold tracking-tight text-white">
                            Why Choose <span style={{ color:G }}>Amias Technologies?</span>
                        </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {reasons.map((r, i) => (
                            <div key={i} className="group flex gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = G_BD; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            >
                                <div className="mt-0.5 size-8 shrink-0 rounded-full flex items-center justify-center" style={{ background:G_BG, border:`1px solid ${G_BD}` }}>
                                    <CheckCircle className="size-4" style={{ color:G }} />
                                </div>
                                <div>
                                    <h4 className="text-[14px] font-bold text-white">{r.title}</h4>
                                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color:'rgba(255,255,255,0.50)' }}>{r.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA ═══════════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-24 text-center" style={{ background:'#fff' }}>
                <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)` }} />
                <div className="relative z-10 mx-auto max-w-2xl px-6">
                    <span className="inline-block mb-5 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G }}>Let&apos;s Work Together</span>
                    <h2 className="text-[28px] sm:text-[42px] font-extrabold tracking-tight leading-[1.1]" style={{ color:BLK }}>
                        Ready to <span style={{ color:G }}>Transform</span><br />Your Business?
                    </h2>
                    <p className="mt-5 text-[16px] leading-[1.7]" style={{ color:'#475569' }}>
                        Join 50+ businesses across Zambia powered by Amias Technologies.<br />Let&apos;s build something great together.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-xl px-9 py-4 text-[15px] font-bold text-white transition-all hover:scale-[1.03] active:scale-95" style={btnGold}>
                            Contact Us Today <ArrowRight className="size-4" />
                        </Link>
                        <Link href="/services" className="inline-flex items-center gap-2.5 rounded-xl px-9 py-4 text-[15px] font-bold transition-all hover:shadow-md" style={btnDark}>
                            View Services
                        </Link>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
