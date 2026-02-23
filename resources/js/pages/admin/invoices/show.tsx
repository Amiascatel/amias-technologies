import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Pencil, Printer } from 'lucide-react';

interface LineItem { description: string; qty: number; unit_price: number; vat_percent: number; amount: number; }
interface Invoice {
    id: number; invoice_number: string; invoice_date: string; due_date: string | null;
    contract_ref: string | null; status: string;
    client_name: string; client_company: string | null; client_address: string | null;
    client_phone: string | null; client_email: string | null;
    project_description: string | null; items: LineItem[];
    subtotal: string; discount: string; vat_rate: string; vat_amount: string; total: string; currency: string;
    bank_name: string | null; account_name: string | null; account_number: string | null;
    branch_code: string | null; mobile_money: string | null; notes: string | null;
}

const statusColor: Record<string, string> = {
    unpaid:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    partial: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    paid:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const fmt = (n: string | number, cur = 'ZMW') => `${cur} ${Number(n).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`;

export default function InvoiceShow({ invoice }: { invoice: Invoice }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Invoices', href: '/admin/invoices' }, { title: invoice.invoice_number, href: '#' }]}>
            <Head title={invoice.invoice_number} />
            <div className="p-6 max-w-4xl space-y-4 print:p-0 print:max-w-full">
                {/* Toolbar */}
                <div className="flex gap-3 print:hidden">
                    <Link href={`/admin/invoices/${invoice.id}/edit`}>
                        <Button variant="outline"><Pencil className="size-4 mr-1" /> Edit</Button>
                    </Link>
                    <Button variant="outline" onClick={() => window.print()}><Printer className="size-4 mr-1" /> Print / PDF</Button>
                    <Link href="/admin/invoices"><Button variant="ghost">← Back</Button></Link>
                </div>

                {/* Invoice Document */}
                <div id="invoice-print" className="bg-card print:bg-white rounded-xl border p-8 print:border-0 print:rounded-none space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight" style={{ color: '#2563EB' }}>INVOICE</h1>
                            <p className="text-lg font-semibold mt-1 text-foreground/80">{invoice.invoice_number}</p>
                            {invoice.contract_ref && <p className="text-xs text-muted-foreground/70 mt-0.5">Contract Ref: {invoice.contract_ref}</p>}
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-foreground">Amias Technologies Ltd</p>
                            <p className="text-sm text-muted-foreground">Lusaka, Zambia</p>
                            <p className="text-sm text-muted-foreground">info@amiastechnologies.com</p>
                            <p className="text-sm text-muted-foreground">+260 977 090 786</p>
                        </div>
                    </div>

                    {/* Meta Row */}
                    <div className="grid grid-cols-3 gap-6 border-t border-b py-4">
                        <div><p className="text-xs text-muted-foreground/70 uppercase font-semibold">Invoice Date</p><p className="font-semibold">{invoice.invoice_date}</p></div>
                        <div><p className="text-xs text-muted-foreground/70 uppercase font-semibold">Due Date</p><p className="font-semibold">{invoice.due_date ?? '—'}</p></div>
                        <div>
                            <p className="text-xs text-muted-foreground/70 uppercase font-semibold">Status</p>
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusColor[invoice.status]}`}>{invoice.status}</span>
                        </div>
                    </div>

                    {/* Billed To */}
                    <div>
                        <p className="text-xs text-muted-foreground/70 uppercase font-semibold mb-1">Billed To</p>
                        <p className="font-bold text-foreground">{invoice.client_name}</p>
                        {invoice.client_company && <p className="text-sm text-muted-foreground">{invoice.client_company}</p>}
                        {invoice.client_address && <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.client_address}</p>}
                        {invoice.client_phone && <p className="text-sm text-muted-foreground">{invoice.client_phone}</p>}
                        {invoice.client_email && <p className="text-sm text-muted-foreground">{invoice.client_email}</p>}
                        {invoice.project_description && <p className="text-sm mt-1 text-muted-foreground"><span className="font-semibold">Re:</span> {invoice.project_description}</p>}
                    </div>

                    {/* Line Items */}
                    <table className="w-full text-sm">
                        <thead style={{ backgroundColor: '#2563EB' }}>
                            <tr className="text-white text-xs uppercase">
                                <th className="px-4 py-2 text-left">#</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-right">Qty</th>
                                <th className="px-4 py-2 text-right">Unit Price</th>
                                <th className="px-4 py-2 text-right">VAT %</th>
                                <th className="px-4 py-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {(invoice.items ?? []).map((item, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-muted/30'}>
                                    <td className="px-4 py-2 text-muted-foreground/70">{i + 1}</td>
                                    <td className="px-4 py-2">{item.description}</td>
                                    <td className="px-4 py-2 text-right">{item.qty}</td>
                                    <td className="px-4 py-2 text-right">{fmt(item.unit_price, invoice.currency)}</td>
                                    <td className="px-4 py-2 text-right">{item.vat_percent}%</td>
                                    <td className="px-4 py-2 text-right font-semibold">{fmt(item.amount, invoice.currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end">
                        <div className="w-72 space-y-1 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{fmt(invoice.subtotal, invoice.currency)}</span></div>
                            {Number(invoice.discount) > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span>- {fmt(invoice.discount, invoice.currency)}</span></div>}
                            <div className="flex justify-between"><span className="text-muted-foreground">VAT ({invoice.vat_rate}%)</span><span>{fmt(invoice.vat_amount, invoice.currency)}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2" style={{ color: '#2563EB' }}>
                                <span>Total Due</span><span>{fmt(invoice.total, invoice.currency)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    {(invoice.bank_name || invoice.account_number) && (
                        <div className="rounded-lg p-4 space-y-1 text-sm" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                            <p className="font-bold text-blue-700 mb-2">Payment Details</p>
                            {invoice.bank_name && <p><span className="text-muted-foreground">Bank:</span> {invoice.bank_name}</p>}
                            {invoice.account_name && <p><span className="text-muted-foreground">Account Name:</span> {invoice.account_name}</p>}
                            {invoice.account_number && <p><span className="text-muted-foreground">Account Number:</span> {invoice.account_number}</p>}
                            {invoice.branch_code && <p><span className="text-muted-foreground">Branch / Sort Code:</span> {invoice.branch_code}</p>}
                            {invoice.mobile_money && <p><span className="text-muted-foreground">Mobile Money:</span> {invoice.mobile_money}</p>}
                        </div>
                    )}

                    {/* Notes */}
                    {invoice.notes && (
                        <div className="text-sm text-muted-foreground border-t pt-4">
                            <p className="font-semibold text-foreground/80 mb-1">Notes &amp; Terms</p>
                            <p className="whitespace-pre-line">{invoice.notes}</p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="border-t pt-4 text-xs text-muted-foreground/70 text-center">
                        Thank you for your business — Amias Technologies Ltd
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
