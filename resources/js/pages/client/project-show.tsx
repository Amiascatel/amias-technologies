import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import { ArrowLeft, Calendar, DollarSign, User } from 'lucide-react';

interface Employee { id: number; name: string; email: string; phone: string | null; }
interface Project {
    id: number; title: string; status: string; description: string | null;
    start_date: string | null; end_date: string | null; budget: string | null; currency: string;
    client_name: string; notes: string | null; employee: Employee | null;
}

const statusColor: Record<string, string> = {
    active:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    planning:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    on_hold:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    cancelled: 'bg-muted text-muted-foreground',
};

export default function ClientProjectShow({ project: p }: { project: Project }) {
    return (
        <ClientLayout>
            <Head title={p.title} />
            <div className="max-w-3xl space-y-4">
                <Link href="/client/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="size-4" /> Back to Projects
                </Link>

                <div className="rounded-xl border border-border bg-card p-6 space-y-5">
                    <div className="flex items-start justify-between">
                        <h1 className="text-xl font-bold text-foreground">{p.title}</h1>
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[p.status] ?? 'bg-muted text-muted-foreground'}`}>{p.status.replace('_',' ')}</span>
                    </div>

                    {p.description && <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>}

                    <div className="grid grid-cols-2 gap-4 text-sm border-t border-border pt-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground/70 uppercase font-semibold">Start Date</p>
                                <p className="text-foreground">{p.start_date ?? '—'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground/70 uppercase font-semibold">End Date</p>
                                <p className="text-foreground">{p.end_date ?? '—'}</p>
                            </div>
                        </div>
                        {p.budget && (
                            <div className="flex items-center gap-2">
                                <DollarSign className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground/70 uppercase font-semibold">Budget</p>
                                    <p className="text-foreground">{p.currency} {Number(p.budget).toLocaleString()}</p>
                                </div>
                            </div>
                        )}
                        {p.employee && (
                            <div className="flex items-center gap-2">
                                <User className="size-4 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground/70 uppercase font-semibold">Project Manager</p>
                                    <p className="text-foreground">{p.employee.name}</p>
                                    <p className="text-xs text-muted-foreground">{p.employee.email}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {p.notes && (
                        <div className="border-t border-border pt-4">
                            <p className="text-xs text-muted-foreground/70 uppercase font-semibold mb-2">Notes</p>
                            <p className="text-sm text-foreground/80 whitespace-pre-line">{p.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}