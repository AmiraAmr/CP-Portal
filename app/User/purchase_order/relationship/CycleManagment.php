<?php 
namespace App\User\purchase_order\relationship;

interface  CycleManagment {

    public function Cycle($model,$request=null , $comment=false , $user=false  , $attributes=false , $attributes2=false , $attachment = false , $project=true , $payment=true  );
 


}