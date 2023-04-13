<?php

namespace App\User\purchase_order; 
use App\purchase_order_product;
use App\Purchase_order;
use Carbon\Carbon;

trait PInsert {

public function insert($request ,$cash, $on_vat , $explode){

$Purchase_order = Purchase_order::create([
  
    'project_id'=>$request['project_id'],
    'date'=>$request['date'],
'subject'=>$request['subject'],
 'draft'=>0,
   'user_id'=>auth()->user()->id,
  'transportation'=>$request['transportation'],
 'delivery_date'=>$request['delivery_date'],
   'status'=>0,
   'on_vat'=>$on_vat,
   'cash'=>$cash ,
   'total'=>$request->overall,
   'vat'=>$request->vat,
   'percentage_discount'=>$request->percentage_discount,
   'discount'=>$request->discount,
'subtotal'=>$request->total,
'ref' =>  'PO-' . '' . $explode[1] + 1,
    'supplier_id'=>$request->supplier_id,
    'order_for'=>$request->order_for,
]);


return $Purchase_order;

}





}

?>