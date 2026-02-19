import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Pencil, Printer } from 'lucide-react';

interface LineItem { description: string; qty: number; unit_price: number; vat_percent: number; amount: number; }
interface Quotation {
    id: number; quote_number: string; quote_date: string; validity_date: string | null; status: string;
    client_name: string; client_company: string | null; client_address: string | null;
    client_phone: string | null; client_email: string | null; project_description: string | null;
    items: LineItem[]; subtotal: string; discount: string; vat_rate: string; vat_amount: string;
    total: string; currency: string; notes: string | null; terms: string | null;
}

const statusColor: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-700', sent: 'bg-blue-100 text-blue-700',
    accepted: 'bg-green-100 text-green-700', rejected: 'bg-red-100 text-red-700', expired: 'bg-orange-100 text-orange-700',
};

const fmt = (n: string | number, cur = 'ZMW') => `${cur} ${Number(n).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`;

export default function QuotationShow({ quotation: q }: { quotation: Quotation }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Quotations', href: '/admin/quotations' }, { title: q.quote_number, href: '#' }]}>
            <Head title={q.quote_number} />
            <div className="p-6 max-w-4xl space-y-4">
                <div className="flex gap-3 print:hidden">
                    <Link href={`/admin/quotations/${q.id}/edit`}><Button variant="outline"><Pencil className="size-4 mr-1" /> Edit</Button></Link>
                    <Button variant="outline" onClick={() => window.print()}><Printer className="size-4 mr-1" /> Print / PDF</Button>
                    <Link href="/admin/quotations"><Button variant="ghost">← Back</Button></Link>
                </div>

                <div className="bg-white rounded-xl border p-8 print:border-0 print:rounded-none space-y-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight" style={{ color: '#2563EB' }}>QUOTATION</h1>
                            <p className="text-lg font-semibold mt-1 text-gray-700">{q.quote_number}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">Amias Technologies Ltd</p>
                            <p className="text-sm text-gray-500">Lusaka, Zambia</p>
                            <p className="text-sm text-gray-500">info@amiastechnologies.com</p>
                            <p className="text-sm text-gray-500">+260 977 090 786</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 border-t border-b py-4">
                        <div><p className="text-xs text-gray-400 uppercase font-semibold">Quote Date</p><p className="font-semibold">{q.quote_date}</p></div>
                        <div><p className="text-xs text-gray-400 uppercase font-semibold">Valid Until</p><p className="font-semibold">{q.validity_date ?? '—'}</p></div>
                        <div><p className="text-xs text-gray-400 uppercase font-semibold">Status</p>
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${statusColor[q.status]}`}>{q.status}</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Prepared For</p>
                        <p className="font-bold text-gray-900">{q.client_name}</p>
                        {q.client_company && <p className="text-sm text-gray-600">{q.client_company}</p>}
                        {q.client_address && <p className="text-sm text-gray-500 whitespace-pre-line">{q.client_address}</p>}
                        {q.client_phone && <p className="text-sm text-gray-500">{q.client_phone}</p>}
                        {q.client_email && <p className="text-sm text-gray-500">{q.client_email}</p>}
                        {q.project_description && <p className="text-sm mt-1 text-gray-600"><span className="font-semibold">Re:</span> {q.project_description}</p>}
                    </div>

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
                        <tbody className="divide-y">
                            {(q.items ?? []).map((item, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-2 text-gray-400">{i + 1}</td>
                                    <td className="px-4 py-2">{item.description}</td>
                                    <td className="px-4 py-2 text-right">{item.qty}</td>
                                    <td className="px-4 py-2 text-right">{fmt(item.unit_price, q.currency)}</td>
                                    <td className="px-4 py-2 text-right">{item.vat_percent}%</td>
                                    <td className="px-4 py-2 text-right font-semibold">{fmt(item.amount, q.currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end">
                        <div className="w-72 space-y-1 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{fmt(q.subtotal, q.currency)}</span></div>
                            {Number(q.discount) > 0 && <div className="flex justify-between"><span className="text-gray-500">Discount</span><span>- {fmt(q.discount, q.currency)}</span></div>}
                            <div className="flex justify-between"><span className="text-gray-500">VAT ({q.vat_rate}%)</span><span>{fmt(q.vat_amount, q.currency)}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2" style={{ color: '#2563EB' }}>
                                <span>Total</span><span>{fmt(q.total, q.currency)}</span>
                            </div>
                        </div>
                    </div>

                    {q.notes && <div className="text-sm text-gray-500 border-t pt-4"><p className="font-semibold text-gray-700 mb-1">Notes</p><p className="whitespace-pre-line">{q.notes}</p></div>}
                    {q.terms && <div className="text-sm text-gray-500 border-t pt-4"><p className="font-semibold text-gray-700 mb-1">Terms &amp; Conditions</p><p className="whitespace-pre-line">{q.terms}</p></div>}

                    <div className="border-t pt-4 text-xs text-gray-400 text-center">Amias Technologies Ltd — Thank you for considering us</div>
                </div>
            </div>
        </AppLayout>
    );
}
