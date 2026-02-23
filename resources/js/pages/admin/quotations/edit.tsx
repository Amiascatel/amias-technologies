import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface LineItem { description: string; qty: number; unit_price: number; vat_percent: number; amount: number; }
interface Quotation {
    id: number; quote_number: string; quote_date: string; validity_date: string; status: string;
    client_name: string; client_company: string; client_address: string; client_phone: string;
    client_email: string; project_description: string; items: LineItem[];
    subtotal: number; discount: number; vat_rate: number; vat_amount: number; total: number; currency: string;
    notes: string; terms: string;
}

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y';
const calcItem = (item: LineItem): LineItem => ({ ...item, amount: +(item.qty * item.unit_price).toFixed(2) });

export default function QuotationEdit({ quotation: q }: { quotation: Quotation }) {
    const [items, setItems] = useState<LineItem[]>(q.items ?? []);
    const { data, setData, patch, processing } = useForm({
        quote_number: q.quote_number, quote_date: q.quote_date, validity_date: q.validity_date ?? '',
        status: q.status, client_name: q.client_name, client_company: q.client_company ?? '',
        client_address: q.client_address ?? '', client_phone: q.client_phone ?? '',
        client_email: q.client_email ?? '', project_description: q.project_description ?? '',
        items: q.items ?? [],
        subtotal: +q.subtotal, discount: +q.discount, vat_rate: +q.vat_rate,
        vat_amount: +q.vat_amount, total: +q.total, currency: q.currency,
        notes: q.notes ?? '', terms: q.terms ?? '',
    });

    const recalc = (newItems: LineItem[], discount: number, vatRate: number) => {
        const subtotal = +newItems.reduce((s, i) => s + i.amount, 0).toFixed(2);
        const vatAmount = +((subtotal - discount) * vatRate / 100).toFixed(2);
        setData(d => ({ ...d, items: newItems, subtotal, vat_amount: vatAmount, total: +(subtotal - discount + vatAmount).toFixed(2) }));
        setItems(newItems);
    };

    const updateItem = (i: number, field: keyof LineItem, val: string | number) =>
        recalc(items.map((it, idx) => idx === i ? calcItem({ ...it, [field]: +val || val }) : it), data.discount, data.vat_rate);
    const addItem = () => recalc([...items, { description: '', qty: 1, unit_price: 0, vat_percent: 16, amount: 0 }], data.discount, data.vat_rate);
    const removeItem = (i: number) => recalc(items.filter((_, idx) => idx !== i), data.discount, data.vat_rate);

    const submit = (e: React.FormEvent) => { e.preventDefault(); patch(`/admin/quotations/${q.id}`); };

    return (
        <AppLayout breadcrumbs={[{ title: 'Quotations', href: '/admin/quotations' }, { title: 'Edit', href: '#' }]}>
            <Head title={`Edit ${q.quote_number}`} />
            <div className="p-6 max-w-5xl space-y-6">
                <h1 className="text-2xl font-bold">Edit Quotation — {q.quote_number}</h1>
                <form onSubmit={submit} className="space-y-6">
                    <div className="bg-card rounded-xl border p-6 grid grid-cols-2 gap-4">
                        <h2 className="col-span-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quotation Details</h2>
                        <div className="space-y-1"><Label>Quote Number *</Label><Input value={data.quote_number} onChange={e => setData('quote_number', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Status</Label>
                            <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" value={data.status} onChange={e => setData('status', e.target.value)}>
                                {['draft','sent','accepted','rejected','expired'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1"><Label>Quote Date *</Label><Input type="date" value={data.quote_date} onChange={e => setData('quote_date', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Valid Until</Label><Input type="date" value={data.validity_date} onChange={e => setData('validity_date', e.target.value)} /></div>
                        <div className="col-span-2 space-y-1"><Label>Project / Service</Label><Input value={data.project_description} onChange={e => setData('project_description', e.target.value)} /></div>
                    </div>

                    <div className="bg-card rounded-xl border p-6 grid grid-cols-2 gap-4">
                        <h2 className="col-span-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Client Details</h2>
                        <div className="space-y-1"><Label>Client Name *</Label><Input value={data.client_name} onChange={e => setData('client_name', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Company</Label><Input value={data.client_company} onChange={e => setData('client_company', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Email</Label><Input type="email" value={data.client_email} onChange={e => setData('client_email', e.target.value)} /></div>
                        <div className="space-y-1"><Label>Phone</Label><Input value={data.client_phone} onChange={e => setData('client_phone', e.target.value)} /></div>
                        <div className="col-span-2 space-y-1"><Label>Address</Label><textarea className={taClass} rows={2} value={data.client_address} onChange={e => setData('client_address', e.target.value)} /></div>
                    </div>

                    <div className="bg-card rounded-xl border p-6 space-y-4">
                        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Line Items</h2>
                        <table className="w-full text-sm">
                            <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
                                <tr>
                                    <th className="px-3 py-2 text-left w-[40%]">Description</th>
                                    <th className="px-3 py-2 text-right w-16">Qty</th>
                                    <th className="px-3 py-2 text-right w-28">Unit Price</th>
                                    <th className="px-3 py-2 text-right w-20">VAT %</th>
                                    <th className="px-3 py-2 text-right w-28">Amount</th>
                                    <th className="px-3 py-2 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {items.map((item, i) => (
                                    <tr key={i}>
                                        <td className="px-3 py-2"><Input value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} /></td>
                                        <td className="px-3 py-2"><Input type="number" min="0" className="text-right" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)} /></td>
                                        <td className="px-3 py-2"><Input type="number" min="0" step="0.01" className="text-right" value={item.unit_price} onChange={e => updateItem(i, 'unit_price', e.target.value)} /></td>
                                        <td className="px-3 py-2"><Input type="number" min="0" max="100" className="text-right" value={item.vat_percent} onChange={e => updateItem(i, 'vat_percent', e.target.value)} /></td>
                                        <td className="px-3 py-2 text-right font-semibold">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        <td className="px-3 py-2 text-center">{items.length > 1 && <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600"><Trash2 className="size-4" /></button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Button type="button" variant="outline" size="sm" onClick={addItem}><Plus className="size-3.5 mr-1" /> Add Line</Button>
                        <div className="ml-auto max-w-xs space-y-2 pt-4 border-t text-sm">
                            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{data.currency} {data.subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between items-center gap-2"><span>Discount</span><Input type="number" min="0" step="0.01" className="w-28 text-right" value={data.discount} onChange={e => { const disc=+e.target.value||0; const vat=+((data.subtotal-disc)*data.vat_rate/100).toFixed(2); setData(d=>({...d,discount:disc,vat_amount:vat,total:+(data.subtotal-disc+vat).toFixed(2)})); }} /></div>
                            <div className="flex justify-between items-center gap-2"><span>VAT (%)</span><Input type="number" min="0" max="100" className="w-28 text-right" value={data.vat_rate} onChange={e => { const rate=+e.target.value||0; const vat=+((data.subtotal-data.discount)*rate/100).toFixed(2); setData(d=>({...d,vat_rate:rate,vat_amount:vat,total:+(data.subtotal-data.discount+vat).toFixed(2)})); }} /></div>
                            <div className="flex justify-between"><span>VAT Amount</span><span>{data.currency} {data.vat_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span>{data.currency} {data.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></div>
                        </div>
                    </div>

                    <div className="bg-card rounded-xl border p-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1"><Label>Notes</Label><textarea className={taClass} rows={2} value={data.notes} onChange={e => setData('notes', e.target.value)} /></div>
                        <div className="col-span-2 space-y-1"><Label>Terms &amp; Conditions</Label><textarea className={taClass} rows={3} value={data.terms} onChange={e => setData('terms', e.target.value)} /></div>
                    </div>

                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing}>Update Quotation</Button>
                        <Link href="/admin/quotations"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
