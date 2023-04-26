<?php

namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
use App\Classes_interface\numbers_until_now;
use App\Classes_interface\department\factory\checkDepartment;
class performance implements Irate , Icalculate_degree{

use IIncrement , checkDepartment,numbers_until_now , DepartmentRate ;

public function rate( $model , $value , $info  , $user  ){

    // number attendess is The number of actual attendees
    $model->performance_point !== null ?  $model->increment(
        'performance_point',$value
      ) : $model->update(['performance_point'=>$value]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->performance_point , 

 // numbers_until_now is  The number of staff expected to attend
 
 $this->numbers_until_now($info->employee) , 10   )  ;

 $model->performance_percentage !== null ?  $model->increment(
    'performance_percentage',$increment 
  ) : $model->update(['performance_percentage'=>$increment]);
    



 $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 


 
 $Department ?   $Department->Department($model , $user) : '';



}



  public function calculate_degree($model , $user){

return $this->global_calculator($model->performance_percentage ?? 0 , $user->role->section->percentage_performance ) ;
  

  }


}