<?php
namespace App\Classes_interface\monthly_summary_report\query;
use App\monthly_summary_report;

trait FacadeQuery{
use QueryFactory;
    public function query_monthly_report($type , $request){

      $monthly_summary_report =  monthly_summary_report::query();

$query =  $this->QueryFactory_type($type);

 return $query->query_monthly_report($request, $monthly_summary_report);


    }

}