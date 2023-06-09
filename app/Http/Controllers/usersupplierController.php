<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\supplier;
use Inertia\Inertia;

class usersupplierController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }


    public function CHunking_supplier()
    {
        $data = User::select(['id', 'name'])->get()->chunk(30);
        return response()->json(['data' => $data]);
    }

    public function suppilercount()
    {

        $supplier = supplier::count();

        return response()->json(['data' => $supplier]);
    }

    public function getselectboxsupp(request $request)
    {

        $supplier =  supplier::query();


        $supplier =  $supplier->where('customer_name', 'LIKE', '%' . $request->name . '%');


        $supplier = $supplier->orwhere('comp', 'LIKE', '%' . $request->name . '%');



        $supplier =  $supplier->get()->take(3);

        return response()->json(['data' => $supplier]);
    }

    public function createpage()
    {
        return Inertia::render('User/Suppliers/Create');
        return view('supplier.create');
    }


    public function createsupp(Request $request)
    {

        $this->validate($request, [
            'personal' => ['numeric', 'digits_between:1,2'],
            'country' => ['string', 'max:255'],

            'comp' => ['string', 'max:255'],
            'customer_name' => ['string', 'max:255'],

            'tax_number' => ['string', 'max:255'],



            'postal_code' => ['string', 'max:255'],
            'building_num' => ['string', 'max:255'],
            'street_name' => ['string', 'max:255'],
            'tax_number' => ['string', 'max:255'],
            'country' => ['string', 'max:255'],
            'representative' => ['string', 'max:255'],
            'phone' => ['string', 'max:255'],
            'location' => ['string', 'max:255'],
            'city' => ['string', 'max:255'],

            'email' => ['string', 'max:255'],
        ]);


        supplier::create([
            'personal' => $request->personal,

            'customer_name' => $request->customer_name,
            'status' => 1,

            'comp' => $request->comp,
            'postal_code' => $request->postal_code,
            'building_num' => $request->building_num,
            'street_name' => $request->street_name,
            'tax_number' => $request->tax_number,
            'country' => $request->country,
            'representative' => $request->representative,
            'phone' => $request->phone,
            'location' => $request->location,
            'city' => $request->city,

            'vat' => $request->vat,
            'email' => $request->email,
        ]);

        return redirect()->route('user.suppliertable')->with("message", "Created successfully");
    }
    public function suppliertable()
    {

        $pr = supplier::latest()->paginate(10);
        return Inertia::render('User/Suppliers/Index', ['data' => $pr]);

        return view('supplier.table');
    }

    public function supplierjson()
    {

        $pr = supplier::paginate(10);
        return response()->json(['data' => $pr]);
    }

    public function supplierselex()
    {

        $pr = supplier::get()->chunk(10);
        return response()->json(['data' => $pr]);
    }


    public function delete($ids)
    {

        auth()->user()->orderpackage->supplier()->whereIn('id', explode(",", $ids))->delete();
    }

    public function updatesupp(request $request, supplier $supplier)
    {


        $this->validate($request, []);


        $supplier->update([
            'customer_name' => $request->customer_name,
            'status' => $request->status,
            'country' => $request->country,
            'comp' => $request->comp,

            'email' => $request->email,
        ]);

        return response()->json('done', 200);
    }
}
