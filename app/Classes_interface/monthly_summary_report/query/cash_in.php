<?php
namespace App\Classes_interface\monthly_summary_report\query;

class cash_in   implements I_report_query {
use Filter;

    public function query_monthly_report($request=null , $model){

$model =  $model->select(['id','date', 'cash_out_percentage']);

$model = $this->query_Filter($request,$model);

return $model->get();


    }


}