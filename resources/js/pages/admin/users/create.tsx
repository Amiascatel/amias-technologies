import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { BreadcrumbItem } from '@/types';

const sel = 'w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/admin/users' },
    { title: 'Create', href: '#' },
];

export default function UserCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
        role: 'client', phone: '', company: '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); post('/admin/users'); };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add User" />
            <div className="p-6 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-foreground">Add User Account</h1>
                <form onSubmit={submit} className="space-y-5 bg-card rounded-xl border p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-1">
                            <Label>Full Name *</Label>
                            <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Email Address *</Label>
                            <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Role *</Label>
                            <select className={sel} value={data.role} onChange={e => setData('role', e.target.value as 'admin'|'employee'|'client')}>
                                <option value="client">Client</option>
                                <option value="employee">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Password *</Label>
                            <Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
                            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label>Confirm Password *</Label>
                            <Input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label>Phone</Label>
                            <Input value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="+260 77X XXX XXX" />
                        </div>
                        <div className="space-y-1">
                            <Label>Company / Organisation</Label>
                            <Input value={data.company} onChange={e => setData('company', e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="submit" disabled={processing}>Create Account</Button>
                        <Link href="/admin/users"><Button type="button" variant="outline">Cancel</Button></Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
