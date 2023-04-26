<?php
namespace App\Classes_interface\monthly_summary_report;

trait DepartmentRate {


   public function global_rate($value , $user){

                   
         return   $this->global_calculator($value , $user->role->section->global_rate );
                
         }


protected function global_calculator($value, $department_rating){
   
    
if($value <= $department_rating && $department_rating > 0){


    return $value / $department_rating ?? 0.1  * 100 <= 
                     
    $department_rating    ?  $value / $department_rating  ?? 0.1 * 100
   
    :  $department_rating; 
   


}



}


}