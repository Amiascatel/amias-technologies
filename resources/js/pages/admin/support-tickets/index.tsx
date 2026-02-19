import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

interface Ticket {
    id: number; ticket_number: string; subject: string; client_name: string;
    status: string; priority: string; category: string; created_at: string;
}

const statusColor: Record<string, string> = {
    open:        'bg-red-100 text-red-700',
    in_progress: 'bg-yellow-100 text-yellow-700',
    resolved:    'bg-green-100 text-green-700',
    closed:      'bg-gray-100 text-gray-600',
};
const priorityColor: Record<string, string> = {
    low:    'bg-gray-100 text-gray-500',
    medium: 'bg-blue-100 text-blue-700',
    high:   'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
};

export default function TicketsIndex({ tickets }: { tickets: Ticket[] }) {
    const { props } = usePage<any>();
    const del = (id: number, num: string) => {
        if (confirm(`Delete ticket ${num}?`)) router.delete(`/admin/support-tickets/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Support Tickets', href: '/admin/support-tickets' }]}>
            <Head title="Support Tickets" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Support Tickets</h1>
                    <Link href="/admin/support-tickets/create">
                        <Button><Plus className="size-4 mr-1" /> New Ticket</Button>
                    </Link>
                </div>
                {props.flash?.success && (
                    <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">{props.flash.success}</div>
                )}
                <div className="rounded-xl border bg-white overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3 text-left">Ticket #</th>
                                <th className="px-4 py-3 text-left">Subject</th>
                                <th className="px-4 py-3 text-left">Client</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Priority</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {tickets.length === 0 && (
                                <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No tickets yet.</td></tr>
                            )}
                            {tickets.map(t => (
                                <tr key={t.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-mono text-blue-600 font-semibold">{t.ticket_number}</td>
                                    <td className="px-4 py-3 font-medium max-w-[200px] truncate">{t.subject}</td>
                                    <td className="px-4 py-3">{t.client_name}</td>
                                    <td className="px-4 py-3 capitalize">{t.category.replace('_', ' ')}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${priorityColor[t.priority]}`}>{t.priority}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[t.status]}`}>{t.status.replace('_', ' ')}</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-400">{t.created_at.slice(0, 10)}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link href={`/admin/support-tickets/${t.id}`}><Button size="sm" variant="outline"><Eye className="size-3.5" /></Button></Link>
                                        <Link href={`/admin/support-tickets/${t.id}/edit`}><Button size="sm" variant="outline"><Pencil className="size-3.5" /></Button></Link>
                                        <Button size="sm" variant="destructive" onClick={() => del(t.id, t.ticket_number)}><Trash2 className="size-3.5" /></Button>
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
