import { Head, Link, useForm } from '@inertiajs/react';
import EmployeeLayout from '@/layouts/employee-layout';
import { FolderKanban, CheckCircle2, Clock, AlertCircle, ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Client { id: number; name: string; email: string; phone: string | null; }
interface Project {
    id: number; title: string; status: string; description: string | null;
    start_date: string | null; end_date: string | null; budget: string | null;
    currency: string; notes: string | null; client: Client | null;
}

const statusColor: Record<string, string> = {
    active:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    planning:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    on_hold:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    cancelled: 'bg-muted text-muted-foreground',
};

function ProjectCard({ project: p }: { project: Project }) {
    const { data, setData, patch, processing } = useForm({ status: p.status, notes: p.notes ?? '' });
    const sel = 'rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm';

    return (
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    {p.client && <p className="text-xs text-muted-foreground mt-0.5">Client: {p.client.name}</p>}
                </div>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize whitespace-nowrap ${statusColor[p.status] ?? 'bg-muted text-muted-foreground'}`}>{p.status.replace('_',' ')}</span>
            </div>
            {p.description && <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{p.description}</p>}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {p.start_date && <span className="flex items-center gap-1"><Calendar className="size-3" />{p.start_date}</span>}
                {p.end_date && <span className="flex items-center gap-1">→ {p.end_date}</span>}
            </div>
            <form onSubmit={e => { e.preventDefault(); patch(`/employee/projects/${p.id}`); }} className="flex items-center gap-2 border-t border-border pt-3">
                <select className={sel} value={data.status} onChange={e => setData('status', e.target.value)}>
                    {['planning','active','completed','on_hold','cancelled'].map(s =>
                        <option key={s} value={s}>{s.replace('_',' ').replace(/^w/, c => c.toUpperCase())}</option>
                    )}
                </select>
                <Button type="submit" size="sm" disabled={processing} variant="outline" className="text-xs h-7 px-3">Update Status</Button>
            </form>
        </div>
    );
}

export default function EmployeeDashboard({ projects }: { projects: Project[] }) {
    const active    = projects.filter(p => p.status === 'active').length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const planning  = projects.filter(p => p.status === 'planning').length;

    return (
        <EmployeeLayout>
            <Head title="Employee Dashboard" />
            <div className="space-y-6 max-w-5xl">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
                    <p className="text-sm text-muted-foreground">Projects assigned to you.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Active',    value: active,    color: 'text-green-500', icon: CheckCircle2 },
                        { label: 'Planning',  value: planning,  color: 'text-yellow-500', icon: Clock },
                        { label: 'Completed', value: completed, color: 'text-blue-500', icon: CheckCircle2 },
                    ].map(s => (
                        <div key={s.label} className="rounded-xl border border-border bg-card p-5">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">{s.label}</p>
                                <s.icon className={`size-4 ${s.color}`} />
                            </div>
                            <p className="text-3xl font-bold text-foreground">{s.value}</p>
                        </div>
                    ))}
                </div>

                {projects.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">No projects assigned yet.</div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                )}
            </div>
        </EmployeeLayout>
    );
}