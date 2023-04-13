<?php 
  namespace App\User\purchase_order\relationship;
  
  trait  attachment  {

public function purchase_order_attachment($model){

return $model->with('purchase_order_attachment');

}


 }