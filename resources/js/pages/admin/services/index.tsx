import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface Service {
    id: number;
    title: string;
    slug: string;
    icon: string;
    number: string;
    description: string;
    features: string[];
    is_active: boolean;
    sort_order: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Services',  href: '/admin/services' },
];

export default function ServicesIndex({ services }: { services: Service[] }) {
    const { props } = usePage<{ flash?: { success?: string } }>();
    const flash = props.flash;

    const handleDelete = (service: Service) => {
        if (!confirm(`Delete "${service.title}"? This cannot be undone.`)) return;
        router.delete(`/admin/services/${service.id}`, { preserveScroll: true });
    };

    const toggleActive = (service: Service) => {
        router.patch(
            `/admin/services/${service.id}`,
            { ...service, is_active: !service.is_active },
            { preserveScroll: true },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Services" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Services</h1>
                        <p className="text-sm text-muted-foreground">
                            {services.length} service{services.length !== 1 ? 's' : ''} configured
                        </p>
                    </div>
                    <Link href="/admin/services/create">
                        <Button>
                            <Plus className="mr-2 size-4" /> Add Service
                        </Button>
                    </Link>
                </div>

                {/* Flash message */}
                {flash?.success && (
                    <div className="rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        {flash.success}
                    </div>
                )}

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-muted/50">
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">#</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slug</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Icon</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Features</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-4 py-16 text-center text-muted-foreground">
                                        No services yet.{' '}
                                        <Link href="/admin/services/create" className="text-primary underline hover:no-underline">
                                            Add your first service
                                        </Link>
                                    </td>
                                </tr>
                            ) : (
                                services.map(service => (
                                    <tr key={service.id} className="transition-colors hover:bg-muted/30">
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-xs font-bold text-muted-foreground">{service.number}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-foreground">{service.title}</p>
                                            <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">{service.description}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">{service.slug}</code>
                                        </td>
                                        <td className="px-4 py-3">
                                            <code className="rounded bg-muted px-1.5 py-0.5 text-xs text-primary">{service.icon}</code>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-muted-foreground">{service.features?.length ?? 0}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs text-muted-foreground">{service.sort_order}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => toggleActive(service)}
                                                className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                                            >
                                                {service.is_active
                                                    ? <ToggleRight className="size-5 text-green-500" />
                                                    : <ToggleLeft className="size-5 text-muted-foreground" />
                                                }
                                                <Badge variant={service.is_active ? 'default' : 'secondary'} className="text-xs">
                                                    {service.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/services/${service.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Pencil className="size-3.5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(service)}
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
