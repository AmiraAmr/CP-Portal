<?php

namespace App\DailyReport; 

use  App\attributes\attributesModule;

class daily_productivity_store implements attributesModule {


    public function attributes_store($data,$model,$list,$request=null){

      $list[] = [
        'daily_report_id' => $model->id,
        'item' => $data['item'],
        'quantity' => $data['quantity'],
        'unit' => $data['unit'],
        ];

      
        return $list;
 
  
}

}
?>