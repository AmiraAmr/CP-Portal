<?php
namespace App\Classes_interface\monthly_summary_report;

class HR implements I_report_query  {
    
use Filter;

    public function query_monthly_report($request=null , $model){

$model =  $model->select(['id','date', 'HR']);

$model = $this->query_Filter($request,$model);

return $model->get();


    }


}