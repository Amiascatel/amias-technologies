<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/invoices/index', [
            'invoices' => Invoice::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/invoices/create', [
            'nextNumber' => Invoice::nextNumber(),
            'defaults' => [
                'bank_name'      => 'Zanaco Bank',
                'account_name'   => 'Amias Technologies Limited',
                'account_number' => '',
                'branch_code'    => '',
                'mobile_money'   => '0977090786',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'invoice_number'      => 'required|string|unique:invoices',
            'invoice_date'        => 'required|date',
            'due_date'            => 'nullable|date',
            'contract_ref'        => 'nullable|string|max:50',
            'status'              => 'required|in:unpaid,partial,paid',
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
            'bank_name'           => 'nullable|string|max:255',
            'account_name'        => 'nullable|string|max:255',
            'account_number'      => 'nullable|string|max:50',
            'branch_code'         => 'nullable|string|max:50',
            'mobile_money'        => 'nullable|string|max:30',
            'notes'               => 'nullable|string',
        ]);

        $data['discount'] = $data['discount'] ?? 0;
        Invoice::create($data);
        return redirect('/admin/invoices')->with('success', 'Invoice created.');
    }

    public function show(Invoice $invoice)
    {
        return Inertia::render('admin/invoices/show', ['invoice' => $invoice]);
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('admin/invoices/edit', ['invoice' => $invoice]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $data = $request->validate([
            'invoice_number'      => 'required|string|unique:invoices,invoice_number,' . $invoice->id,
            'invoice_date'        => 'required|date',
            'due_date'            => 'nullable|date',
            'contract_ref'        => 'nullable|string|max:50',
            'status'              => 'required|in:unpaid,partial,paid',
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
            'bank_name'           => 'nullable|string|max:255',
            'account_name'        => 'nullable|string|max:255',
            'account_number'      => 'nullable|string|max:50',
            'branch_code'         => 'nullable|string|max:50',
            'mobile_money'        => 'nullable|string|max:30',
            'notes'               => 'nullable|string',
        ]);

        $data['discount'] = $data['discount'] ?? 0;
        $invoice->update($data);
        return redirect('/admin/invoices')->with('success', 'Invoice updated.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();
        return redirect('/admin/invoices')->with('success', 'Invoice deleted.');
    }
}
