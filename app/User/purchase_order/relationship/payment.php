<?php 
namespace App\User\purchase_order\relationship;
  trait  payment  {

public function note($model){

return $model->with('note');

}


 }