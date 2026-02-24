import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, type ElementType } from 'react';
import HomeLayout from '@/layouts/home-layout';
import {
    ArrowRight, CheckCircle,
    Globe, Code, MonitorSmartphone, Headset, Network, Shield, Cloud, Wrench,
} from 'lucide-react';

/* ── palette ─────────────────────────────────────────────── */
const G    = '#FCA311';
const G_D  = '#e8940a';
const G_BG = 'rgba(252,163,17,0.10)';
const G_BD = 'rgba(252,163,17,0.28)';
const G_GL = 'rgba(252,163,17,0.38)';
const NAVY = '#14213D';
const NAVYm= '#1a2a4a';
const BLK  = '#000000';

/* ── types ───────────────────────────────────────────────── */
interface Package {
    name: string;
    price: string;
    period: string;
    highlight?: boolean;
    badge?: string;
    features: string[];
}
interface SubCategory {
    slug: string;
    label: string;
    intro: string;
    packages: Package[];
}
interface Category {
    slug: string;
    label: string;
    icon: ElementType;
    subCategories: SubCategory[];
}

/* ══════════════════════════════════════════════════════════
   PRICING DATA
══════════════════════════════════════════════════════════ */
const pricingData: Category[] = [
    /* ── WEB DEVELOPMENT ─────────────────────────────────── */
    {
        slug: 'web',
        label: 'Web Development',
        icon: Globe,
        subCategories: [
            {
                slug: 'cms',
                label: 'CMS Websites',
                intro: 'Content-managed websites your team can update without any technical knowledge.',
                packages: [
                    { name: 'Starter CMS',  price: 'K 5,000',  period: 'once-off', features: ['WordPress / Joomla CMS', 'Up to 8 pages', 'Mobile responsive', 'Basic SEO setup', 'Contact form', '1 month support'] },
                    { name: 'Business CMS', price: 'K 10,000', period: 'once-off', highlight: true, badge: 'Most Popular', features: ['Premium CMS theme', 'Up to 20 pages', 'Blog / news module', 'Advanced SEO', 'Social media integration', 'Analytics setup', '3 months support'] },
                    { name: 'Premium CMS',  price: 'K 18,000', period: 'once-off', features: ['Custom CMS design', 'Unlimited pages', 'Multi-language support', 'E-commerce ready', 'Advanced analytics', 'API integrations', '6 months support'] },
                ],
            },
            {
                slug: 'custom-web',
                label: 'Custom Web Design',
                intro: 'Bespoke websites designed and built from scratch to match your brand and goals.',
                packages: [
                    { name: 'Basic Custom',    price: 'K 15,000', period: 'once-off', features: ['Unique UI/UX design', 'Up to 15 pages', 'Custom animations', 'CMS integration', 'SEO optimised', '3 months support'] },
                    { name: 'Advanced Custom', price: 'K 25,000', period: 'once-off', highlight: true, badge: 'Recommended', features: ['UX research & wireframes', 'Up to 30 pages', 'Interactive elements', 'Admin dashboard', 'API integrations', 'Performance optimisation', '6 months support'] },
                    { name: 'Premium Custom',  price: 'K 40,000+', period: 'project', features: ['Design system creation', 'Unlimited pages', 'Complex animations', 'Multi-role CMS', 'Third-party integrations', 'Load testing', '12 months support'] },
                ],
            },
            {
                slug: 'ecommerce',
                label: 'E-commerce',
                intro: 'Full-featured online stores with secure payments and inventory management.',
                packages: [
                    { name: 'Shop Starter',    price: 'K 12,000', period: 'once-off', features: ['WooCommerce / Shopify', 'Up to 50 products', 'Mobile checkout', 'Basic payment gateway', 'Order management', '1 month support'] },
                    { name: 'Shop Pro',        price: 'K 22,000', period: 'once-off', highlight: true, badge: 'Best Value', features: ['Custom store design', 'Unlimited products', 'Multiple payment gateways', 'Inventory management', 'Discount & coupon system', 'Analytics & reports', '3 months support'] },
                    { name: 'Enterprise Store', price: 'K 35,000+', period: 'project', features: ['Custom e-commerce platform', 'Multi-vendor support', 'ERP integration', 'Advanced analytics', 'Customer loyalty system', 'Performance & CDN', '6 months support'] },
                ],
            },
            {
                slug: 'landing',
                label: 'Landing Pages',
                intro: 'High-converting single-page sites designed to capture leads and drive action.',
                packages: [
                    { name: 'Basic Landing',    price: 'K 2,500', period: 'once-off', features: ['Single page design', 'Lead capture form', 'Mobile responsive', 'Basic SEO', '2 weeks support'] },
                    { name: 'Pro Landing',       price: 'K 5,000', period: 'once-off', highlight: true, badge: 'Popular', features: ['Custom design', 'A/B testing ready', 'Animated sections', 'CRM integration', 'Analytics tracking', '1 month support'] },
                    { name: 'Campaign Package', price: 'K 8,000', period: 'once-off', features: ['3 landing page variants', 'A/B testing setup', 'Email automation', 'Ad pixel integration', 'Conversion reporting', '2 months support'] },
                ],
            },
        ],
    },

    /* ── SOFTWARE DEVELOPMENT ────────────────────────────── */
    {
        slug: 'software',
        label: 'Software Development',
        icon: Code,
        subCategories: [
            {
                slug: 'business-systems',
                label: 'Business Systems',
                intro: 'Custom software built around your specific business processes and workflows.',
                packages: [
                    { name: 'Small Business',  price: 'K 20,000', period: 'once-off', features: ['Custom business logic', 'Up to 5 user roles', 'Database design', 'Reports & dashboards', 'Staff training', '3 months support'] },
                    { name: 'Mid-size',         price: 'K 35,000', period: 'once-off', highlight: true, badge: 'Most Popular', features: ['Complex workflows', 'Unlimited user roles', 'Advanced reporting', 'API integrations', 'Mobile companion app', 'Data migration', '6 months support'] },
                    { name: 'Large Business',  price: 'K 60,000+', period: 'project', features: ['Multi-branch support', 'Advanced automation', 'Custom integrations', 'Audit trails', 'SLA monitoring', 'Dedicated PM', '12 months support'] },
                ],
            },
            {
                slug: 'enterprise',
                label: 'Enterprise Software',
                intro: 'Full-scale ERP and enterprise solutions to streamline operations across your organisation.',
                packages: [
                    { name: 'ERP Starter',    price: 'K 50,000',  period: 'project', features: ['Core ERP modules', 'Up to 3 departments', 'Role-based access', 'Custom reports', 'Staff training', '6 months support'] },
                    { name: 'ERP Enterprise', price: 'K 100,000+', period: 'project', highlight: true, badge: 'Enterprise', features: ['Full ERP suite', 'Unlimited departments', 'Workflow automation', 'Advanced BI & analytics', 'Third-party integrations', 'Dedicated support team', '12 months support'] },
                    { name: 'Custom Build',   price: 'Custom',     period: 'quote',   features: ['Bespoke architecture', 'Multi-country / currency', 'Legacy system integration', 'Cloud-native deployment', 'SLA-backed support', 'Full IP ownership'] },
                ],
            },
            {
                slug: 'api',
                label: 'API Development',
                intro: 'Robust RESTful and GraphQL APIs to connect platforms and enable integrations.',
                packages: [
                    { name: 'Basic API',    price: 'K 8,000',  period: 'once-off', features: ['RESTful API design', 'Up to 20 endpoints', 'JWT authentication', 'API documentation', 'Rate limiting', '1 month support'] },
                    { name: 'Standard API', price: 'K 15,000', period: 'once-off', highlight: true, badge: 'Recommended', features: ['REST + GraphQL', 'Unlimited endpoints', 'OAuth 2.0', 'Webhook support', 'Auto-generated docs', 'Caching & rate limiting', '3 months support'] },
                    { name: 'Enterprise API', price: 'K 25,000+', period: 'project', features: ['Microservices architecture', 'API gateway setup', 'Third-party integrations', 'Real-time (WebSockets)', 'Monitoring & alerts', 'SLA-backed uptime', '6 months support'] },
                ],
            },
            {
                slug: 'integration',
                label: 'System Integration',
                intro: 'Connect your existing tools, platforms, and databases into a seamless ecosystem.',
                packages: [
                    { name: 'Basic Integration',      price: 'K 10,000', period: 'once-off', features: ['2-system integration', 'Data mapping & transformation', 'Scheduled sync', 'Error logging', '1 month support'] },
                    { name: 'Multi-system',           price: 'K 20,000', period: 'once-off', highlight: true, badge: 'Popular', features: ['Up to 5 systems', 'Real-time sync', 'Conflict resolution', 'Monitoring dashboard', 'Alerting & reporting', '3 months support'] },
                    { name: 'Enterprise Integration', price: 'K 40,000+', period: 'project', features: ['Unlimited systems', 'ESB / middleware setup', 'Legacy system connectors', 'Data governance', 'Full audit trail', '6 months support'] },
                ],
            },
        ],
    },

    /* ── MOBILE APPS ──────────────────────────────────────── */
    {
        slug: 'mobile',
        label: 'Mobile Apps',
        icon: MonitorSmartphone,
        subCategories: [
            {
                slug: 'android',
                label: 'Android Apps',
                intro: 'Native Android apps built with Kotlin for performance and reliability.',
                packages: [
                    { name: 'Basic Android',    price: 'K 12,000', period: 'once-off', features: ['Up to 5 screens', 'User authentication', 'Push notifications', 'Play Store submission', '1 month support'] },
                    { name: 'Standard Android', price: 'K 20,000', period: 'once-off', highlight: true, badge: 'Best Value', features: ['Up to 15 screens', 'Payment integration', 'Offline mode', 'Admin dashboard', 'Analytics', '3 months support'] },
                    { name: 'Advanced Android', price: 'K 35,000', period: 'once-off', features: ['Unlimited screens', 'Real-time features', 'Backend API included', 'Custom UI components', 'Performance profiling', '6 months support'] },
                ],
            },
            {
                slug: 'ios',
                label: 'iOS Apps',
                intro: 'Native iOS apps built with Swift for iPhone and iPad.',
                packages: [
                    { name: 'Basic iOS',    price: 'K 15,000', period: 'once-off', features: ['Up to 5 screens', 'Apple Sign-in', 'Push notifications', 'App Store submission', '1 month support'] },
                    { name: 'Standard iOS', price: 'K 22,000', period: 'once-off', highlight: true, badge: 'Popular', features: ['Up to 15 screens', 'Apple Pay integration', 'Offline capability', 'Admin dashboard', 'TestFlight beta', '3 months support'] },
                    { name: 'Advanced iOS', price: 'K 38,000', period: 'once-off', features: ['Unlimited screens', 'ARKit / CoreML features', 'Backend API included', 'Custom UI', 'iPad support', '6 months support'] },
                ],
            },
            {
                slug: 'cross-platform',
                label: 'Cross-Platform (Flutter)',
                intro: 'Single codebase apps that run on Android and iOS with near-native performance.',
                packages: [
                    { name: 'Basic',    price: 'K 20,000', period: 'once-off', features: ['Android + iOS', 'Up to 10 screens', 'Auth & notifications', 'Both store submissions', '2 months support'] },
                    { name: 'Standard', price: 'K 30,000', period: 'once-off', highlight: true, badge: 'Best Value', features: ['Android + iOS', 'Up to 20 screens', 'Payment integration', 'Real-time sync', 'Admin panel', '3 months support'] },
                    { name: 'Advanced', price: 'K 50,000', period: 'once-off', features: ['Android + iOS + Web', 'Unlimited screens', 'Custom animations', 'Offline-first', 'Backend API included', '6 months support'] },
                ],
            },
        ],
    },

    /* ── IT CONSULTING ────────────────────────────────────── */
    {
        slug: 'consulting',
        label: 'IT Consulting',
        icon: Headset,
        subCategories: [
            {
                slug: 'audit',
                label: 'IT Audit & Assessment',
                intro: 'Comprehensive reviews of your infrastructure, processes, and security posture.',
                packages: [
                    { name: 'Basic Audit',      price: 'K 2,500',  period: 'once-off', features: ['Infrastructure review', 'Security assessment', 'Recommendations report', 'One-day on-site visit'] },
                    { name: 'Full IT Audit',    price: 'K 5,000',  period: 'once-off', highlight: true, badge: 'Recommended', features: ['End-to-end infrastructure audit', 'Security & compliance check', 'Risk assessment matrix', 'Priority roadmap', 'Management presentation', '2-day engagement'] },
                    { name: 'Enterprise Audit', price: 'K 10,000', period: 'once-off', features: ['Multi-site assessment', 'Full compliance audit', 'Penetration test included', 'Board-level report', 'Remediation plan', 'Follow-up review'] },
                ],
            },
            {
                slug: 'support',
                label: 'IT Support & Helpdesk',
                intro: 'Reliable ongoing IT support so your team can focus on business, not tech issues.',
                packages: [
                    { name: 'Basic Support',   price: 'K 3,000', period: '/month', features: ['Remote helpdesk (8 hrs/day)', 'Monthly health check', 'Software updates & patches', '4-hr priority response', 'Monthly report'] },
                    { name: 'Advanced Support', price: 'K 5,000', period: '/month', highlight: true, badge: 'Popular', features: ['Remote + on-site support', 'Weekly health checks', 'Proactive monitoring', '2-hr priority response', 'Up to 20 devices', 'Quarterly review'] },
                    { name: 'Full Managed IT', price: 'K 8,000', period: '/month', features: ['24/7 remote support', 'On-site visits (weekly)', 'Full device management', '1-hr critical response', 'Unlimited devices', 'Monthly strategic review'] },
                ],
            },
            {
                slug: 'strategy',
                label: 'IT Strategy & Roadmap',
                intro: 'Align your technology investments with your business vision and growth plans.',
                packages: [
                    { name: 'Starter Strategy',   price: 'K 5,000',  period: 'once-off', features: ['Current state assessment', '12-month IT roadmap', 'Budget recommendations', 'Technology selection', 'Executive report'] },
                    { name: 'Business Strategy',  price: 'K 12,000', period: 'once-off', highlight: true, badge: 'Recommended', features: ['3-year strategic plan', 'Digital transformation roadmap', 'Vendor evaluation', 'TCO analysis', 'Risk & opportunity matrix', 'Management workshop'] },
                    { name: 'Enterprise Strategy', price: 'K 20,000', period: 'once-off', features: ['5-year technology strategy', 'Board-level advisory', 'Innovation lab sessions', 'M&A IT due diligence', 'Change management plan', 'Quarterly review sessions'] },
                ],
            },
        ],
    },

    /* ── NETWORKING ───────────────────────────────────────── */
    {
        slug: 'networking',
        label: 'Networking',
        icon: Network,
        subCategories: [
            {
                slug: 'lan-wan',
                label: 'LAN / WAN Infrastructure',
                intro: 'End-to-end wired network design, installation, and management.',
                packages: [
                    { name: 'Home / SOHO',      price: 'K 1,500',   period: 'once-off', features: ['Router & switch setup', 'Up to 5 nodes', 'Basic firewall', 'Cable management'] },
                    { name: 'Small Office',     price: 'K 5,000',   period: 'once-off', highlight: true, badge: 'Popular', features: ['Structured cabling (20 nodes)', 'Managed switch', 'VLAN setup', 'Network documentation', '1 month support'] },
                    { name: 'Enterprise LAN/WAN', price: 'K 15,000+', period: 'project', features: ['Full LAN/WAN design', 'Unlimited nodes', 'Advanced VLAN segmentation', 'Redundant links', 'Network monitoring', '3 months support'] },
                ],
            },
            {
                slug: 'wifi',
                label: 'Wi-Fi Solutions',
                intro: 'Seamless, high-performance wireless networks for homes, offices, and campuses.',
                packages: [
                    { name: 'Basic Wi-Fi',      price: 'K 2,000',   period: 'once-off', features: ['Single AP setup', 'Guest network', 'Basic security config', 'Signal optimisation', '2 weeks support'] },
                    { name: 'Office Wi-Fi',     price: 'K 6,000',   period: 'once-off', highlight: true, badge: 'Most Popular', features: ['Up to 4 access points', 'Controller-based management', 'Band steering', 'Captive portal', 'Coverage mapping', '1 month support'] },
                    { name: 'Enterprise Wi-Fi', price: 'K 12,000+', period: 'project', features: ['Unlimited APs', 'Cloud-managed controller', 'Seamless roaming', 'Network analytics', 'QoS & traffic shaping', '3 months support'] },
                ],
            },
            {
                slug: 'cctv',
                label: 'CCTV & Surveillance',
                intro: 'Professional IP camera systems for business security and monitoring.',
                packages: [
                    { name: 'Basic CCTV',      price: 'K 3,000',   period: 'once-off', features: ['4 IP cameras', 'NVR setup', '7-day recording', 'Mobile viewing app', 'Cable installation', '1 month support'] },
                    { name: 'Business CCTV',   price: 'K 8,000',   period: 'once-off', highlight: true, badge: 'Best Value', features: ['8 cameras (indoor/outdoor)', 'NVR + cloud backup', '30-day recording', 'Motion alerts', 'Remote monitoring', '3 months support'] },
                    { name: 'Enterprise CCTV', price: 'K 18,000+', period: 'project', features: ['16+ cameras', 'AI-powered analytics', 'Facial recognition option', 'Access control integration', 'Redundant storage', '6 months support'] },
                ],
            },
            {
                slug: 'cabling',
                label: 'Structured Cabling',
                intro: 'Cat 6/6A certified cabling systems for reliable, high-speed connectivity.',
                packages: [
                    { name: 'Small Office',      price: 'K 2,500',   period: 'once-off', features: ['Up to 10 data points', 'Cat6 cabling', 'Patch panel & rack', 'Cable labelling', 'Certification testing'] },
                    { name: 'Medium Office',     price: 'K 7,000',   period: 'once-off', highlight: true, badge: 'Popular', features: ['Up to 30 data points', 'Cat6A cabling', 'Raised floor / ceiling routing', 'Full documentation', 'Certification testing', '1 month warranty'] },
                    { name: 'Enterprise Cabling', price: 'K 15,000+', period: 'project', features: ['Unlimited data points', 'Cat6A / fibre optic', 'Server room setup', 'Full as-built drawings', 'Extended warranty', 'Ongoing maintenance'] },
                ],
            },
        ],
    },

    /* ── CYBERSECURITY ────────────────────────────────────── */
    {
        slug: 'cybersecurity',
        label: 'Cybersecurity',
        icon: Shield,
        subCategories: [
            {
                slug: 'pentest',
                label: 'Vulnerability Assessment & Penetration Testing',
                intro: 'Identify and fix security weaknesses before attackers can exploit them.',
                packages: [
                    { name: 'Vulnerability Scan', price: 'K 3,000',   period: 'once-off', features: ['Automated vulnerability scan', 'Risk-rated report', 'Remediation recommendations', 'Rescan after fixes'] },
                    { name: 'Penetration Test',   price: 'K 8,000',   period: 'once-off', highlight: true, badge: 'Recommended', features: ['Manual pen test (network)', 'Web application testing', 'Exploitation & proof of concept', 'Executive & technical report', 'Remediation workshop', 'Re-test included'] },
                    { name: 'Red Team Exercise',  price: 'K 15,000+', period: 'project', features: ['Full red team simulation', 'Social engineering', 'Physical security testing', 'Adversary simulation', 'Board-level debrief', 'Purple team session'] },
                ],
            },
            {
                slug: 'soc',
                label: 'Security Operations Centre (SOC)',
                intro: 'Continuous threat monitoring and rapid incident response for your organisation.',
                packages: [
                    { name: 'SOC Essentials',   price: 'K 5,000',  period: '/month', features: ['8/5 monitoring', 'SIEM log collection', 'Threat alerting', 'Monthly security report', 'Incident triage'] },
                    { name: 'SOC Professional', price: 'K 12,000', period: '/month', highlight: true, badge: 'Recommended', features: ['24/7 monitoring', 'Advanced SIEM & SOAR', 'Threat hunting', 'Incident response (4-hr SLA)', 'Compliance reporting', 'Weekly briefings'] },
                    { name: 'SOC Enterprise',   price: 'K 20,000', period: '/month', features: ['24/7 dedicated analysts', 'Custom SIEM rules', 'Threat intelligence feeds', '1-hr critical SLA', 'Full IR management', 'Regulatory compliance'] },
                ],
            },
            {
                slug: 'endpoint',
                label: 'Endpoint & Network Security',
                intro: 'Protect every device and network segment with enterprise-grade security tools.',
                packages: [
                    { name: 'Basic Protection',    price: 'K 5,000',  period: 'once-off', features: ['Antivirus deployment', 'Firewall configuration', 'Email security gateway', 'Up to 20 devices', '3 months monitoring'] },
                    { name: 'Advanced Security',   price: 'K 10,000', period: 'once-off', highlight: true, badge: 'Most Popular', features: ['EDR deployment', 'Next-gen firewall / UTM', 'Email + web filtering', 'Up to 50 devices', 'Security dashboard', '6 months monitoring'] },
                    { name: 'Enterprise Security', price: 'K 18,000', period: 'once-off', features: ['XDR platform', 'Zero-trust network', 'DLP implementation', 'Unlimited devices', 'SIEM integration', '12 months monitoring'] },
                ],
            },
            {
                slug: 'compliance',
                label: 'Compliance & Risk Management',
                intro: 'Align your organisation with regulatory frameworks and manage IT risk effectively.',
                packages: [
                    { name: 'Risk Assessment',   price: 'K 4,000',  period: 'once-off', features: ['IT risk register', 'Gap analysis', 'Risk matrix', 'Mitigation roadmap', 'Executive report'] },
                    { name: 'Compliance Package', price: 'K 8,000',  period: 'once-off', highlight: true, badge: 'Recommended', features: ['ISO 27001 alignment', 'Policy development', 'Staff awareness training', 'Controls implementation', 'Internal audit', 'Compliance report'] },
                    { name: 'Full Compliance',   price: 'K 15,000', period: 'once-off', features: ['Multi-framework compliance', 'GDPR / POPIA readiness', 'Regulatory liaison', 'Continuous monitoring setup', 'Annual re-assessment', 'Legal advisory'] },
                ],
            },
            {
                slug: 'training',
                label: 'Security Awareness Training',
                intro: 'Build a security-first culture by training your staff to recognise and respond to threats.',
                packages: [
                    { name: 'Basic Training',   price: 'K 2,000', period: 'once-off', features: ['Half-day workshop', 'Phishing awareness', 'Password best practices', 'Up to 20 staff', 'Training certificate'] },
                    { name: 'Full Programme',   price: 'K 4,500', period: 'once-off', highlight: true, badge: 'Most Effective', features: ['Full-day training', 'Phishing simulation', 'Social engineering awareness', 'Up to 50 staff', 'Dept-specific content', 'Post-training assessment'] },
                    { name: 'Annual Programme', price: 'K 8,000', period: '/year', features: ['Quarterly training sessions', 'Ongoing phishing simulations', 'Policy updates & reminders', 'Unlimited staff', 'Compliance reporting', 'Security culture metrics'] },
                ],
            },
        ],
    },

    /* ── CLOUD & DIGITAL ─────────────────────────────────── */
    {
        slug: 'cloud',
        label: 'Cloud & Digital',
        icon: Cloud,
        subCategories: [
            {
                slug: 'cloud-migration',
                label: 'Cloud Migration & Adoption',
                intro: 'Seamlessly move your infrastructure, data, and applications to the cloud.',
                packages: [
                    { name: 'Cloud Starter',      price: 'K 5,000',   period: 'once-off', features: ['Microsoft 365 / Google Workspace', 'Up to 10 users', 'Email migration', 'Cloud storage setup', '2 weeks support'] },
                    { name: 'Cloud Migration',    price: 'K 12,000',  period: 'project',  highlight: true, badge: 'Most Popular', features: ['AWS / Azure / GCP migration', 'Data migration & validation', 'Infrastructure as Code', 'Auto-scaling config', 'Cost optimisation', '1 month hyper-care'] },
                    { name: 'Enterprise Migration', price: 'K 25,000+', period: 'project', features: ['Full workload migration', 'Zero-downtime cutover', 'DR & failover setup', 'Multi-region deployment', 'Security hardening', '3 months support'] },
                ],
            },
            {
                slug: 'multicloud',
                label: 'Multi-cloud Architecture',
                intro: 'Design workloads across multiple cloud providers for resilience and flexibility.',
                packages: [
                    { name: 'Dual Cloud',             price: 'K 10,000', period: 'project', features: ['2-cloud strategy', 'Workload distribution', 'Unified monitoring', 'Cost allocation', 'Full documentation', '1 month support'] },
                    { name: 'Multi-cloud Pro',        price: 'K 20,000', period: 'project', highlight: true, badge: 'Recommended', features: ['3+ cloud providers', 'Cloud-agnostic architecture', 'Service mesh setup', 'Centralised security', 'FinOps dashboard', '3 months support'] },
                    { name: 'Enterprise Multi-cloud', price: 'K 40,000+', period: 'project', features: ['Bespoke architecture', 'Sovereign cloud compliance', 'Advanced networking (VPN/Direct)', 'Automated governance', 'SRE practices', '6 months support'] },
                ],
            },
            {
                slug: 'cost-optimisation',
                label: 'Cloud Cost Optimisation',
                intro: 'Reduce your cloud spend without sacrificing performance or reliability.',
                packages: [
                    { name: 'Cost Audit',          price: 'K 3,000',  period: 'once-off', features: ['Cloud spend analysis', 'Idle resource identification', 'Saving recommendations', 'Quick-win report'] },
                    { name: 'Optimisation Package', price: 'K 6,000',  period: 'once-off', highlight: true, badge: 'Best ROI', features: ['Full FinOps assessment', 'Reserved instance planning', 'Auto-scaling optimisation', 'Budget alerts setup', 'Implementation support', 'Projected savings report'] },
                    { name: 'Managed FinOps',      price: 'K 12,000', period: '/year',    features: ['Ongoing cost monitoring', 'Monthly optimisation', 'Reserved instance management', 'Chargeback & showback', 'Quarterly business review', 'Savings guaranteed'] },
                ],
            },
            {
                slug: 'serverless',
                label: 'Serverless & Containerisation',
                intro: 'Modernise applications with containers, Kubernetes, and serverless architectures.',
                packages: [
                    { name: 'Containerisation',       price: 'K 8,000',   period: 'project', features: ['Docker containerisation', 'Up to 5 services', 'Container registry setup', 'Basic orchestration', 'CI/CD pipeline', '1 month support'] },
                    { name: 'Kubernetes Setup',       price: 'K 15,000',  period: 'project', highlight: true, badge: 'Recommended', features: ['Kubernetes cluster setup', 'Microservices deployment', 'Helm charts', 'Auto-scaling (HPA/VPA)', 'Monitoring (Prometheus/Grafana)', '3 months support'] },
                    { name: 'Serverless Architecture', price: 'K 30,000+', period: 'project', features: ['Lambda / Azure Functions', 'Event-driven design', 'API Gateway integration', 'Fully managed compute', 'Cost-per-invocation model', '6 months support'] },
                ],
            },
            {
                slug: 'disaster-recovery',
                label: 'Disaster Recovery Planning',
                intro: 'Ensure business continuity with robust backup and recovery strategies.',
                packages: [
                    { name: 'DR Assessment',     price: 'K 5,000',   period: 'once-off', features: ['BIA & risk assessment', 'RTO/RPO analysis', 'DR strategy design', 'Gap report', 'Recommendations'] },
                    { name: 'DR Implementation', price: 'K 10,000',  period: 'project',  highlight: true, badge: 'Most Popular', features: ['DR site setup (cloud/offsite)', 'Automated backup config', 'Failover testing', 'DR runbook documentation', 'Staff training', '3 months monitoring'] },
                    { name: 'Enterprise DR',     price: 'K 20,000+', period: 'project',  features: ['Active-active DR', 'Sub-1-hour RTO', 'Continuous data replication', 'Quarterly DR drills', 'Regulatory compliance', '24/7 DR on-call support'] },
                ],
            },
        ],
    },

    /* ── IT REPAIR ────────────────────────────────────────── */
    {
        slug: 'repair',
        label: 'IT Repair',
        icon: Wrench,
        subCategories: [
            {
                slug: 'hardware',
                label: 'Hardware Repair',
                intro: 'Fast, reliable repair of computers, laptops, printers, and other hardware.',
                packages: [
                    { name: 'Basic Repair',    price: 'K 300',   period: 'once-off', features: ['Diagnostic fee included', 'Basic hardware check', 'Fan cleaning', 'Thermal paste replacement', '7-day warranty'] },
                    { name: 'Standard Repair', price: 'K 700',   period: 'once-off', highlight: true, badge: 'Best Value', features: ['Full hardware diagnostics', 'Screen / keyboard replacement', 'RAM / storage upgrade', 'Parts at cost price', '30-day warranty'] },
                    { name: 'Advanced Repair', price: 'K 1,500', period: 'once-off', features: ['Motherboard-level repair', 'Water damage treatment', 'Component-level soldering', 'Data recovery (basic)', '90-day warranty'] },
                ],
            },
            {
                slug: 'software-os',
                label: 'Software & OS Services',
                intro: 'OS installation, virus removal, and software optimisation services.',
                packages: [
                    { name: 'Basic OS Service', price: 'K 200', period: 'once-off', features: ['OS reinstall (Windows / Linux)', 'Driver installation', 'Basic software setup', '7-day warranty'] },
                    { name: 'Full Tune-up',     price: 'K 500', period: 'once-off', highlight: true, badge: 'Popular', features: ['Virus & malware removal', 'OS optimisation', 'Software updates & patches', 'Startup optimisation', 'Data backup', '14-day warranty'] },
                    { name: 'Enterprise OS',    price: 'K 1,000', period: 'once-off', features: ['Bulk OS deployment (5 PCs)', 'Domain join & policy config', 'Software licensing', 'User profile migration', '30-day warranty'] },
                ],
            },
            {
                slug: 'data-recovery',
                label: 'Data Recovery',
                intro: 'Professional recovery from failed drives, accidental deletion, and corrupted media.',
                packages: [
                    { name: 'Logical Recovery',  price: 'K 500',   period: 'once-off', features: ['Deleted file recovery', 'Formatted drive recovery', 'USB / SD card recovery', 'Success-based pricing', '7-day turnaround'] },
                    { name: 'Standard Recovery', price: 'K 1,500', period: 'once-off', highlight: true, badge: 'Most Common', features: ['Failed HDD / SSD recovery', 'RAID array recovery', 'Corrupted partition repair', 'Free evaluation', '3-day turnaround'] },
                    { name: 'Advanced Recovery', price: 'K 3,000+', period: 'once-off', features: ['Cleanroom recovery', 'Physically damaged drives', 'Encrypted volume recovery', 'Forensic-grade imaging', 'Priority 24-hr service'] },
                ],
            },
            {
                slug: 'maintenance',
                label: 'Maintenance Contracts',
                intro: 'Preventive maintenance plans to keep your devices running at peak performance.',
                packages: [
                    { name: 'Small Office', price: 'K 1,500', period: '/month', features: ['Up to 5 devices', 'Monthly preventive maintenance', 'Priority repair turnaround', 'Parts at cost', 'Quarterly health report'] },
                    { name: 'Business',     price: 'K 3,000', period: '/month', highlight: true, badge: 'Best Value', features: ['Up to 15 devices', 'Monthly maintenance', 'On-site visits (bi-weekly)', 'Loaner device available', '24-hr SLA', 'Quarterly health report'] },
                    { name: 'Enterprise',   price: 'K 5,000', period: '/month', features: ['Unlimited devices', 'Weekly preventive maintenance', 'Same-day on-site response', 'Spare parts stocked', '4-hr SLA', 'Monthly executive report'] },
                ],
            },
        ],
    },
];

/* ══════════════════════════════════════════════════════════
   PACKAGE CARD
══════════════════════════════════════════════════════════ */
function PackageCard({ pkg, quoteLabel }: { pkg: Package; quoteLabel: string }) {
    return (
        <div className="relative flex flex-col rounded-2xl bg-white overflow-hidden transition-all duration-200"
            style={{
                border: pkg.highlight ? `2px solid ${G}` : '1px solid #E5E5E5',
                boxShadow: pkg.highlight ? `0 8px 32px ${G_BG}` : '0 2px 12px rgba(0,0,0,0.05)',
            }}>
            {/* Highlight top bar */}
            {pkg.highlight && <div className="h-1" style={{ background:`linear-gradient(90deg,${G},${G_D})` }} />}

            {/* Badge */}
            {pkg.badge && (
                <div className="absolute top-0 right-0">
                    <div className="rounded-bl-2xl px-3 py-1.5 text-[11px] font-bold text-black"
                        style={{ background:`linear-gradient(135deg,${G},${G_D})` }}>
                        {pkg.badge}
                    </div>
                </div>
            )}

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[16px] font-extrabold" style={{ color:BLK }}>{pkg.name}</h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mt-3 mb-5">
                    <span className="text-[30px] font-extrabold leading-none" style={{ color: pkg.highlight ? G : BLK }}>{pkg.price}</span>
                    <span className="text-[13px]" style={{ color:'#94A3B8' }}>{pkg.period}</span>
                </div>

                <div className="h-px mb-5" style={{ background: pkg.highlight ? G_BD : '#E5E5E5' }} />

                {/* Features */}
                <ul className="space-y-2.5 flex-1">
                    {pkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle className="size-4 shrink-0 mt-0.5" style={{ color:G }} />
                            <span className="text-[13px]" style={{ color:'#374151' }}>{f}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link href={`/quote?service=${encodeURIComponent(quoteLabel)}&package=${encodeURIComponent(pkg.name)}&price=${encodeURIComponent(pkg.price)}&period=${encodeURIComponent(pkg.period)}`}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] font-bold transition-all hover:scale-[1.02] active:scale-95"
                    style={pkg.highlight
                        ? { background:`linear-gradient(135deg,${G},${G_D})`, color:BLK, boxShadow:`0 4px 14px ${G_GL}` }
                        : { background:'#fff', border:`1.5px solid ${G_BD}`, color:G }
                    }
                >
                    Request Service <ArrowRight className="size-3.5" />
                </Link>
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
export default function Pricing() {
    const [activeCat, setActiveCat] = useState(pricingData[0].slug);
    const [activeSub, setActiveSub] = useState(pricingData[0].subCategories[0].slug);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const t = params.get('tab');
        if (t) {
            const cat = pricingData.find(p => p.slug === t);
            if (cat) { setActiveCat(cat.slug); setActiveSub(cat.subCategories[0].slug); }
        }
    }, []);

    const currentCat = pricingData.find(p => p.slug === activeCat)!;
    const currentSub = currentCat.subCategories.find(s => s.slug === activeSub) ?? currentCat.subCategories[0];
    const CatIcon    = currentCat.icon;

    const switchCat = (slug: string) => {
        const cat = pricingData.find(p => p.slug === slug)!;
        setActiveCat(slug);
        setActiveSub(cat.subCategories[0].slug);
    };

    return (
        <HomeLayout>
            <Head title="Pricing — Amias Technologies" />

            {/* ══ HERO ════════════════════════════════════════════ */}
            <section className="relative overflow-hidden py-20 lg:py-28"
                style={{ background:`linear-gradient(135deg,${NAVY} 0%,${NAVYm} 100%)` }}>
                <div className="absolute inset-0" style={{ backgroundImage:`linear-gradient(rgba(252,163,17,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(252,163,17,0.06) 1px,transparent 1px)`, backgroundSize:'60px 60px' }} />
                <div className="pointer-events-none absolute -bottom-20 -right-20 w-96 h-96 rounded-full" style={{ background:`radial-gradient(circle,${G_BG} 0%,transparent 65%)` }} />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-6 text-[12px]" style={{ color:'rgba(255,255,255,0.45)' }}>
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span style={{ color:G }}>/</span>
                        <Link href="/services" className="transition-colors hover:text-white">Services</Link>
                        <span style={{ color:G }}>/</span>
                        <span style={{ color:G }}>Pricing</span>
                    </div>
                    <span className="inline-block mb-4 rounded-full px-4 py-1 text-[11px] font-bold uppercase tracking-[2px]"
                        style={{ background:G_BG, color:G, border:`1px solid ${G_BD}` }}>Transparent Pricing</span>
                    <h1 className="text-[34px] sm:text-[48px] lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.06]">
                        Service <span style={{ color:G }}>Pricing</span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-[16px] leading-[1.75]" style={{ color:'rgba(255,255,255,0.60)' }}>
                        Clear, transparent pricing for every IT service. All prices in Zambian Kwacha (ZMW).
                        Custom quotes available for complex projects.
                    </p>
                </div>
            </section>

            {/* ══ MAIN CONTENT ════════════════════════════════════ */}
            <section className="py-12 lg:py-20" style={{ backgroundColor:'#F5F5F5' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* ── CATEGORY TABS (level 1) ─────────────────── */}
                    <div className="mb-6 overflow-x-auto pb-2">
                        <div className="flex gap-2 min-w-max">
                            {pricingData.map(cat => {
                                const Icon = cat.icon;
                                const active = activeCat === cat.slug;
                                return (
                                    <button key={cat.slug} onClick={() => switchCat(cat.slug)}
                                        className="flex items-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold transition-all whitespace-nowrap"
                                        style={active
                                            ? { background:`linear-gradient(135deg,${G},${G_D})`, color:BLK, boxShadow:`0 4px 14px ${G_GL}` }
                                            : { background:'#fff', color:'#475569', border:'1px solid #E5E5E5' }
                                        }
                                        onMouseEnter={e => { if (!active) { const el = e.currentTarget; el.style.borderColor = G_BD; el.style.color = G; } }}
                                        onMouseLeave={e => { if (!active) { const el = e.currentTarget; el.style.borderColor = '#E5E5E5'; el.style.color = '#475569'; } }}
                                    >
                                        <Icon className="size-4" /> {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── CATEGORY HEADER ─────────────────────────── */}
                    <div className="mb-5 flex items-center gap-3">
                        <div className="inline-flex rounded-xl p-2.5 shrink-0" style={{ background:G_BG, border:`1px solid ${G_BD}` }}>
                            <CatIcon className="size-5" style={{ color:G }} />
                        </div>
                        <h2 className="text-[20px] font-extrabold" style={{ color:BLK }}>{currentCat.label}</h2>
                    </div>

                    {/* ── SUB-CATEGORY TABS (level 2) ─────────────── */}
                    <div className="mb-8 overflow-x-auto pb-1">
                        <div className="flex gap-2 min-w-max">
                            {currentCat.subCategories.map(sub => {
                                const active = activeSub === sub.slug;
                                return (
                                    <button key={sub.slug} onClick={() => setActiveSub(sub.slug)}
                                        className="rounded-full px-4 py-2 text-[12px] font-semibold transition-all whitespace-nowrap"
                                        style={active
                                            ? { background:G_BG, color:G, border:`1.5px solid ${G_BD}` }
                                            : { background:'#fff', color:'#475569', border:'1px solid #E5E5E5' }
                                        }
                                        onMouseEnter={e => { if (!active) { const el = e.currentTarget; el.style.borderColor = G_BD; el.style.color = G; } }}
                                        onMouseLeave={e => { if (!active) { const el = e.currentTarget; el.style.borderColor = '#E5E5E5'; el.style.color = '#475569'; } }}
                                    >
                                        {sub.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── SUB-CATEGORY INTRO ──────────────────────── */}
                    <div className="mb-8">
                        <h3 className="text-[17px] font-bold mb-1" style={{ color:BLK }}>{currentSub.label}</h3>
                        <p className="text-[14px]" style={{ color:'#475569' }}>{currentSub.intro}</p>
                    </div>

                    {/* ── PRICING CARDS ───────────────────────────── */}
                    <div className={`grid gap-6 ${currentSub.packages.length === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                        {currentSub.packages.map(pkg => (
                            <PackageCard
                                key={pkg.name}
                                pkg={pkg}
                                quoteLabel={`${currentCat.label} › ${currentSub.label}`}
                            />
                        ))}
                    </div>

                    {/* ── CUSTOM QUOTE BANNER ─────────────────────── */}
                    <div className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                        style={{ background:NAVY, border:`1px solid ${G_BD}` }}>
                        <div>
                            <p className="text-[15px] font-bold text-white">Need something custom?</p>
                            <p className="text-[13px] mt-1" style={{ color:'rgba(255,255,255,0.55)' }}>
                                Every business is unique. Contact us for a tailored quote on complex or large-scale projects.
                            </p>
                        </div>
                        <Link href="/quote"
                            className="shrink-0 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13px] font-bold text-black transition-all hover:scale-[1.03]"
                            style={{ background:`linear-gradient(135deg,${G},${G_D})`, boxShadow:`0 4px 14px ${G_GL}` }}
                        >
                            Request a Custom Service <ArrowRight className="size-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══ QUICK CATEGORY NAV ══════════════════════════════ */}
            <section className="py-12" style={{ backgroundColor:'#fff' }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <p className="text-[13px] mb-6" style={{ color:'#94A3B8' }}>Browse pricing for all service categories</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {pricingData.map(cat => {
                            const Icon = cat.icon;
                            const active = activeCat === cat.slug;
                            return (
                                <button key={cat.slug}
                                    onClick={() => { switchCat(cat.slug); window.scrollTo({ top: 0, behavior:'smooth' }); }}
                                    className="flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all"
                                    style={{ background: active ? G_BG : '#F5F5F5', color: active ? G : '#475569', border:`1px solid ${active ? G_BD : '#E5E5E5'}` }}
                                >
                                    <Icon className="size-3.5" /> {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
