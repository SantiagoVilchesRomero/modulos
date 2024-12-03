<?php
namespace App\Http\Controllers;

use App\Models\Pokemon;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        return view('pokemon.index', 
            [
                'lipokemon' => 'active',
                'pokemon' => Pokemon::orderBy('nombre')->get(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return view('pokemon.create', ['lipokemon' => 'active']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'  => 'required|unique:pokemon|max:50|min:4',
            'peso'    => 'required|numeric|gte:0|lte:999.999',
            'altura'  => 'required|numeric|gte:0|lte:10.999',
            'tipo'    => 'required|array|size:2',
            'tipo.*'  => 'string|in:Normal,Fuego,Agua,Planta,Eléctrico,Hielo,Lucha,Veneno,Tierra,Volador,Psíquico,Bicho,Roca,Fantasma,Dragón,Siniestro,Acero,Hada', // Validar que cada valor sea válido
            'numero'  => 'required|numeric|gte:1|lte:999',
        ]);
        // Convertir tipos seleccionados en un string separado por comas
        $validated['tipo'] = implode(', ', $validated['tipo']);
        try {
            Pokemon::create($validated);
            return redirect('pokemon')->with(['message' => 'El Pokémon ha sido creado.']);
        } catch(\Exception $e) {
            return back()->withInput()->withErrors(['message' => 'El Pokémon no ha sido creado.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $pokemon = Pokemon::find($id);
        if($pokemon === null){
            abort(404);
        }
        return view('pokemon.show', ['lipokemon' => 'active', 'pokemon' => $pokemon]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Pokemon $pokemon)
    {
        return view('pokemon.edit', ['lipokemon' => 'active', 'pokemon' => $pokemon]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pokemon $pokemon){
        $validated = $request->validate([
            'nombre'  => 'required|max:50|min:4|unique:pokemon,nombre,' . $pokemon->id,
            'peso'    => 'required|numeric|gte:0|lte:999.999',
            'altura'  => 'required|numeric|gte:0|lte:10.999',
            'tipo'    => 'required|array|size:2', // Validar que sea un array con exactamente 2 elementos
            'tipo.*'  => 'string|in:Normal,Fuego,Agua,Planta,Eléctrico,Hielo,Lucha,Veneno,Tierra,Volador,Psíquico,Bicho,Roca,Fantasma,Dragón,Siniestro,Acero,Hada', // Validar que cada valor sea válido
            'numero'  => 'required|numeric|gte:1|lte:999',
        ]);
        $validated['tipo'] = implode(', ', $validated['tipo']);
        try {
            $result = $pokemon->update($validated);
            return redirect('pokemon')->with(['message' => 'El Pokémon ha sido actualizado.']);
        } catch(\Exception $e) {
            return back()->withInput()->withErrors(['message' => 'El Pokémon no ha sido actualizado.']);  
        }
    }

    /**
     * Remove the specified resource from storage.
     */
        public function destroy(Request $request, Pokemon $pokemon){
        try {
        $pokemon->delete();
        return redirect('pokemon')->with(['message' => 'El Pokémon ha sido eliminado']);
        } catch (\Exception $e) {
        return back()->withErrors(['message' => 'El Pokémon no ha sido eliminado']);
        }
    }
}