<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\pricing_supplier;
use App\product;
use App\Exceptions\CustomException;
use App\term;
use App\supplier;
use DB;

use Validator;

use Carbon\Carbon;
use App\pricing_supplier_cycle;
use App\pricing_supplier_attachment;
use App\Jobs\rolecc;
use App\pricing_supplier_product;
use App\Jobs\sendcc;
use App\InterFace\WorkFlow\find ;
use App\InterFace\WorkFlow\steps ;
use Inertia\Inertia;
use App\explode\explodeRef ;
use App\getlatest\latest ;
use App\User\pricing_supplier\query;
use App\User\pricing_supplier\PSInsert;
use App\User\pricing_supplier\PSItem;
use App\User\pricing_supplier\PSPayment;
use App\User\pricing_supplier\PSUpdate;
use App\Supplier\SupplierSelectBox;
class pricing_supplierController extends Controller 

{
    use steps,find ,SupplierSelectBox, PSUpdate , explodeRef ,latest , query , PSInsert , PSItem ;

    public function __construct()
    {
       $this->type = 'pricing_supplier';
    }


    public function index()
    {
        $pricing_supplierworkflow =   $this->steps($this->type);

        $pricing_supplier =  $this->Qindex();


        return Inertia::render('User/PricingSupplier/Index', ['data' => $pricing_supplier, 'workflow' => $pricing_supplierworkflow]);
    }




    public function getricingdetails($pricing_supplier)
    {

        if (is_numeric($pricing_supplier)) {

            $data = $this->details($pricing_supplier);

            return response()->json(['data' => $data]);
        }
    }

    public function pricing_suppliersAutoComplete(request $request)
    {
        $this->validate($request, [
            'ref' => ['required', 'string', 'max:255']
        ]);

        $pricing_supplier = pricing_supplier::where('ref', 'LIKE', '%' . $request->ref . '%')
            ->where('status', 1)

            ->SELECT(['ref', 'id', 'status'])->get()->take(5);

        return response()->json(['data' => $pricing_supplier]);
    }

    public function preview2(request  $request)
    {


        return view('pricing_supplier.previewdef');
    }


    public function preview($pricing_supplier)
    {

        $data = $this->Qpreview($pricing_supplier);

        if (!empty($data)) {
            return Inertia::render('User/PricingSupplier/Preview', ['data' => $data]);
        }
    }

    public function create()
    {


        $data = $this->latest(new pricing_supplier);

        $explode = $this->explodeRef($data->ref,'PS-');


        $pr = $this->SupplierSelectBox();
        return Inertia::render('User/PricingSupplier/Create', ['reference' => 'PS-' . '' . $explode[1] + 1, 'suppliers' => $pr]);
    }


    public function insert(request $request)
    {

        $data =  $this->validate($request, [

            'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],

            'ref' => ['string', 'max:255'],

            'supplier_id' => ['required', 'numeric'],

        ]);

        try {

            DB::transaction(function () use ($request, $data) {
                $cash = $request->cash == true ? 1 : 0;
                $on_vat = $request->no_vat == true ? 1 : 0;

                $data = $this->latest(new pricing_supplier);

        

                $explode = $this->explodeRef($data->ref,'PS-');


        $pricing_supplier =   $this->Insert($request,$cash ,$on_vat,$explode);


                $payment = json_decode($request->payment, true);


    
              $this->payment($payment,$cash);


                $attributes = json_decode($request->attr, true);


          $this->add($attributes,$pricing_supplier);


                $workflow = $this->find($this->type);


                  $this->mail($workflow->role->user,$pricing_supplier,$content);


                pricing_supplier_cycle::create([
                    'step' => 1,
                    'status' => 0,
                    'flowwork_step_id' => $workflow->id,
                    'role_id' => $workflow->role_id,
                    'pricing_supplier_id' => $pricing_supplier->id
                ]);
                return redirect()->route('pricing_supplierindex', ['message' => 'Created successfully']);
            });
        } catch (Exception $e) {
            return $e;
        }
    }



    public function update(request $request, pricing_supplier $pricing_supplier)
    {

        $data =  $this->validate($request, [

            'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],

            'ref' => ['string', 'max:255'],

            'supplier_id' => ['required', 'numeric'],

        ]);
      




        if ($request->deletedfiles) {
            pricing_supplier_attachment::find($request->deletedfiles)->delete();
        }



 $pricing_supplier = $this->update($pricing_supplier,$request);




        $payment = json_decode($request->payment, true);

        $a = [];

        if (!empty($update->note())) {
        
                $pricing_supplier->note->delete();
            
        }


        $this->pay($payment,$pricing_supplier,$cash);
  

        $product = json_decode($request->product, true);

        if (!empty($update->attributes())) {
            $update->attributes()->detach();
        }

        if (!empty($update->attributes2())) {
            $update->attributes2()->delete();
        }


        $attributes = json_decode($request->attr, true);



        $this->add($attributes,$pricing_supplier);

        
        return redirect()->route('pricing_supplierindex', ['message' => 'Modified successfully']);
    }




    public function pricing_supplierjson()
    {

        $pricing_supplier = $this->Qindex();

        return response()->json(['data' => $pricing_supplier]);
    }




    public function delete($ids)
    {
        pricing_supplier::whereIn('id', explode(",", $ids))->delete();
    }





    public function pricing_supplierselect(request $request)
    {

        $data =   pricing_supplier::where('code', $request->code)

            ->get()->take(6);


        return response()->json(['data' => $data]);
    }



    public function edit($pricing_supplier)
    {
        if (is_numeric($pricing_supplier)) {
       
      $data =      $this->Qupdate($pricing_supplier);

            if (!empty($data)) {
                $suppliers = $this->supplier();
                return Inertia::render('User/PricingSupplier/Edit', ['data' => $data, 'suppliers' => $suppliers]);
                return view('pricing_supplier.update')->with(['data' => $data]);
            }
        }
    }
}
