<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/documents/index', [
            'documents' => Document::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/documents/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'category'    => 'required|in:invoice,quotation,contract,report,proposal,other',
            'file'        => 'required|file|max:20480', // 20 MB
        ]);

        $file      = $request->file('file');
        $path      = $file->store('documents', 'public');
        $fileName  = $file->getClientOriginalName();
        $fileSize  = $file->getSize();
        $fileType  = $file->getMimeType();

        Document::create([
            'title'       => $request->title,
            'description' => $request->description,
            'category'    => $request->category,
            'file_path'   => $path,
            'file_name'   => $fileName,
            'file_size'   => $fileSize,
            'file_type'   => $fileType,
            'uploaded_by' => auth()->user()->name ?? 'Admin',
        ]);

        return redirect('/admin/documents')->with('success', 'Document uploaded.');
    }

    public function destroy(Document $document)
    {
        Storage::disk('public')->delete($document->file_path);
        $document->delete();
        return redirect('/admin/documents')->with('success', 'Document deleted.');
    }
}
