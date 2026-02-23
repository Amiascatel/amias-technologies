import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-y';
const sel = 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm';

interface UserOption { id: number; name: string; email: string; role?: string; }
interface Project {
    id: number; client_id: number | null; employee_id: number | null;
    title: string; client_name: string; client_email: string; client_phone: string;
    description: string; status: string; start_date: string; end_date: string;
    budget: string; currency: string; notes: string;
}

export default function ProjectEdit({ project, clients, employees }: { project: Project; clients: UserOption[]; employees: UserOption[] }) {
    const { data, setData, patch, processing, errors } = useForm({
        client_id: project.client_id ? String(project.client_id) : '',
        employee_id: project.employee_id ? String(project.employee_id) : '',
        title: project.title, client_name: project.client_name,
        client_email: project.client_email ?? '', client_phone: project.client_phone ?? '',
        description: project.description ?? '', status: project.status,
        start_date: project.start_date ?? '', end_date: project.end_date ?? '',
        budget: project.budget ?? '', currency: project.currency, notes: project.notes ?? '',
    });

    const handleClientSelect = (id: string) => {
        setData('client_id', id);
        if (id) {
            const c = clients.find(c => c.id === Number(id));
            if (c) { setData('client_name', c.name); setData('client_email', c.email); }
        }
    };
    const submit = (e: React.FormEvent) => { e.preventDefault(); patch(`/admin/projects/${project.id}`); };
    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/projects' }, { title: 'Edit', href: '#' }]}>
            <Head title="Edit Project" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
                <form onSubmit={submit} className="space-y-5 bg-card rounded-xl border p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 border-b border-border pb-4">
                            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">Assignment</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Assign to Client Account</Label>
                                    <select className={sel} value={data.client_id} onChange={e => handleClientSelect(e.target.value)}>
                                        <option value="">— No account (manual) —</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <Label>Assign to Employee</Label>
                                    <select className={sel} value={data.employee_id} onChange={e => setData('employee_id', e.target.value)}>
                                        <option value="">— Unassigned —</option>
                                        {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.role})</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Project Title *</Label>
                            <Input value={data.title} onChange={e => setData('title', e.target.value)} />
                            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Client Name *</Label>
                            <Input value={data.client_name} onChange={e => setData('client_name', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Client Email</Label>
                            <Input type="email" value={data.client_email} onChange={e => setData('client_email', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Client Phone</Label>
                            <Input value={data.client_phone} onChange={e => setData('client_phone', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Status</Label>
                            <select className={sel} value={data.status} onChange={e => setData('status', e.target.value)}>
                                {['planning','active','completed','on_hold','cancelled'].map(s => (
                                    <option key={s} value={s}>{s.replace('_',' ').replace(/^w/,c=>c.toUpperCase())}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <Label>Start Date</Label>
                            <Input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>End Date</Label>
                            <Input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Budget</Label>
                            <Input type="number" min="0" step="0.01" value={data.budget} onChange={e => setData('budget', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Currency</Label>
                            <select className={sel} value={data.currency} onChange={e => setData('currency', e.target.value)}>
                                {['ZMW','USD','ZAR','EUR','GBP'].map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Description</Label>
                            <textarea className={taClass} value={data.description} onChange={e => setData('description', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label>Internal Notes</Label>
                            <textarea className={taClass} value={data.notes} onChange={e => setData('notes', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={processing}>Update Project</Button>
                        <Link href="/admin/projects"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
