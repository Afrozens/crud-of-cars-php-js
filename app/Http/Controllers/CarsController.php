<?php

namespace App\Http\Controllers;

use App\Models\Cars;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
class CarsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = auth()->user()->cars()->paginate();
        // return $cars;
        return Inertia::render("Cars/index", ["cars"=> $cars]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request-> validate([
            "make" => "required|max:50",
            "model" => "required|max:100",
            "color" => "required|max:10",
        ]);


        $car = Cars::create([
            "make" => $request->name,
            "model" => $request->model,
            "color" => $request-> color,
            "user_id" => auth()->user()->id
        ]);

        $car->save();
        return redirect("cars");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cars $cars)
    {
        $request-> validate([
            "make" => "required|max:50",
            "model" => "required|max:100",
            "color" => "required|max:10",
        ]);

        $cars->update([
            "make" => $request->make,
            "model" => $request->model,
            "color" => $request->color,
        ]);

        return redirect("cars");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cars $cars)
    {
        $cars->delete();
        return redirect("cars");
    }
}
