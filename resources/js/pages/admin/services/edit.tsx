import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BreadcrumbItem } from '@/types';

interface Service {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
    number: string;
    features: string[];
    is_active: boolean;
    sort_order: number;
}

const ICONS = [
    'Code', 'MonitorSmartphone', 'Headset', 'Network', 'Shield', 'Cloud', 'Wrench',
    'Globe', 'Layers', 'Cpu', 'RefreshCw', 'Smartphone', 'Server', 'Cable', 'Lock',
    'Wifi', 'Camera', 'Flame', 'GraduationCap', 'AlertTriangle', 'HardDrive',
    'Printer', 'RotateCcw', 'Brush', 'Package', 'Map', 'Database',
];

const taClasses = 'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none';

function toSlug(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function EditService({ service }: { service: Service }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Services',  href: '/admin/services' },
        { title: service.title, href: `/admin/services/${service.id}/edit` },
    ];

    const { data, setData, patch, processing, errors } = useForm({
        title:       service.title,
        slug:        service.slug,
        description: service.description,
        icon:        service.icon,
        number:      service.number,
        features:    service.features ?? [],
        is_active:   service.is_active,
        sort_order:  service.sort_order,
    });

    const [newFeature, setNewFeature] = useState('');

    const handleTitleChange = (value: string) => {
        setData(d => ({ ...d, title: value, slug: toSlug(value) }));
    };

    const addFeature = () => {
        const trimmed = newFeature.trim();
        if (!trimmed) return;
        setData('features', [...data.features, trimmed]);
        setNewFeature('');
    };

    const removeFeature = (i: number) => {
        setData('features', data.features.filter((_, idx) => idx !== i));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/services/${service.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit — ${service.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">

                {/* Page header */}
                <div className="flex items-center gap-4">
                    <Link href="/admin/services">
                        <Button variant="outline" size="sm"><ArrowLeft className="mr-1.5 size-4" /> Back</Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Edit Service</h1>
                        <p className="text-sm text-muted-foreground">Update "{service.title}"</p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl space-y-6">

                    {/* Basic info */}
                    <div className="rounded-lg border border-border bg-card p-6 space-y-5">
                        <h2 className="text-sm font-semibold text-foreground">Basic Information</h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => handleTitleChange(e.target.value)}
                                    placeholder="e.g. Software Development"
                                />
                                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="slug">Slug *</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    placeholder="e.g. software-development"
                                    className="font-mono text-sm"
                                />
                                {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description *</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Short description of this service..."
                                rows={3}
                                className={taClasses}
                            />
                            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-1.5">
                                <Label>Icon *</Label>
                                <Select value={data.icon} onValueChange={v => setData('icon', v)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ICONS.map(icon => (
                                            <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.icon && <p className="text-xs text-destructive">{errors.icon}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="number">Number</Label>
                                <Input
                                    id="number"
                                    value={data.number}
                                    onChange={e => setData('number', e.target.value)}
                                    placeholder="e.g. 01"
                                    maxLength={5}
                                    className="font-mono"
                                />
                                {errors.number && <p className="text-xs text-destructive">{errors.number}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={data.sort_order}
                                    onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                    min={0}
                                    max={999}
                                />
                                {errors.sort_order && <p className="text-xs text-destructive">{errors.sort_order}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-foreground">Features</h2>
                            <span className="text-xs text-muted-foreground">{data.features.length} item{data.features.length !== 1 ? 's' : ''}</span>
                        </div>

                        {data.features.length > 0 && (
                            <ul className="space-y-2">
                                {data.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                                        <span className="flex-1 text-sm text-foreground">{f}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(i)}
                                            className="text-muted-foreground transition-colors hover:text-destructive"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex gap-2">
                            <Input
                                value={newFeature}
                                onChange={e => setNewFeature(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
                                placeholder="Type a feature and press Enter..."
                                className="flex-1"
                            />
                            <Button type="button" variant="outline" onClick={addFeature}>
                                <Plus className="size-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="rounded-lg border border-border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-foreground">Active</p>
                                <p className="text-xs text-muted-foreground">Show this service on the public website</p>
                            </div>
                            <Checkbox
                                checked={data.is_active}
                                onCheckedChange={v => setData('is_active', Boolean(v))}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Link href="/admin/services">
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
