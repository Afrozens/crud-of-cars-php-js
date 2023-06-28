<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::find(1);
        $products = $user->products;

    //    return view("products.index", compact("products"));
        return $products;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view("products.create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "name" => "required",
            "description" => "required"
        ]);

        $product = Product::create([
            "name" => $request->name,
            "description" => $request->description
        ]);

        return redirect()->route("products.index", compact("product"));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $product = auth()->user()->products()->paginate();

       return $product;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return view("products.edit", compact("product"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            "name" => "required",
            "description" => "required"
        ]);

        $product->request([
            "name" => $request->name,
            "description" => $request->description
        ]);

        return redirect()->route("products.edit", compact("product"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route("products.index");
    }
}
