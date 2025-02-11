<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller {

    

    function main() {
        return view('main');
    }

    public function index() {
        $products = Product::orderBy('id')->paginate(5);
        // Transformar la colección para agregar el atributo "nombre"
        $products->getCollection()->transform(function($product) {
            $product->nombre = $product->brand . ' ' . $product->model;
            return $product;
        });
        return response()->json([
            'products' => $products
        ]);
    }

    public function index1() {
        $products = Product::orderBy('id')->get();
        $products->transform(function($product) {
            $product->nombre = $product->brand . ' ' . $product->model;
            return $product;
        });
        return response()->json([
            'products' => $products
        ]);
    }

    public function store(Request $request) {
        $products = [];
        $validator = Validator::make($request->all(), [
            'brand'             => 'required|max:50',
            'model'             => 'required|max:100',
            'year'              => 'required|integer',
            'license_plate'     => 'required|max:10|unique:product',
            'engine_capacity'   => 'required|integer',
            'color'             => 'required|max:30',
            'price'             => 'required|numeric|gte:0|lte:100000',
            'mileage'           => 'required|integer',
            'fuel_type'         => 'required|max:20',
            'transmission_type' => 'required|max:20',
            'is_new'            => 'required|boolean',
            'description'       => 'nullable|string',
        ]);
        if ($validator->passes()) {
            $message = '';
            $object = new Product($request->all());
            try {
                $result = $object->save();
                $products = Product::orderBy('id')->paginate(5)->setPath(url('product'));
            } catch(\Exception $e) {
                $result = false;
                $message = $e->getMessage();
            }
        } else {
            $result = false;
            $message = $validator->getMessageBag();
        }
        return response()->json(['result' => $result, 'message' => $message, 'products' => $products]);
    }

    public function show($id) {
        $product = Product::find($id);
        $message = '';
        if($product === null) {
            $message = 'Product not found.';
        }
        return response()->json([
            'message' => $message,
            'product' => $product
        ]);
    }

    public function update(Request $request, $id) {
        $message = '';
        $product = Product::find($id);
        $products = [];
        $result = false;
        if($product != null) {
            $validator = Validator::make($request->all(), [
                'brand'             => 'required|max:50',
                'model'             => 'required|max:100',
                'year'              => 'required|integer',
                'license_plate'     => 'required|max:10|unique:product,license_plate,' . $product->id,
                'engine_capacity'   => 'required|integer',
                'color'             => 'required|max:30',
                'price'             => 'required|numeric|gte:0|lte:100000',
                'mileage'           => 'required|integer',
                'fuel_type'         => 'required|max:20',
                'transmission_type' => 'required|max:20',
                'is_new'            => 'required|boolean',
                'description'       => 'nullable|string',
            ]);
            if($validator->passes()) {
                try {
                    $result = $product->update($request->all());
                    $products = Product::orderBy('id')->paginate(5)->setPath(url('product'));
                } catch(\Exception $e) {
                    $message = $e->getMessage();
                }
            } else {
                $message = $validator->getMessageBag();
            }
        } else {
            $message = 'Product not found';
        }
        return response()->json(['result' => $result, 'message' => $message, 'products' => $products]);
    }

    public function destroy(Request $request, $id) {
        $message = '';
        $products = [];
        $product = Product::find($id);
        $result = false;
        if($product != null) {
            try {
                $result = $product->delete();
                $products = Product::orderBy('id')->paginate(5)->setPath(url('product'));
                if($products->isEmpty()) {
                    $page = $products->lastPage();
                    $products = Product::orderBy('brand')->paginate(10, ['*'], 'page', $page)->setPath(url('product'));
                }
            } catch(\Exception $e) {
                $message = $e->getMessage();
            }
        } else {
            $message = 'Product not found';
        }
        return response()->json([
            'message' => $message,
            'products' => $products,
            'result' => $result
        ]);
    }
}
