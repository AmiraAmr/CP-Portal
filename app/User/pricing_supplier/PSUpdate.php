<?php

namespace App\User\pricing_supplier; 

trait PSUpdate {

public function update($model,$request){

  return  $model->update([
        'supplier_id' => $request->supplier_id,
        'fq' => $request->fq,
        'tax' => $request->tax,
    
        'total_amount' => $request->total_amount,
        'discount' => $request->discount,
        'overall' => $request->overall,
        'pre_discount' => $request->pre_discount,
        'tax_number' => $request->tax_number,
    ]);


}





}

?>