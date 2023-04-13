<?php 

namespace App\User\purchase_order\relationship;

    class ManagerCycle  implements CycleManagment {

      use Comment  ;

  
      public function Cycle($model,$request=null , $comment=false , $user=false  , $attributes=false , $attributes2=false , $attachment = false , $project=true , $payment=true ){
 
        $cycle = $model->Purchase_order_cycle()->orderBy('id', 'DESC');

 $comment ?  $cycle =   $this->Comment($cycle , $user) : '' ;

 $purchase_order = new purchase_order;

 $purchase_order->purchase_order($cycle , $request) ;
    
 return $cycle;

    }

}