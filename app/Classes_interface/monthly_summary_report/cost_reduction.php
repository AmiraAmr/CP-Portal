<?php
namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
class cost_reduction implements Irate , Icalculate_degree , I_report_query {
    use DepartmentRate , IIncrement;


    public function rate( $model , $value , $info  , $user ){

      
     $model->cost_reduction !== null ?  $model->increment(
        'cost_reduction',$value
      ) : $model->update(['cost_reduction'=>$value]);
        
    
    
    
      $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 
     
     
      $Department ?   $Department->Department($model , $user) : '';
    
    
    }

    public function calculate_degree($model , $user){

return  $this->global_calculator($model->cost_reduction , $user->role->section->cost_reduction );

    }

}