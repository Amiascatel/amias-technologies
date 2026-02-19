import { Link } from '@inertiajs/react';
import {
    LayoutGrid, Package, FolderKanban,
    Receipt, FileSpreadsheet, LifeBuoy, Files, MessageSquare, Globe, Settings,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import { dashboard } from '@/routes';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard',       href: dashboard(),               icon: LayoutGrid },
    { title: 'Services',        href: '/admin/services',         icon: Package },
    { title: 'Projects',        href: '/admin/projects',         icon: FolderKanban },
    { title: 'Invoices',        href: '/admin/invoices',         icon: Receipt },
    { title: 'Quotations',      href: '/admin/quotations',       icon: FileSpreadsheet },
    { title: 'Support Tickets', href: '/admin/support-tickets',  icon: LifeBuoy },
    { title: 'Documents',       href: '/admin/documents',        icon: Files },
    { title: 'Messages',        href: '/admin/contact-messages', icon: MessageSquare },
];

const footerNavItems: NavItem[] = [
    { title: 'Visit Website', href: '/',                  icon: Globe },
    { title: 'Settings',      href: '/settings/profile',  icon: Settings },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
