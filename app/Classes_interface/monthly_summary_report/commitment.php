<?php

namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
use App\Classes_interface\numbers_until_now;
use App\Classes_interface\department\factory\checkDepartment;
use App\Classes_interface\monthly_summary_report\DepartmentRate;
use App\Classes_interface\monthly_summary_report\Irate;
use App\Classes_interface\monthly_summary_report\Icalculate_degree;

class commitment implements Irate , Icalculate_degree , I_report_query{

use IIncrement , numbers_until_now ,DepartmentRate , checkDepartment;

public function rate( $model , $value , $info  , $user ){

    // number attendess is The number of actual attendees
    $model->commitment_point !== null ?  $model->increment(
        'commitment_point',$value
      ) : $model->update(['commitment_point'=>$value]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->commitment_point , 

 // numbers_until_now is  The number of staff expected to attend
 
 $this->numbers_until_now($info->employee) , 10   )  ;

 $model->commitment_percentage !== null ?  $model->increment(
    'commitment_percentage',$increment 
  ) : $model->update(['commitment_percentage'=>$increment]);
    



  $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 
 
 
  $Department ?   $Department->Department($model , $user) : '';


}

  public function calculate_degree($model , $user){

return $this->global_calculator($model->commitment_percentage ?? 0 , $user->role->section->commitment_percentage ) ;
  

  }



  public function query_monthly_report($request=null , $model){


    $model =  $model->select(['id','date', 'commitment_percentage']);
    
    $model = $this->query_Filter($request,$model);
    
    return $model->get();
    
  }
    
}