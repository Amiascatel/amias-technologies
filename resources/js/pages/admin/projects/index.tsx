import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Project {
    id: number; title: string; client_name: string; client_email: string | null;
    status: string; start_date: string | null; end_date: string | null;
    budget: string | null; currency: string;
}
interface Props { projects: Project[] }

const statusColor: Record<string, string> = {
    planning:  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    active:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    completed: 'bg-muted text-muted-foreground',
    on_hold:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function ProjectsIndex({ projects }: Props) {
    const { props } = usePage<any>();

    const del = (id: number, title: string) => {
        if (confirm(`Delete project "${title}"?`)) router.delete(`/admin/projects/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/projects' }]}>
            <Head title="Projects" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <Link href="/admin/projects/create">
                        <Button><Plus className="size-4 mr-1" /> New Project</Button>
                    </Link>
                </div>

                {props.flash?.success && (
                    <div className="rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 px-4 py-3 text-green-700 dark:text-green-400 text-sm">{props.flash.success}</div>
                )}

                <div className="rounded-xl border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Client</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Budget</th>
                                <th className="px-4 py-3 text-left">Dates</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {projects.length === 0 && (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground/70">No projects yet.</td></tr>
                            )}
                            {projects.map(p => (
                                <tr key={p.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 text-muted-foreground/70">{p.id}</td>
                                    <td className="px-4 py-3 font-medium">{p.title}</td>
                                    <td className="px-4 py-3">
                                        <div>{p.client_name}</div>
                                        {p.client_email && <div className="text-xs text-muted-foreground/70">{p.client_email}</div>}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[p.status] ?? 'bg-muted text-muted-foreground'}`}>
                                            {p.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{p.budget ? `${p.currency} ${Number(p.budget).toLocaleString()}` : '—'}</td>
                                    <td className="px-4 py-3 text-xs text-muted-foreground">
                                        {p.start_date ?? '—'} → {p.end_date ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link href={`/admin/projects/${p.id}/edit`}>
                                            <Button size="sm" variant="outline"><Pencil className="size-3.5" /></Button>
                                        </Link>
                                        <Button size="sm" variant="destructive" onClick={() => del(p.id, p.title)}>
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
