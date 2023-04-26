<?php
namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
use App\Classes_interface\department\factory\checkDepartment;
class cash_in implements Irate  , I_report_query , Icalculate_degree {
use IIncrement , checkDepartment , DepartmentRate , Filter;
public function rate($model, $value , $info  , $user ){


    
    $model->cash_in !== null ?  $model->increment(
        'cash_in',$value
      ) : $model->update(['cash_in'=>$value]);
    
 // increment calculate percentage 
 $increment   =   $this->IIncrement($model->cash_in,$model->bid_value);

 $model->cash_in_percentage !== null ?  $model->increment(
    'cash_in_percentage',$increment 
  ) : $model->update(['cash_in_percentage'=>$increment]);



 $Department = $user->role->section ? $this->checkDepartment($user->role->section->name) : ''; 


 
 $Department ?   $Department->Department($model , $user) : '';



    
}





public function calculate_degree($model , $user){

  return $this->global_calculator($model->percentage_cash_in ?? 0 , $user->role->section->percentage_cash_in ) ;
    
  
    }


    public function query_monthly_report($request=null , $model){

      $model =  $model->select(['id','date', 'cash_out_percentage']);
      
      $model = $this->query_Filter($request,$model);
      
      return $model->get();
      
      
          }


}