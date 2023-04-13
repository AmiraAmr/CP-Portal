<?php 
  namespace App\User\purchase_order\relationship;
  
  trait  attributes2  {

public function attributes2($model){

return $model->with(['attributes2' => function ($q) {

    $q->where('product_id', '=', null);
    
    },
]);

}


 }