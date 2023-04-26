<?php 
namespace App\Classes_interface\department;

trait percentage_overall {

public function percentage_overall($model , $global_old , $global){

  //  percentage_overall decrement   the old rate 
  $model->percentage_overall !== null ?  $model->decrement(
    'percentage_overall',$global_old
  ) : '';


       //  percentage_overall increment  rate 
$model->percentage_overall !== null ?  $model->increment(
  'percentage_overall',$global
) : '';

}


}