<?php 
  namespace App\User\purchase_order\relationship;
  use App\User\relationship\user;
trait  Comment  {
use user;

 public function Comment($cycle,$user=false){


  return $cycle->with([
            
            
        'comment_purchase_order_cycle' => function ($qu) {
       
       

         $qu->with('attachment_purchase_order_cycle');
   
         $user ?  $qu = $this->user($qu) : '';


        }

  ]);



    

}

    }

    