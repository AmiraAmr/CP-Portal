<?php 
  namespace App\User\purchase_order\relationship;
  
  trait  attributes  {

public function attributes($model){

return $model->with('attributes');

}


 }