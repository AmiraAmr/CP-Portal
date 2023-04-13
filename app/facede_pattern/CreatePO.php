<?php 

namespace App\facede_pattern;
use App\Purchase_order;
use App\User\purchase_order\PInsert;
use App\User\purchase_order\PUpdate;
use App\explode\explodeRef ;
use App\getlatest\latest ;
use App\User\Email\cc;
use App\InterFace\WorkFlow\find ;
use App\InterFace\WorkFlow\steps ;

use App\User\purchase_order\PPayment;
use App\User\purchase_order\query;
use App\User\purchase_order\cycle;



use App\purchase_order_attachment;



class CreatePO {
 use find , PInsert , 
  PPayment , cc  ,query , steps , cycle ,explodeRef
 , latest ;
  




public function create($request, $payment , $users ,$type ,
 $attributes ,  $SaveFiles , $IItemManager , $rules){



    $cash = $request->cash == true ? 1 :0;
    $on_vat = $request->no_vat == true ? 1 :0;

    $data = $this->latest(new Purchase_order);

    

    $explode = $this->explodeRef($data->ref,'PO-');



$Purchase_order = $this->insert($request,$cash,$on_vat , $explode);

$attribute_table = $Purchase_order->attributes()->getTable();

 
$content   = 'user name:'.' '.auth()->user()->name ?? ''.'Project Name:'.' '.$Purchase_order->project->name ?? ''.'has been created:' .' '. $Purchase_order->ref . 'is waiting for review';
 

$this->mail($users ?? [] ,$Purchase_order,$content);



    $this->pay($payment,$Purchase_order,$cash);
  

    $workflow  =   $this->find($type);


 $this->mail($workflow->role->user,$Purchase_order,$content);
  


    

  $SaveFiles->SaveFile($request,$Purchase_order, new purchase_order_attachment,$type);




   
    $IItemManager->SaveItem($attributes,$Purchase_order, $attribute_table , $type , $rules );
    

    
  $this->cycle( $workflow ,$Purchase_order);

 



}


   
   
 


   
   




}