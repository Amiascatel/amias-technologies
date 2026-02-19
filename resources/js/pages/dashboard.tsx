import { Head } from '@inertiajs/react';
import { LayoutGrid, Globe, MessageSquare, Users } from 'lucide-react';
import AppLayout from '@/layouts/admin-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const stats = [
    { title: 'Total Visits', value: '—', icon: Globe, description: 'Website visitors' },
    { title: 'Inquiries', value: '—', icon: MessageSquare, description: 'Contact form submissions' },
    { title: 'Services', value: '7', icon: LayoutGrid, description: 'Active service offerings' },
    { title: 'Clients', value: '—', icon: Users, description: 'Active clients' },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Welcome to the Amias Technologies admin panel.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.title} className="rounded border border-border bg-card p-5">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <stat.icon className="size-4 text-muted-foreground" />
                            </div>
                            <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded border border-border bg-card p-5">
                        <h3 className="mb-3 text-sm font-semibold text-foreground">Recent Inquiries</h3>
                        <p className="text-sm text-muted-foreground">No inquiries yet. Contact form submissions will appear here.</p>
                    </div>
                    <div className="rounded border border-border bg-card p-5">
                        <h3 className="mb-3 text-sm font-semibold text-foreground">Quick Actions</h3>
                        <div className="space-y-2">
                            <a href="/" target="_blank" rel="noopener noreferrer" className="block rounded border border-border p-3 text-sm text-foreground transition-colors hover:bg-muted">
                                View Website
                            </a>
                            <a href="/settings/profile" className="block rounded border border-border p-3 text-sm text-foreground transition-colors hover:bg-muted">
                                Edit Profile
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
