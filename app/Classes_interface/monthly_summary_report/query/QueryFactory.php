<?php
namespace App\Classes_interface\monthly_summary_report\query;
use App\Classes_interface\monthly_summary_report\query\I_report_query;
use  App\Classes_interface\monthly_summary_report\query\attendance;
use App\Classes_interface\monthly_summary_report\query\performance;
use App\Classes_interface\monthly_summary_report\query\attandance;
use App\Classes_interface\monthly_summary_report\query\cash_in;
use App\Classes_interface\monthly_summary_report\query\cash_out;
use App\Classes_interface\monthly_summary_report\query\tender;
use App\Classes_interface\monthly_summary_report\query\marketing;
use App\Classes_interface\monthly_summary_report\query\construction;
use App\Classes_interface\monthly_summary_report\query\company;

trait  QueryFactory {

public function QueryFactory_type(string $type) : I_report_query{
  
   return match($type){

   'commitment'=> new commitment,
   'performance'=> new performance,
   'attandance'=>new attandance,
   'cash_in'=> new cash_in,
   'cash_out'=>new cash_out,
   'tender'=>new tender,
   'marketing'=>new marketing,
   'construction'=>new construction,
   'company'=> new company,
   'procurement'=>new procurement,
   'tender'=>new tender,
   'financial'=> new financial,
   'HR'=> new HR,
};

}


}