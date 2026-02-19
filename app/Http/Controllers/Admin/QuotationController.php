<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuotationController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/quotations/index', [
            'quotations' => Quotation::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/quotations/create', [
            'nextNumber' => Quotation::nextNumber(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'quote_number'        => 'required|string|unique:quotations',
            'quote_date'          => 'required|date',
            'validity_date'       => 'nullable|date',
            'status'              => 'required|in:draft,sent,accepted,rejected,expired',
            'client_name'         => 'required|string|max:255',
            'client_company'      => 'nullable|string|max:255',
            'client_address'      => 'nullable|string',
            'client_phone'        => 'nullable|string|max:30',
            'client_email'        => 'nullable|email|max:255',
            'project_description' => 'nullable|string|max:255',
            'items'               => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.qty'         => 'required|numeric|min:0',
            'items.*.unit_price'  => 'required|numeric|min:0',
            'items.*.vat_percent' => 'required|numeric|min:0|max:100',
            'items.*.amount'      => 'required|numeric|min:0',
            'subtotal'            => 'required|numeric|min:0',
            'discount'            => 'nullable|numeric|min:0',
            'vat_rate'            => 'required|numeric|min:0|max:100',
            'vat_amount'          => 'required|numeric|min:0',
            'total'               => 'required|numeric|min:0',
            'currency'            => 'required|string|max:5',
            'notes'               => 'nullable|string',
            'terms'               => 'nullable|string',
        ]);

        $data['discount'] = $data['discount'] ?? 0;
        Quotation::create($data);
        return redirect('/admin/quotations')->with('success', 'Quotation created.');
    }

    public function show(Quotation $quotation)
    {
        return Inertia::render('admin/quotations/show', ['quotation' => $quotation]);
    }

    public function edit(Quotation $quotation)
    {
        return Inertia::render('admin/quotations/edit', ['quotation' => $quotation]);
    }

    public function update(Request $request, Quotation $quotation)
    {
        $data = $request->validate([
            'quote_number'        => 'required|string|unique:quotations,quote_number,' . $quotation->id,
            'quote_date'          => 'required|date',
            'validity_date'       => 'nullable|date',
            'status'              => 'required|in:draft,sent,accepted,rejected,expired',
            'client_name'         => 'required|string|max:255',
            'client_company'      => 'nullable|string|max:255',
            'client_address'      => 'nullable|string',
            'client_phone'        => 'nullable|string|max:30',
            'client_email'        => 'nullable|email|max:255',
            'project_description' => 'nullable|string|max:255',
            'items'               => 'required|array|min:1',
            'items.*.description' => 'required|string',
            'items.*.qty'         => 'required|numeric|min:0',
            'items.*.unit_price'  => 'required|numeric|min:0',
            'items.*.vat_percent' => 'required|numeric|min:0|max:100',
            'items.*.amount'      => 'required|numeric|min:0',
            'subtotal'            => 'required|numeric|min:0',
            'discount'            => 'nullable|numeric|min:0',
            'vat_rate'            => 'required|numeric|min:0|max:100',
            'vat_amount'          => 'required|numeric|min:0',
            'total'               => 'required|numeric|min:0',
            'currency'            => 'required|string|max:5',
            'notes'               => 'nullable|string',
            'terms'               => 'nullable|string',
        ]);

        $data['discount'] = $data['discount'] ?? 0;
        $quotation->update($data);
        return redirect('/admin/quotations')->with('success', 'Quotation updated.');
    }

    public function destroy(Quotation $quotation)
    {
        $quotation->delete();
        return redirect('/admin/quotations')->with('success', 'Quotation deleted.');
    }
}
