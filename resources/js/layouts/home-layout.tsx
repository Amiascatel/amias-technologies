import { useEffect, useState, type ReactNode } from 'react';
import HomeNav from '@/components/home-nav';
import HomeFooter from '@/components/home-footer';

/* ============================================================
   LOADING SPLASH
   Shows once per browser session with company name + spinner.
   ============================================================ */
function LoadingSplash() {
    const [visible, setVisible]   = useState(false);
    const [opacity, setOpacity]   = useState(1);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (sessionStorage.getItem('at_splash_shown')) return;

        setVisible(true);

        // Start fade-out at 1.8 s
        const fadeTimer = setTimeout(() => setOpacity(0), 1800);
        // Remove from DOM after fade-out completes (0.6 s)
        const hideTimer = setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem('at_splash_shown', '1');
        }, 2400);

        return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center select-none"
            style={{ backgroundColor: '#14213D', opacity, transition: 'opacity 0.6s ease' }}
        >
            {/* Spinning rings + logo */}
            <div className="relative flex items-center justify-center mb-7">
                <div className="absolute rounded-full" style={{ width: 90, height: 90, border: '1.5px solid rgba(252,163,17,0.18)' }} />
                <div className="absolute rounded-full" style={{ width: 90, height: 90, border: '2px solid transparent', borderTopColor: '#FCA311', borderRightColor: '#e8940a', animation: 'splashSpin 0.9s linear infinite' }} />
                <div className="absolute rounded-full" style={{ width: 72, height: 72, border: '1.5px solid transparent', borderBottomColor: 'rgba(252,163,17,0.5)', animation: 'splashSpin 1.6s linear infinite reverse' }} />
                <img src="/logo.png" alt="Amias Technologies" className="relative z-10 object-contain" style={{ width: 46, height: 46 }} />
            </div>
            <p className="font-bold text-[15px]" style={{ color: '#FCA311', letterSpacing: '6px', textTransform: 'uppercase', animation: 'splashPulse 1.6s ease-in-out infinite' }}>
                amiastech
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[3px]" style={{ color: 'rgba(255,255,255,0.2)' }}>Loading</p>
            <div className="mt-8 overflow-hidden rounded-full" style={{ width: 120, height: 2, backgroundColor: 'rgba(255,255,255,0.07)' }}>
                <div style={{ height: '100%', borderRadius: 9999, background: 'linear-gradient(90deg,#FCA311,#e8940a)', animation: 'splashProgress 1.8s ease-in-out forwards' }} />
            </div>
        </div>
    );
}

/* ============================================================
   HOME LAYOUT
   ============================================================ */
export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <LoadingSplash />
            <HomeNav />
            <main className="flex-1" style={{ animation: 'pageFadeIn 0.4s ease-out both 0.1s' }}>
                {children}
            </main>
            <HomeFooter />
        </div>
    );
}
