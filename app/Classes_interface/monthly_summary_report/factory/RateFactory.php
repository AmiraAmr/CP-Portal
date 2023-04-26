<?php
namespace App\Classes_interface\monthly_summary_report\factory;
use App\Classes_interface\monthly_summary_report\Irate;
use  App\Classes_interface\monthly_summary_report\commitment;
use App\Classes_interface\monthly_summary_report\performance;
use App\Classes_interface\monthly_summary_report\attandance;
use App\Classes_interface\monthly_summary_report\cash_in;
use App\Classes_interface\monthly_summary_report\cash_out;
use App\Classes_interface\monthly_summary_report\tender_project;
use App\Classes_interface\monthly_summary_report\tender_deal;
use App\Classes_interface\monthly_summary_report\marketing_project;
use App\Classes_interface\monthly_summary_report\marketing_deal;
use App\Classes_interface\monthly_summary_report\department_reaction;


trait  RateFactory {

public function RateFactory_type(string $type) : Irate{
  
   return match($type){

   'commitment'=> new commitment,
   'performance'=> new performance,
   'attandance'=>new attandance,
   'cash_in'=> new cash_in,
   'cash_out'=>new cash_out,
   'tender_project'=>new tender_project,
   'tender_deal'=>new tender_deal,
   'marketing_project'=>new marketing_project,
   'marketing_deal'=>new marketing_deal,
   'department_reaction'=>new department_reaction,
   'cost_reduction' => new cost_reduction
};

}


}