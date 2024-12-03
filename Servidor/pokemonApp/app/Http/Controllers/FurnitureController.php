<?php

namespace App\Http\Controllers;

use App\Models\Furniture;
use Illuminate\Http\Request;

class FurnitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        return view('furniture.index', 
            [
                'lifurniture' => 'active',
                'furnitures'    => Furniture::orderBy('model')->get(),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       return view('furniture.create', ['lifurniture' => 'active']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required|unique:furniture|max:50|min:4',
            'price' => 'required|numeric|gte:0|lte:99999.999',
        ]);
        $object = new furniture($request->all());
        try {
            //$result = $object->save();
            $object = furniture::create($request->all());
            return redirect('furniture')->with(['message' => 'The furniture has been created.']);
        } catch(\Exception $e) {
            //si no lo he guardado volver a la página anterior con sus datos para volver a rellenar el formulario y mensaje
            return back()->withInput()->withErrors(['message' => 'The furniture has not been created.']);
        }
    }

    /**
     * Display the specified resource.
    
    *public function show(Furniture $furniture)
    *{
    *dd($furniture)
    *   return view('furniture.show', ['lifurniture' => 'active',
    *                                  'furniture' => $furniture,]);
    *}
    */

    public function show(Request $request, $id)
    {
        $furniture= Furniture::find($id);
        if($furniture===null){
            abort(404);
        }
        return view('furniture.show', ['lifurniture' => 'active',
                                        'furniture' => $furniture,]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request,Furniture $furniture)
    {
        return view('furniture.edit', ['lifurniture' => 'active',
        'furniture' => $furniture,]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Furniture $furniture){
        //$request   -
        //$furniture -
         $validated = $request->validate([
             'model'  => 'required|max:50|min:4|unique:furniture,model,' . $furniture->id,
             'price'  => 'required|numeric|gte:0|lte:99999.999',
         ]);
        try {
            $result = $furniture->update($request->all());
            //update furniture set model = model, price = :price where id = :id
            //parameters:model -> $request->model, price -> $request->price, id ->$furniture->id
            //$furniture->fill($request->all());
            //$result = $furniture->save();
            return redirect('furniture')->with(['message' => 'The furniture has been updated.']);
        } catch(\Exception $e) {
          return back()->withInput()->withErrors(['message' => 'The furniture has not been updated.']);  
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Furniture $furniture)
    {
        try{
            $furniture->delete();
            return redirect('furniture')->with(['message'=>'The furniture has been deleted']);
        }catch (\Exception $e){
            return back()->withErrors(['message'=>'The furniture has not been deleted']);
        }
    } 
}
