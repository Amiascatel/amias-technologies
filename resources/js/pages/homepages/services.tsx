import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight, Cloud, Code, Lightbulb, Shield, BarChart3, Server, Zap,
    Headset, MonitorSmartphone, Network, Wrench,
    Globe, Layers, Cpu, RefreshCw, Smartphone, Cable, Lock, Wifi, Camera,
    Flame, GraduationCap, AlertTriangle, HardDrive, Printer, RotateCcw, Brush,
    Package, Map, Database, CheckCircle, type LucideIcon,
} from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';

/* ── palette ────────────────────────────────────────────────── */
const G    = '#FCA311';
const G_D  = '#e8940a';
const G_BG = 'rgba(252,163,17,0.10)';
const G_BD = 'rgba(252,163,17,0.28)';
const G_GL = 'rgba(252,163,17,0.38)';
const NAVY = '#14213D';
const NAVYm= '#1a2a4a';
const BLK  = '#000000';

const iconMap: Record<string, LucideIcon> = {
    Code, Cloud, Lightbulb, Shield, BarChart3, Server, Zap,
    Headset, MonitorSmartphone, Network, Wrench,
    Globe, Layers, Cpu, RefreshCw, Smartphone, Cable, Lock, Wifi, Camera,
    Flame, GraduationCap, AlertTriangle, HardDrive, Printer, RotateCcw, Brush,
    Package, Map, Database,
};

/* Representative images per service slug (Unsplash) */
const serviceImages: Record<string, string> = {
    'software':     'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'mobile':       'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    'consulting':   'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
    'networking':   'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    'cybersecurity':'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80',
    'cloud':        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'repair':       'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
};

const fallbackImg = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';

interface Service {
    id: number;
    number: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    features: string[];
}

interface Props { services: Service[]; }

const techStack = [
    { cat: 'Frontend',     items: 'React.js, Vue.js, Angular, Flutter' },
    { cat: 'Backend',      items: 'Node.js, Python, PHP, .NET, Java' },
    { cat: 'Mobile',       items: 'Flutter, React Native, Kotlin, Swift' },
    { cat: 'Cloud',        items: 'AWS, Microsoft Azure, Google Cloud' },
    { cat: 'Databases',    items: 'MySQL, PostgreSQL, MongoDB, Firebase' },
    { cat: 'Security',     items: 'Fortinet, Palo Alto, Sophos, Cisco' },
    { cat: 'OS & Servers', items: 'Windows Server, Ubuntu, CentOS, RHEL' },
    { cat: 'Productivity', items: 'Microsoft 365, Google Workspace, Zoho' },
];

export default function Services({ services }: Props) {
    return (
        <HomeLayout>
            <Head title="Our Services — Amias Technologies" />

            {/* ══ HERO HEADER ═══════════════════════════════════════ */}
            <section className="relative overflow-hidden py-20 lg:py-28"
                style={{ background: `linear-gradient(135deg,${NAVY} 0%,${NAVYm} 100%)` }}>
                {/* grid pattern */}
                <div className="absolute inset-0" style={{ backgroundImage:`linear-gradient(rgba(252,163,17,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.06) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
                {/* gold glow */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)` }} />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6 text-[12px]" style={{ color:'rgba(255,255,255,0.45)' }}>
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span style={{ color:G }}>/</span>
                        <span style={{ color:G }}>Services</span>
                    </div>
                    <span className="inline-block mb-4 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G, border:`1px solid ${G_BD}` }}>What We Offer</span>
                    <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.06]">
                        Our <span style={{ color:G }}>Services</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-[16px] leading-[1.75]" style={{ color:'rgba(255,255,255,0.60)' }}>
                        Comprehensive IT solutions — from software development to cybersecurity — to power your business forward.
                    </p>
                    {/* Quick jump links */}
                    <div className="mt-8 flex flex-wrap gap-3">
                        {services.map(svc => (
                            <a key={svc.slug} href={`#${svc.slug}`}
                                className="rounded-full px-4 py-1.5 text-[12px] font-semibold transition-all hover:scale-[1.03]"
                                style={{ background:'rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.70)', border:'1px solid rgba(255,255,255,0.14)' }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = G_BG; el.style.color = G; el.style.borderColor = G_BD; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.70)'; el.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                            >
                                {svc.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ SERVICES LIST ════════════════════════════════════ */}
            <section className="py-16 lg:py-24" style={{ backgroundColor:'#F5F5F5' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
                    {services.map((svc, i) => {
                        const IconComponent = iconMap[svc.icon] ?? Code;
                        const img = serviceImages[svc.slug] ?? fallbackImg;
                        const flip = i % 2 === 1;
                        return (
                            <div key={svc.id} id={svc.slug}
                                className="group grid items-stretch gap-0 lg:grid-cols-2 rounded-2xl bg-white overflow-hidden transition-all duration-300"
                                style={{ border:`1px solid #E5E5E5`, boxShadow:'0 2px 16px rgba(0,0,0,0.05)' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px rgba(252,163,17,0.12)`; (e.currentTarget as HTMLDivElement).style.borderColor = G_BD; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#E5E5E5'; }}
                            >
                                {/* Image */}
                                <div className={`relative overflow-hidden ${flip ? 'lg:order-2' : ''}`} style={{ minHeight: 280 }}>
                                    <img src={img} alt={svc.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                                    {/* Gold overlay badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1" style={{ background:'rgba(20,33,61,0.85)', backdropFilter:'blur(6px)', border:`1px solid ${G_BD}` }}>
                                        <IconComponent className="size-3.5" style={{ color:G }} />
                                        <span className="text-[11px] font-bold text-white">{svc.number}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`p-8 lg:p-10 flex flex-col justify-center ${flip ? 'lg:order-1' : ''}`}>
                                    {/* Icon + title */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="inline-flex rounded-xl p-3 shrink-0" style={{ background:G_BG, border:`1px solid ${G_BD}` }}>
                                            <IconComponent className="size-6" style={{ color:G }} />
                                        </div>
                                        <h2 className="text-[22px] font-extrabold tracking-tight" style={{ color:BLK }}>{svc.title}</h2>
                                    </div>

                                    <p className="text-[14px] leading-relaxed mb-6" style={{ color:'#475569' }}>{svc.description}</p>

                                    {/* Features */}
                                    {(svc.features ?? []).length > 0 && (
                                        <ul className="grid sm:grid-cols-2 gap-2 mb-7">
                                            {(svc.features ?? []).map((f, fi) => (
                                                <li key={fi} className="flex items-start gap-2">
                                                    <CheckCircle className="mt-0.5 size-4 shrink-0" style={{ color:G }} />
                                                    <span className="text-[13px]" style={{ color:'#374151' }}>{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* CTAs */}
                                    <div className="flex flex-wrap gap-3">
                                        <Link href={`/quote?service=${encodeURIComponent(svc.title)}`}
                                            className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-[13px] font-bold text-black transition-all hover:scale-[1.03] active:scale-95"
                                            style={{ background:`linear-gradient(135deg,${G},${G_D})`, boxShadow:`0 4px 14px ${G_GL}` }}
                                        >
                                            Get a Quote <ArrowRight className="size-3.5" />
                                        </Link>
                                        <Link href={`/pricing?tab=${svc.slug}`}
                                            className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-[13px] font-semibold transition-all hover:shadow-md"
                                            style={{ background:'#fff', border:`1.5px solid ${G_BD}`, color:G }}
                                            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = G_BG; }}
                                            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; }}
                                        >
                                            Prices <ArrowRight className="size-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ══ TECH STACK ═══════════════════════════════════════ */}
            <section className="py-16 lg:py-24 relative overflow-hidden"
                style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVYm} 100%)` }}>
                <div className="absolute inset-0" style={{ backgroundImage:`linear-gradient(rgba(252,163,17,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.05) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="inline-block mb-3 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G, border:`1px solid ${G_BD}` }}>Our Technology Stack</span>
                        <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight text-white">
                            Technologies We <span style={{ color:G }}>Work With</span>
                        </h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {techStack.map(stack => (
                            <div key={stack.cat} className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                                style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(252,163,17,0.15)` }}
                                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = G_BD; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(252,163,17,0.15)'; }}
                            >
                                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider" style={{ color:G }}>{stack.cat}</h4>
                                <p className="text-[13px]" style={{ color:'rgba(255,255,255,0.55)' }}>{stack.items}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ CTA ══════════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-20 text-center" style={{ background:'#fff' }}>
                <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)` }} />
                <div className="relative z-10 mx-auto max-w-xl px-6">
                    <span className="inline-block mb-4 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ background:G_BG, color:G }}>Let&apos;s Talk</span>
                    <h2 className="text-[26px] sm:text-[36px] font-extrabold tracking-tight" style={{ color:BLK }}>
                        Need a <span style={{ color:G }}>Custom Solution?</span>
                    </h2>
                    <p className="mt-3 text-[15px] leading-[1.75]" style={{ color:'#475569' }}>
                        Let&apos;s discuss your project requirements and build something great together.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-black transition-all hover:scale-[1.03]"
                            style={{ background:`linear-gradient(135deg,${G},${G_D})`, boxShadow:`0 8px 28px ${G_GL}` }}
                        >
                            Get in Touch <ArrowRight className="size-4" />
                        </Link>
                        <Link href="/quote"
                            className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold transition-all hover:shadow-md"
                            style={{ background:'#fff', border:`2px solid ${G_BD}`, color:G }}
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
