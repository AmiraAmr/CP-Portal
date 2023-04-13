<?php 

namespace App\User\relationship;

    trait User  {


public function user($model){

 return  $model->with('user');

}



    }