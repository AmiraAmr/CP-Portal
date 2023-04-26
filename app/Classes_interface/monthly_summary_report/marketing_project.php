<?php
namespace App\Classes_interface\monthly_summary_report;
use App\Classes_interface\department\factory\checkDepartment;
use App\increment\IIncrement;
class marketing_project implements Irate  , Icalculate_degree  {
  use IIncrement , checkDepartment , DepartmentRate ;

public function rate($model, $value , $info , $user   ){



       // number attendess is The number of actual attendees
       $model->marketing_project !== null ?  $model->increment(
        'marketing_project',1
      ) : $model->update(['marketing_project'=>1]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->marketing_project , 
  
 // numbers_until_now is  The number of staff expected to attend
 
 $user->role->section->marketing_project)  ;

 $model->percentage_marketing_project !== null ?  $model->increment(
    'percentage_marketing_project',$increment 
  ) : $model->update(['percentage_marketing_project'=>$increment]);



 $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 


 
 $Department ?   $Department->Department($model , $user) : '';




}



public function calculate_degree($model , $user){
   
  return  $this->global_calculator($model->percentage_marketing_project , $user->role->section->percentage_marketing_project );
 
}



}