import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/layouts/client-layout';
import { FolderKanban, Receipt, FileText, LifeBuoy, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface Project { id: number; title: string; status: string; start_date: string | null; end_date: string | null; budget: string | null; currency: string; }
interface Invoice { id: number; invoice_number: string; invoice_date: string; due_date: string | null; total: string; currency: string; status: string; }
interface Quotation { id: number; quote_number: string; quote_date: string; total: string; currency: string; status: string; }
interface Ticket { id: number; ticket_number: string; subject: string; status: string; priority: string; created_at: string; }

const statusIcon: Record<string, React.ReactNode> = {
    active:    <CheckCircle2 className='size-3.5 text-green-500' />,
    completed: <CheckCircle2 className='size-3.5 text-blue-500' />,
    planning:  <Clock className='size-3.5 text-yellow-500' />,
    on_hold:   <AlertCircle className='size-3.5 text-orange-500' />,
    cancelled: <AlertCircle className='size-3.5 text-red-500' />,
};
const statusColor: Record<string, string> = {
    active:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    planning:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    on_hold:   'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    cancelled: 'bg-muted text-muted-foreground',
    unpaid:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    partial:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    paid:      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    draft:     'bg-muted text-muted-foreground',
    sent:      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    accepted:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    rejected:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    open:      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    in_progress:'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    resolved:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    closed:    'bg-muted text-muted-foreground',
};
const fmt = (n: string | number, cur = 'ZMW') => `${cur} ${Number(n).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`;

export default function ClientDashboard({ projects, invoices, quotations, tickets }:
    { projects: Project[]; invoices: Invoice[]; quotations: Quotation[]; tickets: Ticket[] }) {

    const activeProjects = projects.filter(p => p.status === 'active').length;
    const unpaidInvoices = invoices.filter(i => i.status === 'unpaid' || i.status === 'partial').length;
    const openTickets    = tickets.filter(t => t.status === 'open' || t.status === 'in_progress').length;

    return (
        <ClientLayout>
            <Head title="My Dashboard — Amias Technologies" />
            <div className="space-y-6 max-w-6xl">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Overview of your projects and account activity.</p>
                </div>
                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { label: 'Total Projects',    value: projects.length,   icon: FolderKanban, color: 'text-blue-500' },
                        { label: 'Active Projects',   value: activeProjects,    icon: CheckCircle2, color: 'text-green-500' },
                        { label: 'Unpaid Invoices',   value: unpaidInvoices,    icon: Receipt,      color: 'text-red-500' },
                        { label: 'Open Tickets',      value: openTickets,       icon: LifeBuoy,     color: 'text-orange-500' },
                    ].map(s => (
                        <div key={s.label} className="rounded-xl border border-border bg-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm text-muted-foreground">{s.label}</p>
                                <s.icon className={`size-4 ${s.color}`} />
                            </div>
                            <p className="text-3xl font-bold text-foreground">{s.value}</p>
                        </div>
                    ))}
                </div>
                {/* Projects */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <h2 className="font-semibold text-foreground">My Projects</h2>
                        <Link href="/client/projects" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="size-3" /></Link>
                    </div>
                    {projects.length === 0 ? (
                        <p className="px-5 py-8 text-sm text-muted-foreground text-center">No projects assigned yet.</p>
                    ) : (
                        <div className="divide-y divide-border">
                            {projects.slice(0,5).map(p => (
                                <Link key={p.id} href={`/client/projects/${p.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {statusIcon[p.status] ?? <Clock className="size-3.5 text-muted-foreground" />}
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{p.title}</p>
                                            <p className="text-xs text-muted-foreground">{p.start_date ? `Started ${p.start_date}` : 'Not started'}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor[p.status] ?? 'bg-muted text-muted-foreground'}`}>{p.status.replace('_',' ')}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Invoices */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                            <h2 className="font-semibold text-foreground">Recent Invoices</h2>
                            <Link href="/client/invoices" className="text-xs text-primary hover:underline">View all</Link>
                        </div>
                        {invoices.length === 0 ? (
                            <p className="px-5 py-8 text-sm text-muted-foreground text-center">No invoices yet.</p>
                        ) : invoices.slice(0,4).map(inv => (
                            <div key={inv.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{inv.invoice_number}</p>
                                    <p className="text-xs text-muted-foreground">{inv.invoice_date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-foreground">{fmt(inv.total, inv.currency)}</p>
                                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColor[inv.status]}`}>{inv.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Support Tickets */}
                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                            <h2 className="font-semibold text-foreground">Support Tickets</h2>
                            <Link href="/client/tickets" className="text-xs text-primary hover:underline">View all</Link>
                        </div>
                        {tickets.length === 0 ? (
                            <p className="px-5 py-8 text-sm text-muted-foreground text-center">No support tickets.</p>
                        ) : tickets.slice(0,4).map(tk => (
                            <div key={tk.id} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{tk.subject}</p>
                                    <p className="text-xs text-muted-foreground">{tk.ticket_number}</p>
                                </div>
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColor[tk.status]}`}>{tk.status.replace('_',' ')}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}