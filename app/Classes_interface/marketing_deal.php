<?php
namespace App\Classes_interface\monthly_summary_report;
use App\Classes_interface\department\factory\checkDepartment;
use App\increment\IIncrement;
class marketing_deal implements Irate , Icalculate_degree{
  use IIncrement , checkDepartment , DepartmentRate ;

public function rate($model, $value , $info , $user   ){



       // number attendess is The number of actual attendees
       $model->marketing_deal !== null ?  $model->increment(
        'marketing_deal',1
      ) : $model->update(['marketing_deal'=>1]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->percentage_deal_marketing , 
  
 // numbers_until_now is  The number of staff expected to attend
 
 $user->role()->section->percentage_deal)  ;

 $model->percentage_deal_marketing !== null ?  $model->increment(
    'percentage_deal_marketing',$increment 
  ) : $model->update(['percentage_deal_marketing'=>$increment]);



 $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 


 
 $Department ?   $Department->Department($model , $user) : '';




}



public function calculate_degree($model , $user){
   
  return  $this->global_calculator($model->percentage_deal_marketing , $user->role->section->percentage_deal );
 
}



}