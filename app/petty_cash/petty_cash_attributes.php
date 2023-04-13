<?php

namespace App\petty_cash; 
use  App\attributes\attributesModule;
class petty_cash_attributes implements attributesModule {


    public function attributes_store($data,$model,$list,$request=null){

      $list[] = [
        'name' => $data['dis'],
        'qty' => $data['qty'],
        'unit' => $data['unit'] ?? null,
        'unit_price' => $data['unit_price'],
        'total' => $data['unit_price'] * $data['qty'] ?? 0,
        'petty_cash_id' => $model->id,
        ];

        return $list;
 
  
}

}
?>