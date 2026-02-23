import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y';
const sel = 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm';

export default function TicketCreate({ nextNumber }: { nextNumber: string }) {
    const { data, setData, post, processing, errors } = useForm({
        ticket_number: nextNumber, subject: '', description: '',
        status: 'open', priority: 'medium', category: 'general',
        client_name: '', client_email: '', client_phone: '',
        assigned_to: '', resolution: '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post('/admin/support-tickets'); };

    return (
        <AppLayout breadcrumbs={[{ title: 'Support Tickets', href: '/admin/support-tickets' }, { title: 'New', href: '#' }]}>
            <Head title="New Ticket" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6">New Support Ticket</h1>
                <form onSubmit={submit} className="space-y-5 bg-card rounded-xl border p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1"><Label>Ticket Number *</Label><Input value={data.ticket_number} onChange={e => setData('ticket_number', e.target.value)} /></div>
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
                        <div className="col-span-2 space-y-1"><Label>Subject *</Label>
                            <Input value={data.subject} onChange={e => setData('subject', e.target.value)} />
                            {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
                        </div>
                        <div className="space-y-1"><Label>Client Name *</Label><Input value={data.client_name} onChange={e => setData('client_name', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Client Email *</Label><Input type="email" value={data.client_email} onChange={e => setData('client_email', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Client Phone</Label><Input value={data.client_phone} onChange={e => setData('client_phone', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Assigned To</Label><Input value={data.assigned_to} onChange={e => setData('assigned_to', e.target.value)} /></div>
                        <div className="col-span-2 space-y-1"><Label>Description *</Label>
                            <textarea className={taClass} rows={4} value={data.description} onChange={e => setData('description', e.target.value)} />
                            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
                        </div>
                        <div className="col-span-2 space-y-1"><Label>Resolution / Notes</Label>
                            <textarea className={taClass} rows={3} value={data.resolution} onChange={e => setData('resolution', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={processing}>Create Ticket</Button>
                        <Link href="/admin/support-tickets"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
