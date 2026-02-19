<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class PublicServiceController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['id', 'number', 'title', 'slug', 'description', 'icon', 'features']);

        return Inertia::render('homepages/services', [
            'services' => $services,
        ]);
    }
}
