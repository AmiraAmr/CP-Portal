<?php
namespace App\Classes_interface\department;
use App\increment\IIncrement;
use App\Classes_interface\monthly_summary_report\calculate_degree_service;
use App\Classes_interface\monthly_summary_report\DepartmentRate;
use App\Classes_interface\monthly_summary_report\Icalculate_degree;
class tenderDepartment    implements Idepartment{
use DepartmentRate , IIncrement , percentage_overall;

    public function Department( $model , $user ){

      $calculate_degree_service = new calculate_degree_service;

   $increment = $calculate_degree_service->calculate_degree($model , $user );


$global_old =  $this->global_rate($model->tender ?? 0.1 , $user);

//  tender decrement   the old rate 

$model->tender !== null ?  $model->decrement(
    'tender',$model->tender
  ) : '';


  $global =  $this->global_rate($increment , $user);



$this->percentage_overall($model , $global_old , $global);



$model->tender !== null ?  $model->increment(
    'tender',$increment 
  ) : $model->update(['tender'=>$increment]);


   

  
   


    }


}