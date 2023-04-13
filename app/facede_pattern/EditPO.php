<?php 

namespace App\facede_pattern;
use App\Purchase_order;
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
 use find , PUpdate , 
  PPayment , cc  ,query , steps , cycle ,explodeRef
 , latest ;
  




public function updatePO( $Purchase_order ,$request, $payment , $users ,$type ,
 $attributes ,  $SaveFiles , $IItemManager , $rules){



  if ($Purchase_order->total !== null) {

    $this->ReportDecrement($Purchase_order->date,$Purchase_order->total);
    
     $this->ProjectDecrement($Purchase_order->project,['po_expenses'=> $Purchase_order->total]);
    
    
                        
                  
                    }


  $deletePO = new DeletePO;


  $deletePO->deleteAttributes($request,$Purchase_order);



$Purchase_order = $this->update($request,$Purchase_order);



$attribute_table = $Purchase_order->attributes()->getTable();

 
$content = 'request has been modified' . '' . $Purchase_order->ref;
          

//$this->mail($users ?? [] ,$Purchase_order,$content);



    $this->pay($payment,$Purchase_order,$cash);
  

    $workflow  =   $this->find($type);


 // $this->mail($workflow->role->user,$Purchase_order,$content);
  


  $SaveFiles->SaveFile($request,$Purchase_order, new purchase_order_attachment,$type);


 $IItemManager->SaveItem($attributes,$Purchase_order, $attribute_table , $type , $rules );
    

    
  $this->cycle( $workflow ,$Purchase_order);

 



}


   
   
 


   
   




}