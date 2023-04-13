<?php

namespace App\User\pricing_supplier; 

use App\pricing_supplier;

trait PSInsert {

    public function Insert($request,$cash,$on_vat,$explode){


        $pricing_supplier = pricing_supplier::create([
 'date' => $request['date'],
            'subject' => $request['subject'],
            'user_id' => auth()->user()->id,
            'status' => 0,
            'on_vat' => $on_vat,
            'cash' => $cash,
            'total' => $request->overall,
            'vat' => $request->vat,
  'percentage_discount' => $request->percentage_discount,
            'discount' => $request->discount,
            'subtotal' => $request->total,
            'ref' =>  'PS-' . '' . $explode[1] + 1,
            'supplier_id' => $request->supplier_id,
             'order_for' => $request->order_for,
            ]);
            

    }

}