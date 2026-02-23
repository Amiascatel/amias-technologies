import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y';
const sel = 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm';

interface Ticket {
    id: number; ticket_number: string; subject: string; description: string;
    status: string; priority: string; category: string;
    client_name: string; client_email: string; client_phone: string;
    assigned_to: string; resolution: string;
}

export default function TicketEdit({ ticket: t }: { ticket: Ticket }) {
    const { data, setData, patch, processing, errors } = useForm({
        subject: t.subject, description: t.description,
        status: t.status, priority: t.priority, category: t.category,
        client_name: t.client_name, client_email: t.client_email,
        client_phone: t.client_phone ?? '', assigned_to: t.assigned_to ?? '',
        resolution: t.resolution ?? '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); patch(`/admin/support-tickets/${t.id}`); };

    return (
        <AppLayout breadcrumbs={[{ title: 'Support Tickets', href: '/admin/support-tickets' }, { title: 'Edit', href: '#' }]}>
            <Head title={`Edit ${t.ticket_number}`} />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">Edit Ticket — {t.ticket_number}</h1>
                <form onSubmit={submit} className="space-y-5 bg-card rounded-xl border p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><Label>Status</Label>
                            <select className={sel} value={data.status} onChange={e => setData('status', e.target.value)}>
                                {['open','in_progress','resolved','closed'].map(s => <option key={s} value={s}>{s.replace('_',' ').replace(/^\w/,c=>c.toUpperCase())}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1"><Label>Priority</Label>
                            <select className={sel} value={data.priority} onChange={e => setData('priority', e.target.value)}>
                                {['low','medium','high','urgent'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1"><Label>Category</Label>
                            <select className={sel} value={data.category} onChange={e => setData('category', e.target.value)}>
                                {['technical','billing','general','feature_request'].map(s => <option key={s} value={s}>{s.replace('_',' ').replace(/^\w/,c=>c.toUpperCase())}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1"><Label>Assigned To</Label><Input value={data.assigned_to} onChange={e => setData('assigned_to', e.target.value)} /></div>
                        <div className="col-span-2 space-y-1"><Label>Subject *</Label><Input value={data.subject} onChange={e => setData('subject', e.target.value)} />{errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}</div>
                        <div className="space-y-1"><Label>Client Name *</Label><Input value={data.client_name} onChange={e => setData('client_name', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Client Email *</Label><Input type="email" value={data.client_email} onChange={e => setData('client_email', e.target.value)} /></div>
                        <div className="col-span-2 space-y-1"><Label>Description *</Label>
                            <textarea className={taClass} rows={4} value={data.description} onChange={e => setData('description', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1"><Label>Resolution / Notes</Label>
                            <textarea className={taClass} rows={3} value={data.resolution} onChange={e => setData('resolution', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={processing}>Update Ticket</Button>
                        <Link href="/admin/support-tickets"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
