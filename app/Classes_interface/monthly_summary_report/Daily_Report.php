<?php
namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
use App\Classes_interface\department\factory\checkDepartment;
use App\Classes_interface\monthly_summary_report\DepartmentRate;
use App\Classes_interface\monthly_summary_report\Irate;
use App\Classes_interface\monthly_summary_report\Icalculate_degree;
class Daily_Report implements Irate , Icalculate_degree , I_report_query{
use IIncrement , checkDepartment , DepartmentRate;
public function rate($model, $value , $info  , $user ){


    $model->daily_report !== null ?  $model->increment(
        'daily_report_number',$value
      ) : $model->update(['daily_report_number'=>$value]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->daily_report_number,$user->role->section->daily_report_number);

 $model->daily_report_percentage !== null ?  $model->increment(
    'daily_report_percentage',$increment 
  ) : $model->update(['daily_report_percentage'=>$increment]);

 $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 

 
 $Department ?   $Department->Department($model , $user) : '';


    
}




  public function calculate_degree($model , $user){

return  $this->global_calculator($model->daily_report_percentage , $user->role->section->daily_report_percentage );

  }



}