<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/services/index', [
            'services' => Service::orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/services/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => ['required', 'string', 'max:100', 'unique:services', 'regex:/^[a-z0-9-]+$/'],
            'description' => 'required|string',
            'icon'        => 'required|string|max:60',
            'number'      => 'required|string|max:5',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:300',
            'is_active'   => 'boolean',
            'sort_order'  => 'integer|min:0|max:999',
        ]);

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function edit(Service $service): Response
    {
        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'slug'        => ['required', 'string', 'max:100', 'unique:services,slug,' . $service->id, 'regex:/^[a-z0-9-]+$/'],
            'description' => 'required|string',
            'icon'        => 'required|string|max:60',
            'number'      => 'required|string|max:5',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:300',
            'is_active'   => 'boolean',
            'sort_order'  => 'integer|min:0|max:999',
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted.');
    }
}
