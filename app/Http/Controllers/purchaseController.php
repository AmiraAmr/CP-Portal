<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Twilio\Rest\Client;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Jobs\rolecc;

use App\Exceptions\CustomException;

use App\product;

use App\project;
use Inertia\Inertia;



use App\Supplier\SupplierSelectBox;
use App\Project\ProjectSelectBox;
use App\Project\ProjectDecrement;
use App\GeneralReport\ReportDecrement;
use App\InterFace\WorkFlow\steps;
use App\User\purchase_order\query;
use App\facede_pattern\CreatePO;
use App\Purchase_order;
use App\explode\explodeRef ;
use App\getlatest\latest ;
use App\FileManager\SaveFiles;
use App\attributes\IItemManager;

class purchaseController extends   Controller  
{

use 
 SupplierSelectBox , explodeRef ,latest ,ProjectSelectBox , ReportDecrement ,ProjectDecrement  , steps ;
   

private $SaveFiles;

private $IItemManager;
    public function __construct(SaveFiles $SaveFiles  , IItemManager $IItemManager)
    {
   
       
$this->SaveFiles = $SaveFiles;
$this->type =   'purchase_order';
$this->IItemManager = $IItemManager;



    }


    public function prepurchasereturn(request  $request)
    {

        //   if(auth()->user()->role()->permission->where('name','preview po')->first()){
            return Inertia::render('User/PurchaseOrder/Preview');
        return view('purchase.previewdef');

        //   }

    }




    public function createpurchaseorder()
    {
        // if(auth()->user()->role()->permission->where('name','create po')->first()){
        $suppliers = $this->SupplierSelectBox();

        $data = $this->latest(new Purchase_order);

        

       $explode = $this->explodeRef($data->ref,'PO-');

        $projects = $this->ProjectSelectBox(['id','name','po_expenses','po_budget']);



        return Inertia::render('User/PurchaseOrder/Create', [
            'reference' => 'PO-' . '' . $explode[1] + 1,
            'suppliers' => $suppliers,
            'projects' => $projects
        ]);
        return view('purchase.create')->with(['reference' => 'PO-' . '' . $explode[1] + 1, 'projects' => $projects, 'suppliers' => $suppliers]);


        // }

    }

 

    public function insarting_data(request $request){
        $data =  $this->validate($request,[
         
        'project_id'=>['required','numeric'],
        'date'=>['required','date','max:255'],
    'subject'=>['required','string','max:255'],
       'material_avalibility'=>['string','max:255'],
      'transportation'=>['string','max:255'],
     'delivery_date'=>['required','date','max:255'],
       'cc'=>['string','max:255'],
        'ref'=>['string','max:255'],
        
        'supplier_id'=>['required','numeric'],
        
         ]);
  
  try{
  
      DB::transaction(function () use ($request,$data) {



  $attributes = json_decode($request->attr, true);

  $payment = json_decode($request->payment, true);

  $users = json_decode($request->users, true);

$rules_attributes = [
    'qty' => array('required','numeric'),
    'unit' => array('required','string','max:255'),
    'unit_price' => array('required','numeric'),
'id' => array('required','exists:products,id')
];


$PO = new CreatePO;


$PO->create($request, $payment ,
 $users ,$this->type , $attributes 
, $this->SaveFiles , $this->IItemManager , $rules_attributes );



      });
  
  }
  catch (Exception $e) {
      return $e;
  }
  
  

  return response()->json(['succ'=>'done'],200);

  
  
     }
  
  

  

    public function update( $Purchase_order)
    {
        //    if (is_numeric($Purchase_order) && auth()->user()->role()->permission->where('name','edit po')->first()  ){
       
            $query = new query;

     
            
            $data =  $query->Qupdate($Purchase_order);


        if (!empty($data)) {
           
            $suppliers = $this->SupplierSelectBox();
           
            $projects = $this->ProjectSelectBox(['id','name','po_expenses','po_budget']);
       
            return Inertia::render('User/PurchaseOrder/Edit', [
                'data' => $data,
                'suppliers' => $suppliers,
                'projects' => $projects
            ]);

            return view('purchase.update')->with(['data' => $data]);
        }
        // }

    }


    public function action(request $request, Purchase_order $Purchase_order)
    {


        $data =  $this->validate($request, [
            'quotation' => ['string', 'max:255'],
            'project_id' => ['required', 'numeric', 'max:255'],
            'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],


            'ref' => ['string', 'max:255'],



        ]);

        try {

            DB::transaction(function () use ($request, $Purchase_order, $data) {
               
        
                $attributes = json_decode($request->attr, true);
                $payment = json_decode($request->payment, true);


    
                $rules_attributes = [
                    'qty' => array('required','numeric'),
                    'unit' => array('required','string','max:255'),
                    'unit_price' => array('required','numeric'),
                'id' => array('required','exists:products,id')
                ];
                
                
                
                $PO = new EditPO;
                
                
                $PO->edit(
                    $request, $payment ,
                 $users ,$this->type , $attributes 
             
                 , $this->SaveFiles
            
                , $this->IItemManager 
                 
                 , $rules_attributes );
                
             
                return redirect()->route('user.purchase_tablez', ['message' => 'Modified successfully']);

            });
        } catch (Exception $e) {
            return $e;
        }
    }

    public function purchasereturn( $Purchase_order)
    {
        if (is_numeric($Purchase_order)  ){

            $query = new query;

     
            $data =  $query->Qpreview($Purchase_order);


        if (!empty($data)) {
            return Inertia::render('User/PurchaseOrder/Preview', [
                'dataFromController' => $data,
            ]);
            return view('purchase.preview')->with(['data' => $data]);
        }

         }

    }


    public function index(request $request)
    {
        $purchase_orderworkflow  =  $this->steps($this->type);

        $query = new query;

        $purchase =  $query->Qindex( auth()->user()->purchase() ,  $request  );


        return Inertia::render('User/PurchaseOrder/Index', [
            'data' => $purchase,
            'workflow' => $purchase_orderworkflow
        ]);
    }

  

    public function delete(Purchase_order $Purchase_order)
    {
        if ($Purchase_order->user_id == auth()->user()->id) {
            $Purchase_order->delete();
        }
    }
}
