import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Message {
    id: number; name: string; email: string; phone: string | null;
    subject: string; message: string; status: string;
    reply_notes: string | null; created_at: string;
}

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y';
const sel = 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm';

export default function MessageShow({ message: m }: { message: Message }) {
    const { data, setData, patch, processing } = useForm({
        status: m.status, reply_notes: m.reply_notes ?? '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); patch(`/admin/contact-messages/${m.id}`); };

    return (
        <AppLayout breadcrumbs={[{ title: 'Messages', href: '/admin/contact-messages' }, { title: m.subject, href: '#' }]}>
            <Head title={m.subject} />
            <div className="p-6 max-w-3xl space-y-4">
                <Link href="/admin/contact-messages"><Button variant="ghost">← Back</Button></Link>

                <div className="bg-card rounded-xl border p-6 space-y-4">
                    <h1 className="text-xl font-bold">{m.subject}</h1>
                    <div className="grid grid-cols-2 gap-4 text-sm border-b pb-4">
                        <div><p className="text-xs text-muted-foreground/70 uppercase font-semibold mb-0.5">From</p>
                            <p className="font-medium">{m.name}</p>
                            <p className="text-muted-foreground">{m.email}</p>
                            {m.phone && <p className="text-muted-foreground">{m.phone}</p>}
                        </div>
                        <div><p className="text-xs text-muted-foreground/70 uppercase font-semibold mb-0.5">Received</p>
                            <p>{m.created_at.slice(0, 10)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground/70 uppercase font-semibold mb-2">Message</p>
                        <p className="text-sm whitespace-pre-line text-foreground/80 leading-relaxed">{m.message}</p>
                    </div>
                </div>

                <form onSubmit={submit} className="bg-card rounded-xl border p-6 space-y-4">
                    <h2 className="font-semibold">Update Status &amp; Reply Notes</h2>
                    <div className="space-y-1"><Label>Status</Label>
                        <select className={sel} value={data.status} onChange={e => setData('status', e.target.value)}>
                            {['new','read','replied'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1"><Label>Reply Notes (internal)</Label>
                        <textarea className={taClass} rows={4} value={data.reply_notes} onChange={e => setData('reply_notes', e.target.value)} placeholder="Record your reply or notes here…" />
                    </div>
                    <Button type="submit" disabled={processing}>Save</Button>
                </form>
            </div>
        </AppLayout>
    );
}
