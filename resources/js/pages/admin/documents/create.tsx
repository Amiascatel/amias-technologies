import { Head, useForm, Link } from '@inertiajs/react';
import { useRef } from 'react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';

const taClass = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring resize-y';
const sel = 'w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm';

export default function DocumentCreate() {
    const fileRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors } = useForm<{
        title: string; description: string; category: string; file: File | null;
    }>({ title: '', description: '', category: 'other', file: null });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/documents', { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Documents', href: '/admin/documents' }, { title: 'Upload', href: '#' }]}>
            <Head title="Upload Document" />
            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-bold mb-6">Upload Document</h1>
                <form onSubmit={submit} className="space-y-5 bg-white rounded-xl border p-6">
                    <div className="space-y-1"><Label>Title *</Label>
                        <Input value={data.title} onChange={e => setData('title', e.target.value)} />
                        {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                    </div>
                    <div className="space-y-1"><Label>Category</Label>
                        <select className={sel} value={data.category} onChange={e => setData('category', e.target.value)}>
                            {['invoice','quotation','contract','report','proposal','other'].map(c => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1"><Label>Description</Label>
                        <textarea className={taClass} rows={2} value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>File * (max 20 MB)</Label>
                        <div
                            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                            onClick={() => fileRef.current?.click()}
                        >
                            <UploadCloud className="size-10 mx-auto mb-3 text-gray-300" />
                            {data.file
                                ? <p className="text-sm font-medium text-gray-700">{(data.file as File).name}</p>
                                : <><p className="text-sm text-gray-500">Click to select or drop a file</p><p className="text-xs text-gray-400 mt-1">PDF, DOCX, XLSX, PNG, JPG — up to 20 MB</p></>
                            }
                            <input ref={fileRef} type="file" className="hidden" onChange={e => { if (e.target.files?.[0]) setData('file', e.target.files[0]); }} />
                        </div>
                        {errors.file && <p className="text-xs text-red-500">{errors.file}</p>}
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={processing}>Upload</Button>
                        <Link href="/admin/documents"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
