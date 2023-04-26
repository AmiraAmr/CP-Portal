<?php

namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
use App\Classes_interface\numbers_until_now;

use App\Classes_interface\department\factory\checkDepartment;
class attendance implements Irate , Icalculate_degree , I_report_query {
use IIncrement , numbers_until_now , DepartmentRate  ,  Filter ;
public function rate( $model , $value , $info , $user   ){

    // number attendess is The number of actual attendees
    $model->number_attendees !== null ?  $model->increment(
        'number_attendees',1
      ) : $model->update(['number_attendees'=>1]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->number_attendees , 

 // numbers_until_now is  The number of staff expected to attend
 
 $this->numbers_until_now($info->employee)   )  ;

 $model->number_attendees !== null ?  $model->increment(
    'attendance_percentage',$increment 
  ) : $model->update(['attendance_percentage'=>$increment]);


  $checkDepartment = new checkDepartment;


 $Department = $user->role->section ? $checkDepartment->checkDepartment($user->role->section->name) : ''; 


 
 $Department ?   $Department->Department($model , $user) : '';


}


  public function calculate_degree($model , $user){

return $this->global_calculator($model->attendance_percentage ?? 0 , $user->role->section->percentage_attendance ) ;
  

  }


  public function query_monthly_report($request=null , $model){

    $model =  $model->select(['id','date', 'attendance_percentage']);
    
    $model = $this->query_Filter($request,$model);
    
    return $model->get();
    
    
        }
  

}