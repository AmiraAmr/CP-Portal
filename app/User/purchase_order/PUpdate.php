<?php

namespace App\User\purchase_order; 

use App\Purchase_order;


trait PUpdate {

public function update($model,$request){

    $cash = $request->cash == true ? 1 :0;
    $on_vat = $request->no_vat == true ? 1 :0;


    $cash = $request->cash == true ? 1 : 0;
    $on_vat = $request->no_vat == true ? 1 : 0;
    
    $model->update([

        'project_id' => $request['project_id'],
        'date' => $request['date'],
        'subject' => $request['subject'],
        'material_avalibility' => $request['material_avalibility'],
        'transportation' => $request['transportation'],
        'delivery_date' => $request['delivery_date'],
        'status' => 0,
        'on_vat' => $on_vat,
        'cash' => $cash,
        'total' => $request->overall,
        'vat' => $request->vat,
        'percentage_discount' => $request->percentage_discount,
        'discount' => $request->discount,
        'subtotal' => $request->total,
        'ref' => $request->ref,
        'supplier_id' => $request->supplier_id,
        'order_for' => $request->order_for,

    ]);



}





}

?>