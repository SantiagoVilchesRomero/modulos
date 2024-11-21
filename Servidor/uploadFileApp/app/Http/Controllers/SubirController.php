<?php

namespace App\Http\Controllers;

use App\Models\Subir;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class SubirController extends Controller
{
    public function index()
    {
        $subirs = Subir::orderBy('nombre_original')->get();
        return view('subir.index', compact('subirs'));
    }

    public function create()
    {
        return view('subir.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $file = $request->file('file');
        $originalName = $file->getClientOriginalName();
        $timestamp = Carbon::now()->format('Y_m_d_H_i_s');
        $fileName = $timestamp . '_' . $originalName;
        $filePath = 'ejercicio/' . $fileName;

        Storage::disk('private')->putFileAs('ejercicio', $file, $fileName);

        $link = ('ejercicio/' . $fileName);

        Subir::create([
            'nombre_original' => $originalName,
            'nombre' => $fileName,
            'link' => $link,
        ]);

        return redirect()->route('subir.index');
    }

    public function show($id)
    {
        $subir = Subir::findOrFail($id);
        return view('subir.show', compact('subir'));
    }

    public function view(Subir $photo)
    {
        $path = storage_path('app/private/' . $photo->link);

        if (!file_exists($path)) {
            abort(404);
        }

        $file = file_get_contents($path);
        $type = mime_content_type($path);

        return response($file, 200)->header('Content-Type', $type);
    }
}