import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[80px] resize-y';

export default function ProjectCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '', client_name: '', client_email: '', client_phone: '',
        description: '', status: 'planning', start_date: '', end_date: '',
        budget: '', currency: 'ZMW', notes: '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post('/admin/projects'); };

    return (
        <AppLayout breadcrumbs={[{ title: 'Projects', href: '/admin/projects' }, { title: 'New Project', href: '#' }]}>
            <Head title="New Project" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">New Project</h1>
                <form onSubmit={submit} className="space-y-5 bg-white rounded-xl border p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1">
                            <Label>Project Title *</Label>
                            <Input value={data.title} onChange={e => setData('title', e.target.value)} />
                            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Client Name *</Label>
                            <Input value={data.client_name} onChange={e => setData('client_name', e.target.value)} />
                            {errors.client_name && <p className="text-xs text-red-500">{errors.client_name}</p>}
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
                            <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" value={data.status} onChange={e => setData('status', e.target.value)}>
                                {['planning','active','completed','on_hold','cancelled'].map(s => (
                                    <option key={s} value={s}>{s.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}</option>
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
                            <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" value={data.currency} onChange={e => setData('currency', e.target.value)}>
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
                        <Button type="submit" disabled={processing}>Create Project</Button>
                        <Link href="/admin/projects"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
