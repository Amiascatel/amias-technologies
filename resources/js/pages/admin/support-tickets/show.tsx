import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface Ticket {
    id: number; ticket_number: string; subject: string; description: string;
    status: string; priority: string; category: string;
    client_name: string; client_email: string; client_phone: string | null;
    assigned_to: string | null; resolution: string | null;
    created_at: string; resolved_at: string | null;
}

const statusColor: Record<string, string> = { open: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', in_progress: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', closed: 'bg-muted text-muted-foreground' };
const priorityColor: Record<string, string> = { low: 'bg-muted text-muted-foreground', medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400', urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };

export default function TicketShow({ ticket: t }: { ticket: Ticket }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Support Tickets', href: '/admin/support-tickets' }, { title: t.ticket_number, href: '#' }]}>
            <Head title={t.ticket_number} />
            <div className="p-6 max-w-3xl space-y-4">
                <div className="flex gap-3">
                    <Link href={`/admin/support-tickets/${t.id}/edit`}><Button variant="outline"><Pencil className="size-4 mr-1" /> Edit</Button></Link>
                    <Link href="/admin/support-tickets"><Button variant="ghost">← Back</Button></Link>
                </div>

                <div className="bg-card rounded-xl border p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-blue-600 font-mono font-semibold">{t.ticket_number}</p>
                            <h1 className="text-xl font-bold mt-1">{t.subject}</h1>
                        </div>
                        <div className="flex gap-2">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${priorityColor[t.priority]}`}>{t.priority}</span>
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[t.status]}`}>{t.status.replace('_',' ')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                        <div><p className="text-xs text-muted-foreground/70 font-semibold uppercase mb-0.5">Client</p><p>{t.client_name}</p><p className="text-muted-foreground">{t.client_email}</p>{t.client_phone && <p className="text-muted-foreground">{t.client_phone}</p>}</div>
                        <div><p className="text-xs text-muted-foreground/70 font-semibold uppercase mb-0.5">Details</p>
                            <p><span className="text-muted-foreground">Category:</span> {t.category.replace('_',' ')}</p>
                            <p><span className="text-muted-foreground">Assigned:</span> {t.assigned_to ?? '—'}</p>
                            <p><span className="text-muted-foreground">Created:</span> {t.created_at.slice(0,10)}</p>
                            {t.resolved_at && <p><span className="text-muted-foreground">Resolved:</span> {t.resolved_at.slice(0,10)}</p>}
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <p className="text-xs text-muted-foreground/70 font-semibold uppercase mb-2">Description</p>
                        <p className="text-sm whitespace-pre-line text-foreground/80">{t.description}</p>
                    </div>

                    {t.resolution && (
                        <div className="border-t pt-4">
                            <p className="text-xs text-muted-foreground/70 font-semibold uppercase mb-2">Resolution</p>
                            <p className="text-sm whitespace-pre-line text-foreground/80">{t.resolution}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
