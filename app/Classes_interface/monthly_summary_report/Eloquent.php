<?php
namespace App\Classes_interface\monthly_summary_report;
use Carbon\Carbon;
use App\monthly_summary_report;

trait Eloquent {

    public function Eloquent_monthly_report($request=null){

$data = monthly_summary_report::where('date',Carbon::now()->startOfMonth())->first();

if(empty($data)){

  $data =  monthly_summary_report::create(['date'=> Carbon::now()->startOfMonth()]);
   

}

return $data;

    }

}