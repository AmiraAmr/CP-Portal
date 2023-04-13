<?php 

namespace App\User\purchase_order\relationship;
use App\User\relationship\user;
use App\Project\relationship\projectRelation;
use App\User\purchase_order\POFilter;
    class NEmployeeCycle    implements CycleManagment   {

use Comment , user , attributes ,attributes2 , attachment  , projectRelation , payment ;

   public function Cycle($model,$request=null , $comment=false , $user=false  , $attributes=false , $attributes2=false , $attachment = false , $project=true  , $payment=true ){
 


 $model =  $model->with(['purchase_order_cycle' => function ($q , $comment =false ) {


    
   $comment ?   $this->Comment($q , $user) : '' ;

  $q->with('role') ;


    } 
    
    ]) ;



    $project ? $this->project($model) : '';

$user ? $this->user($model) : '';

 $attributes  ? $this->attributes($model) : '';

 $attributes2 ? $this->attributes2($model) : '';

 $attachment  ?  $this->purchase_order_attachment($model) : '';

$payment ? $this->note($model) : '';




$POFilter = new POFilter;
 
  return $POFilter->POFilter($request,$model);

    
    
    }

}