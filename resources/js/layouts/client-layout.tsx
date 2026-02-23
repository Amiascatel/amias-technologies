import { type ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, FolderKanban, FileText, Receipt, LifeBuoy, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props { children: ReactNode; }

const navItems = [
    { href: '/client/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/client/projects',   icon: FolderKanban,    label: 'My Projects' },
    { href: '/client/invoices',   icon: Receipt,         label: 'Invoices' },
    { href: '/client/quotations', icon: FileText,        label: 'Quotations' },
    { href: '/client/tickets',    icon: LifeBuoy,        label: 'Support Tickets' },
];

export default function ClientLayout({ children }: Props) {
    const { url, props } = usePage<{ auth: { user: { name: string; email: string } } }>();
    const user = props.auth.user;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-border bg-card hidden md:flex flex-col">
                <div className="px-6 py-5 border-b border-border">
                    <Link href="/">
                        <img src="/logo.png" alt="Amias Technologies" className="h-9 w-auto" />
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Client Portal</p>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {navItems.map(item => {
                        const active = url.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                            >
                                <Icon className="size-4 shrink-0" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="px-3 py-4 border-t border-border space-y-0.5">
                    <Link href="/settings/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <Settings className="size-4" /> Settings
                    </Link>
                    <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <LogOut className="size-4" /> Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top bar */}
                <header className="border-b border-border bg-card px-6 py-3 flex items-center justify-between">
                    <div className="md:hidden font-bold text-foreground">Client Portal</div>
                    <div className="flex-1" />
                    <div className="relative">
                        <button onClick={() => setMenuOpen(v => !v)} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                            <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                                {user?.name?.[0]?.toUpperCase() ?? 'U'}
                            </div>
                            <span className="hidden md:block font-medium">{user?.name}</span>
                            <ChevronDown className="size-3.5 text-muted-foreground" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-lg z-50 py-1">
                                <div className="px-3 py-2 border-b border-border">
                                    <p className="text-xs font-semibold text-foreground">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                                </div>
                                <Link href="/settings/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"><Settings className="size-3.5" /> Settings</Link>
                                <Link href="/logout" method="post" as="button" className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"><LogOut className="size-3.5" /> Sign Out</Link>
                            </div>
                        )}
                    </div>
                </header>
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
