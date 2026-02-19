<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'number'      => '01',
                'title'       => 'IT Consulting & Strategy',
                'description' => 'We help businesses align technology with their strategic goals. Our experts assess your current infrastructure, identify gaps, and develop a tailored IT roadmap that drives efficiency, scalability, and competitive advantage.',
                'icon'        => 'Lightbulb',
                'features'    => ['IT infrastructure assessment', 'Digital transformation roadmap', 'Technology vendor selection', 'IT governance & compliance', 'Cost optimisation strategies'],
                'sort_order'  => 1,
            ],
            [
                'number'      => '02',
                'title'       => 'Software Development',
                'description' => 'From concept to deployment, we build robust, scalable software solutions tailored to your unique business requirements — web applications, APIs, enterprise systems, and everything in between.',
                'icon'        => 'Code',
                'features'    => ['Custom web & mobile applications', 'API design & integration', 'Enterprise software solutions', 'Legacy system modernisation', 'Agile development methodology'],
                'sort_order'  => 2,
            ],
            [
                'number'      => '03',
                'title'       => 'Cloud Solutions',
                'description' => 'Harness the power of the cloud with our end-to-end cloud services. We design, migrate, and manage cloud environments that are secure, cost-effective, and optimised for your workloads.',
                'icon'        => 'Cloud',
                'features'    => ['Cloud migration & adoption', 'Multi-cloud architecture', 'Cloud cost optimisation', 'Serverless & containerisation', 'Disaster recovery planning'],
                'sort_order'  => 3,
            ],
            [
                'number'      => '04',
                'title'       => 'Cybersecurity',
                'description' => 'Protect your business from evolving cyber threats with our comprehensive security services. We identify vulnerabilities, implement defences, and keep your data and systems safe around the clock.',
                'icon'        => 'Shield',
                'features'    => ['Vulnerability assessment & penetration testing', 'Security operations centre (SOC)', 'Endpoint & network security', 'Compliance & risk management', 'Security awareness training'],
                'sort_order'  => 4,
            ],
            [
                'number'      => '05',
                'title'       => 'Data Analytics & BI',
                'description' => 'Turn raw data into actionable insights. We build data pipelines, dashboards, and analytics platforms that empower your team to make faster, smarter, data-driven decisions.',
                'icon'        => 'BarChart3',
                'features'    => ['Data warehouse design', 'Business intelligence dashboards', 'Predictive analytics & ML', 'Real-time data streaming', 'Data governance & quality'],
                'sort_order'  => 5,
            ],
            [
                'number'      => '06',
                'title'       => 'Managed IT Services',
                'description' => 'Let us handle the day-to-day management of your IT environment so you can focus on your core business. We offer proactive monitoring, maintenance, and support to keep your systems running at peak performance.',
                'icon'        => 'Server',
                'features'    => ['24/7 infrastructure monitoring', 'Help desk & end-user support', 'Patch management & updates', 'Network administration', 'SLA-backed service delivery'],
                'sort_order'  => 6,
            ],
            [
                'number'      => '07',
                'title'       => 'Digital Transformation',
                'description' => 'We guide organisations through end-to-end digital transformation — automating processes, modernising operations, and embedding innovation into your culture to deliver lasting business value.',
                'icon'        => 'Zap',
                'features'    => ['Business process automation', 'ERP & CRM implementation', 'Workflow digitisation', 'Change management support', 'Innovation workshops'],
                'sort_order'  => 7,
            ],
        ];

        foreach ($services as $data) {
            Service::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                array_merge($data, ['slug' => Str::slug($data['title']), 'is_active' => true])
            );
        }
    }
}
