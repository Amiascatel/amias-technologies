import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

interface Quotation {
    id: number; quote_number: string; quote_date: string; validity_date: string | null;
    client_name: string; client_company: string | null; status: string;
    total: string; currency: string;
}

const statusColor: Record<string, string> = {
    draft:    'bg-gray-100 text-gray-700',
    sent:     'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    expired:  'bg-orange-100 text-orange-700',
};

export default function QuotationsIndex({ quotations }: { quotations: Quotation[] }) {
    const { props } = usePage<any>();
    const del = (id: number, num: string) => {
        if (confirm(`Delete quotation ${num}?`)) router.delete(`/admin/quotations/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Quotations', href: '/admin/quotations' }]}>
            <Head title="Quotations" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Quotations (RFQ)</h1>
                    <Link href="/admin/quotations/create">
                        <Button><Plus className="size-4 mr-1" /> New Quotation</Button>
                    </Link>
                </div>
                {props.flash?.success && (
                    <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">{props.flash.success}</div>
                )}
                <div className="rounded-xl border bg-white overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3 text-left">Quote #</th>
                                <th className="px-4 py-3 text-left">Client</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Valid Until</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-right">Total</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {quotations.length === 0 && (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No quotations yet.</td></tr>
                            )}
                            {quotations.map(q => (
                                <tr key={q.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-mono font-semibold text-blue-600">{q.quote_number}</td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{q.client_name}</div>
                                        {q.client_company && <div className="text-xs text-gray-400">{q.client_company}</div>}
                                    </td>
                                    <td className="px-4 py-3">{q.quote_date}</td>
                                    <td className="px-4 py-3">{q.validity_date ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[q.status]}`}>{q.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold">{q.currency} {Number(q.total).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link href={`/admin/quotations/${q.id}`}><Button size="sm" variant="outline"><Eye className="size-3.5" /></Button></Link>
                                        <Link href={`/admin/quotations/${q.id}/edit`}><Button size="sm" variant="outline"><Pencil className="size-3.5" /></Button></Link>
                                        <Button size="sm" variant="destructive" onClick={() => del(q.id, q.quote_number)}><Trash2 className="size-3.5" /></Button>
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
