<?php

namespace App\User\purchase_order; 

use  App\attributes\attributesModule;


class attributes_store_po implements attributesModule {



    public function attributes_store($data,$model,$list,  $request=null){

      $list[] = [

        'product_id'=> $data['id'] ,
           'qty'=>$data['qty'],
            'unit'=>$data['unit'],
             'unit_price'=>$data['unit_price'],
            'total'=>$data['total'] ?? 0,
            'purchase_order_id'=>$model->id,
        ];
 
        return $list;
 
    

         /*
   $job = (new update_pervious_value($attr['unit_price'] , $attr['id'] ?? null   ,  auth()->user()->id, $attr['value']  ?? 0 
   ,auth()->user()->role && auth()->user()->role->section_id !== null ? auth()->user()->role->section_id : null
   
   ))->delay(Carbon::now()->addSeconds(90));
  */

            
       
}

}
?>