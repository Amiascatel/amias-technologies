import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { BreadcrumbItem } from '@/types';

interface User { id: number; name: string; email: string; role: string; phone: string | null; company: string | null; created_at: string; }

const roleBadge: Record<string, string> = {
    admin:    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    employee: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    client:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/admin/users' },
];

export default function UsersIndex({ users }: { users: User[] }) {
    const { props } = usePage<{ flash?: { success?: string } }>();
    const flash = props.flash;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">User Accounts</h1>
                        <p className="text-sm text-muted-foreground">{users.length} user{users.length !== 1 ? 's' : ''} registered</p>
                    </div>
                    <Link href="/admin/users/create">
                        <Button><Plus className="mr-2 size-4" /> Add User</Button>
                    </Link>
                </div>

                {flash?.success && (
                    <div className="rounded-lg bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 px-4 py-3 text-green-700 dark:text-green-400 text-sm">{flash.success}</div>
                )}

                <div className="rounded-xl border bg-card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Company</th>
                                <th className="px-4 py-3 text-left">Phone</th>
                                <th className="px-4 py-3 text-left">Joined</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.length === 0 ? (
                                <tr><td colSpan={7} className="px-4 py-16 text-center text-muted-foreground">No users yet. <Link href="/admin/users/create" className="text-primary underline">Add first user</Link></td></tr>
                            ) : users.map(u => (
                                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${roleBadge[u.role] ?? 'bg-muted text-muted-foreground'}`}>{u.role}</span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{u.company ?? '—'}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{u.phone ?? '—'}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{u.created_at.slice(0,10)}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/users/${u.id}/edit`}><Button variant="outline" size="sm"><Pencil className="size-3.5" /></Button></Link>
                                            <Button variant="destructive" size="sm" onClick={() => { if (confirm(`Delete ${u.name}?`)) router.delete(`/admin/users/${u.id}`, { preserveScroll: true }); }}>
                                                <Trash2 className="size-3.5" />
                                            </Button>
                                        </div>
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
