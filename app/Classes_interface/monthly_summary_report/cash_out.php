<?php
namespace App\Classes_interface\monthly_summary_report;
use App\increment\IIncrement;
use App\Classes_interface\department\factory\checkDepartment;

class cash_out implements Irate , Icalculate_degree  , I_report_query {
use IIncrement , checkDepartment , DepartmentRate , Filter;
public function rate($model, $value , $info  , $user ){

     
    $model->cash_out !== null ?  $model->increment(
            'cash_out',$value
          ) : $model->update(['cash_out'=>$value]);
        


     // increment calculate percentage 
     $increment   =   $this->IIncrement($model->cash_out,$model->cash_in  )  ;
    
     $model->cash_flow_percentage !== null ?  $model->increment(
        'cash_flow_percentage',$increment 
      ) : $model->update(['cash_flow_percentage'=>$increment]);
    
    

     $Department = !empty($user->role->section) ? $this->checkDepartment($user->role->section->name) : ''; 
    
     
   $Department ?   $Department->Department($model , $user) : '';



}



  public function calculate_degree($model , $user){

      $value = $this->IIncrement($model->cash_out - $model->cash_in , $model->cash_in ?? 1  )  / $user->role->section->when_cash_flow  * 100 ;
      
      
      if($value >= $user->role->section->when_cash_flow &&   $user->role->section->when_cash_flow > 0 ){

                  return  $this->global_calculator($value , $user->role->section->percentage_cash_flow );
                  
      }     



    }


    public function query_monthly_report($request=null , $model){


      $model =  $model->select(['id','date', 'cash_out_percentage']);
      
      $model = $this->query_Filter($request,$model);
      
      return $model->get();
      
      
          }
      

          
}