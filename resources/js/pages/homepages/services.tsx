import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight, Cloud, Code, Lightbulb, Shield, BarChart3, Server, Zap,
    Headset, MonitorSmartphone, Network, Wrench,
    Globe, Layers, Cpu, RefreshCw, Smartphone, Cable, Lock, Wifi, Camera,
    Flame, GraduationCap, AlertTriangle, HardDrive, Printer, RotateCcw, Brush,
    Package, Map, Database, type LucideIcon,
} from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';

// Map icon names (stored in DB) → Lucide component
const iconMap: Record<string, LucideIcon> = {
    Code, Cloud, Lightbulb, Shield, BarChart3, Server, Zap,
    Headset, MonitorSmartphone, Network, Wrench,
    Globe, Layers, Cpu, RefreshCw, Smartphone, Cable, Lock, Wifi, Camera,
    Flame, GraduationCap, AlertTriangle, HardDrive, Printer, RotateCcw, Brush,
    Package, Map, Database,
};

interface Service {
    id: number;
    number: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    features: string[];
}

interface Props {
    services: Service[];
}

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

            {/* HEADER */}
            <section style={{ backgroundColor: '#1e3a8a', backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">Services</span>
                    </div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: 'rgba(255,255,255,0.6)' }}>What We Offer</p>
                    <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-white">Our Services</h1>
                    <p className="mt-4 max-w-2xl text-[15px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                        Comprehensive IT solutions — from software development to cybersecurity — to power your business forward.
                    </p>
                </div>
            </section>

            {/* SERVICES LIST */}
            <section style={{ backgroundColor: '#F7F8FA' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
                    {services.map((svc, i) => {
                        const IconComponent = iconMap[svc.icon] ?? Code;
                        return (
                            <div
                                key={svc.id}
                                id={svc.slug}
                                className="grid items-start gap-10 lg:grid-cols-2 rounded-2xl bg-white p-8 lg:p-10"
                                style={{ border: '1px solid #E5E7EB', boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
                            >
                                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="mb-1 text-[11px] font-bold uppercase tracking-[2px]" style={{ color: '#9CA3AF' }}>{svc.number}</div>
                                    <div className="mb-4 inline-flex rounded-xl p-3" style={{ background: 'rgba(37,99,235,0.08)' }}>
                                        <IconComponent className="size-6 text-primary" />
                                    </div>
                                    <h2 className="text-[22px] font-extrabold tracking-tight" style={{ color: '#111827' }}>{svc.title}</h2>
                                    <p className="mt-3 text-[14px] leading-relaxed" style={{ color: '#4B5563' }}>{svc.description}</p>
                                    <Link
                                        href="/contact"
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:opacity-90"
                                        style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                                    >
                                        Get a Quote <ArrowRight className="size-3.5" />
                                    </Link>
                                </div>
                                <div className={`grid gap-3 sm:grid-cols-2 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    {(svc.features ?? []).map((feature, fi) => (
                                        <div
                                            key={fi}
                                            className="flex gap-3 rounded-xl p-4 transition-colors hover:bg-blue-50"
                                            style={{ border: '1px solid #F3F4F6', backgroundColor: '#FAFAFA' }}
                                        >
                                            <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <p className="text-[13px]" style={{ color: '#374151' }}>{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* TECH STACK */}
            <section style={{ backgroundColor: '#EFF6FF', borderTop: '1px solid #BFDBFE', borderBottom: '1px solid #BFDBFE' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">Our Technology Stack</p>
                        <h2 className="text-[28px] font-extrabold tracking-tight" style={{ color: '#111827' }}>Technologies We Work With</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {techStack.map(stack => (
                            <div
                                key={stack.cat}
                                className="rounded-2xl bg-white p-5 transition-shadow hover:shadow-md"
                                style={{ border: '1px solid #BFDBFE' }}
                            >
                                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-primary">{stack.cat}</h4>
                                <p className="text-[13px]" style={{ color: '#4B5563' }}>{stack.items}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                className="relative overflow-hidden py-16 text-center"
                style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)' }}
            >
                <div className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="relative z-10 mx-auto max-w-xl px-6">
                    <h2 className="text-[26px] font-extrabold text-white">Need a Custom Solution?</h2>
                    <p className="mt-3 text-[15px]" style={{ color: 'rgba(255,255,255,0.78)' }}>
                        Let&apos;s discuss your project requirements.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold transition-all hover:scale-[1.03]"
                        style={{ background: '#fff', color: '#2563EB', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
                    >
                        Get in Touch <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </HomeLayout>
    );
}
