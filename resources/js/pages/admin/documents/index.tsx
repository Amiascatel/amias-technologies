import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Download } from 'lucide-react';

interface Doc {
    id: number; title: string; category: string; file_name: string;
    file_size: number; file_type: string | null; uploaded_by: string | null;
    created_at: string; file_path: string;
}

const catColor: Record<string, string> = {
    invoice:   'bg-blue-100 text-blue-700',
    quotation: 'bg-purple-100 text-purple-700',
    contract:  'bg-green-100 text-green-700',
    report:    'bg-orange-100 text-orange-700',
    proposal:  'bg-yellow-100 text-yellow-700',
    other:     'bg-gray-100 text-gray-600',
};

const fmtSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
};

export default function DocumentsIndex({ documents }: { documents: Doc[] }) {
    const { props } = usePage<any>();
    const del = (id: number, title: string) => {
        if (confirm(`Delete document "${title}"?`)) router.delete(`/admin/documents/${id}`);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Documents', href: '/admin/documents' }]}>
            <Head title="Documents" />
            <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Documents</h1>
                    <Link href="/admin/documents/create"><Button><Plus className="size-4 mr-1" /> Upload Document</Button></Link>
                </div>
                {props.flash?.success && (
                    <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">{props.flash.success}</div>
                )}
                <div className="rounded-xl border bg-white overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">File Name</th>
                                <th className="px-4 py-3 text-left">Size</th>
                                <th className="px-4 py-3 text-left">Uploaded By</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {documents.length === 0 && (
                                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No documents yet.</td></tr>
                            )}
                            {documents.map(doc => (
                                <tr key={doc.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{doc.title}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${catColor[doc.category]}`}>{doc.category}</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px] truncate">{doc.file_name}</td>
                                    <td className="px-4 py-3 text-xs text-gray-500">{fmtSize(doc.file_size)}</td>
                                    <td className="px-4 py-3 text-xs text-gray-500">{doc.uploaded_by ?? '—'}</td>
                                    <td className="px-4 py-3 text-xs text-gray-400">{doc.created_at.slice(0, 10)}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <a href={`/storage/${doc.file_path}`} target="_blank" rel="noreferrer">
                                            <Button size="sm" variant="outline"><Download className="size-3.5" /></Button>
                                        </a>
                                        <Button size="sm" variant="destructive" onClick={() => del(doc.id, doc.title)}><Trash2 className="size-3.5" /></Button>
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
