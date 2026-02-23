import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

interface Invoice {
    id: number; invoice_number: string; invoice_date: string; due_date: string | null;
    client_name: string; client_company: string | null; status: string;
    total: string; currency: string;
}
interface Props { invoices: Invoice[] }

const statusColor: Record<string, string> = {
    unpaid:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    partial: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    paid:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function InvoicesIndex({ invoices }: Props) {
    const { props } = usePage<any>();
    const del = (id: number, num: string) => {
        if (confirm(`Delete invoice ${num}?`)) router.delete(`/admin/invoices/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Invoices', href: '/admin/invoices' }]}>
            <Head title="Invoices" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Invoices</h1>
                    <Link href="/admin/invoices/create">
                        <Button><Plus className="size-4 mr-1" /> New Invoice</Button>
                    </Link>
                </div>

                {props.flash?.success && (
                    <div className="rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 px-4 py-3 text-green-700 dark:text-green-400 text-sm">{props.flash.success}</div>
                )}

                <div className="rounded-xl border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left">Invoice #</th>
                                <th className="px-4 py-3 text-left">Client</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Due</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-right">Total</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {invoices.length === 0 && (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground/70">No invoices yet.</td></tr>
                            )}
                            {invoices.map(inv => (
                                <tr key={inv.id} className="hover:bg-muted/30">
                                    <td className="px-4 py-3 font-mono font-semibold text-blue-600">{inv.invoice_number}</td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{inv.client_name}</div>
                                        {inv.client_company && <div className="text-xs text-muted-foreground/70">{inv.client_company}</div>}
                                    </td>
                                    <td className="px-4 py-3">{inv.invoice_date}</td>
                                    <td className="px-4 py-3">{inv.due_date ?? '—'}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[inv.status]}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold">
                                        {inv.currency} {Number(inv.total).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link href={`/admin/invoices/${inv.id}`}>
                                            <Button size="sm" variant="outline"><Eye className="size-3.5" /></Button>
                                        </Link>
                                        <Link href={`/admin/invoices/${inv.id}/edit`}>
                                            <Button size="sm" variant="outline"><Pencil className="size-3.5" /></Button>
                                        </Link>
                                        <Button size="sm" variant="destructive" onClick={() => del(inv.id, inv.invoice_number)}>
                                            <Trash2 className="size-3.5" />
                                        </Button>
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
