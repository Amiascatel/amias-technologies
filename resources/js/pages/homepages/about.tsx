import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight, Globe, GraduationCap, Handshake, Lightbulb,
    Rocket, Settings, Shield, Target, Users, Building, Laptop,
} from 'lucide-react';
import HomeLayout from '@/layouts/home-layout';

const TEAM_IMG = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80';

const values = [
    { icon: Handshake, title: 'Integrity',      desc: 'Honest and transparent service delivery at every step.' },
    { icon: Lightbulb, title: 'Innovation',     desc: 'Modern, creative solutions to meet evolving challenges.' },
    { icon: Settings,  title: 'Reliability',    desc: 'Consistent, high-quality support you can always count on.' },
    { icon: Target,    title: 'Customer Focus', desc: 'Your success is our ultimate measure of achievement.' },
];

const goals = [
    { icon: Globe,         title: 'Regional Expansion',       desc: 'Grow beyond Zambia into Southern and Eastern Africa within 3 years.' },
    { icon: Building,      title: 'Enterprise Clients',       desc: 'Secure partnerships with 50+ enterprises in the next 2 years.' },
    { icon: GraduationCap, title: 'Skills Development',       desc: 'Train 200+ individuals in IT skills annually.' },
    { icon: Shield,        title: 'Cybersecurity Leadership', desc: 'Become the #1 cybersecurity training provider in Zambia.' },
    { icon: Laptop,        title: 'Product Innovation',       desc: 'Launch 3 locally-built SaaS products for African businesses.' },
    { icon: Users,         title: 'Community Impact',         desc: 'Support 30 SMEs annually with subsidised technology solutions.' },
];

const market = [
    { segment: 'SMEs & Startups',     pct: 40 },
    { segment: 'Government & NGOs',   pct: 25 },
    { segment: 'Education Sector',    pct: 20 },
    { segment: 'Healthcare & Clinics',pct: 15 },
];

export default function About() {
    return (
        <HomeLayout>
            <Head title="About Us — Amias Technologies" />

            {/* HEADER */}
            <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-4 text-[12px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">About</span>
                    </div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Who We Are</p>
                    <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] font-extrabold tracking-tight text-white">About Amias Technologies</h1>
                    <p className="mt-4 max-w-2xl text-[15px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.72)' }}>
                        A modern IT solutions company delivering reliable, secure, and scalable digital services.
                    </p>
                </div>
            </section>

            {/* WHO WE ARE */}
            <section style={{ backgroundColor: '#ffffff' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">Our Story</p>
                            <h2 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight" style={{ color: '#111827' }}>
                                Empowering Businesses<br />Through Technology
                            </h2>
                            <p className="mt-5 text-[15px] leading-[1.8]" style={{ color: '#4B5563' }}>
                                Amias Technologies is a modern IT solutions company delivering reliable, secure, and scalable digital services to businesses and individuals across Zambia and beyond.
                            </p>
                            <p className="mt-3 text-[15px] leading-[1.8]" style={{ color: '#4B5563' }}>
                                We specialise in software development, cybersecurity, networking, IT consulting, and digital transformation — empowering clients to operate efficiently, competitively, and confidently.
                            </p>
                            <div className="mt-8 grid grid-cols-3 gap-3">
                                {[{ v: '7+', l: 'Services' }, { v: '100%', l: 'Client Focus' }, { v: '24/7', l: 'Support' }].map(s => (
                                    <div key={s.l} className="rounded-xl p-4 text-center" style={{ background: '#F7F8FA', border: '1px solid #E5E7EB' }}>
                                        <p className="text-[24px] font-extrabold text-primary">{s.v}</p>
                                        <p className="mt-0.5 text-[11px]" style={{ color: '#6B7280' }}>{s.l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Image */}
                            <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: '16/9' }}>
                                <img src={TEAM_IMG} alt="Amias Technologies team" className="w-full h-full object-cover" />
                            </div>
                            {/* Mission */}
                            <div className="rounded-2xl p-6" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                                <div className="flex items-center gap-2 mb-2">
                                    <Rocket className="size-4 text-primary" />
                                    <h3 className="text-[14px] font-bold" style={{ color: '#1e40af' }}>Our Mission</h3>
                                </div>
                                <p className="text-[13px] leading-relaxed italic" style={{ color: '#1e40af' }}>
                                    &quot;To provide smart, secure, and innovative technology solutions that solve real-world business challenges.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section style={{ backgroundColor: '#F7F8FA', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">What We Stand For</p>
                        <h2 className="text-[28px] font-extrabold tracking-tight" style={{ color: '#111827' }}>Core Values</h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map(v => (
                            <div
                                key={v.title}
                                className="rounded-2xl bg-white p-6 text-center transition-shadow hover:shadow-md"
                                style={{ border: '1px solid #E5E7EB' }}
                            >
                                <div className="mx-auto mb-4 inline-flex rounded-2xl p-4" style={{ background: 'rgba(37,99,235,0.08)' }}>
                                    <v.icon className="size-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-[15px] font-bold" style={{ color: '#111827' }}>{v.title}</h3>
                                <p className="text-[12px] leading-relaxed" style={{ color: '#6B7280' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MARKET FOCUS */}
            <section style={{ backgroundColor: '#ffffff' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px] text-primary">Target Market</p>
                            <h2 className="text-[28px] font-extrabold tracking-tight" style={{ color: '#111827' }}>Market Focus</h2>
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                {[
                                    { l: 'HQ Location',    v: 'Lusaka' },
                                    { l: 'Primary Market', v: 'Zambia' },
                                    { l: 'Target Region',  v: 'SADC' },
                                    { l: 'Business Model', v: 'B2B + B2C' },
                                ].map(m => (
                                    <div key={m.l} className="rounded-xl p-4" style={{ background: '#F7F8FA', border: '1px solid #E5E7EB' }}>
                                        <p className="text-[11px]" style={{ color: '#9CA3AF' }}>{m.l}</p>
                                        <p className="mt-0.5 text-[16px] font-extrabold" style={{ color: '#111827' }}>{m.v}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-6 text-[16px] font-bold" style={{ color: '#111827' }}>Market Segments</h3>
                            <div className="space-y-5">
                                {market.map(m => (
                                    <div key={m.segment}>
                                        <div className="mb-2 flex items-center justify-between text-[13px]">
                                            <span className="font-semibold" style={{ color: '#1F2937' }}>{m.segment}</span>
                                            <span className="font-bold text-primary">{m.pct}%</span>
                                        </div>
                                        <div className="h-2.5 overflow-hidden rounded-full" style={{ backgroundColor: '#E5E7EB' }}>
                                            <div
                                                className="h-2.5 rounded-full transition-all"
                                                style={{ width: `${m.pct}%`, background: 'linear-gradient(90deg, #2563EB, #3b82f6)' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GOALS */}
            <section id="history" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 100%)' }} className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-[2.5px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Looking Ahead</p>
                        <h2 className="text-[28px] font-extrabold text-white">Goals & Objectives</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {goals.map(g => (
                            <div
                                key={g.title}
                                className="rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                                style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)' }}
                            >
                                <div className="mb-3 inline-flex rounded-xl p-2.5" style={{ background: 'rgba(255,255,255,0.12)' }}>
                                    <g.icon className="size-5 text-white" style={{ opacity: 0.9 }} />
                                </div>
                                <h4 className="mb-1.5 text-[14px] font-bold text-white">{g.title}</h4>
                                <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>{g.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ backgroundColor: '#F7F8FA', borderTop: '1px solid #E5E7EB' }} className="py-14 text-center">
                <div className="mx-auto max-w-xl px-6">
                    <h2 className="text-[24px] font-extrabold" style={{ color: '#111827' }}>Want to Work With Us?</h2>
                    <p className="mt-2 text-[14px]" style={{ color: '#6B7280' }}>Get in touch and let&apos;s build something great together.</p>
                    <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-[14px] font-bold text-white transition-all hover:opacity-90"
                        style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}
                    >
                        Contact Us <ArrowRight className="size-4" />
                    </Link>
                </div>
            </section>
        </HomeLayout>
    );
}
