import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';

interface Message {
    id: number; name: string; email: string; phone: string | null;
    subject: string; status: string; created_at: string;
}

const statusColor: Record<string, string> = {
    new:     'bg-blue-100 text-blue-700',
    read:    'bg-gray-100 text-gray-600',
    replied: 'bg-green-100 text-green-700',
};

export default function MessagesIndex({ messages, newCount }: { messages: Message[]; newCount: number }) {
    const { props } = usePage<any>();
    const del = (id: number, name: string) => {
        if (confirm(`Delete message from "${name}"?`)) router.delete(`/admin/contact-messages/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Messages', href: '/admin/contact-messages' }]}>
            <Head title="Contact Messages" />
            <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold">Contact Messages</h1>
                    {newCount > 0 && (
                        <span className="inline-flex rounded-full bg-blue-600 text-white text-xs font-bold px-2 py-0.5">{newCount} new</span>
                    )}
                </div>
                {props.flash?.success && (
                    <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">{props.flash.success}</div>
                )}
                <div className="rounded-xl border bg-white overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3 text-left">From</th>
                                <th className="px-4 py-3 text-left">Subject</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {messages.length === 0 && (
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No messages yet.</td></tr>
                            )}
                            {messages.map(m => (
                                <tr key={m.id} className={`hover:bg-gray-50 ${m.status === 'new' ? 'font-semibold' : ''}`}>
                                    <td className="px-4 py-3">
                                        <div>{m.name}</div>
                                        <div className="text-xs text-gray-400 font-normal">{m.email}</div>
                                    </td>
                                    <td className="px-4 py-3 max-w-[220px] truncate">{m.subject}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[m.status]}`}>{m.status}</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-400">{m.created_at.slice(0, 10)}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Link href={`/admin/contact-messages/${m.id}`}><Button size="sm" variant="outline"><Eye className="size-3.5" /></Button></Link>
                                        <Button size="sm" variant="destructive" onClick={() => del(m.id, m.name)}><Trash2 className="size-3.5" /></Button>
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
