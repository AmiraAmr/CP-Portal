<?php
namespace App\Classes_interface\department\factory;
use App\Classes_interface\department\IDepartment;
use App\Classes_interface\monthly_summary_report\commitment;
use App\Classes_interface\monthly_summary_report\performance;
use App\Classes_interface\monthly_summary_report\attandance;
use App\Classes_interface\monthly_summary_report\cash_in;
use App\Classes_interface\monthly_summary_report\cash_out;
use App\Classes_interface\monthly_summary_report\tender;
use App\Classes_interface\monthly_summary_report\marketing;
use App\Classes_interface\department\constructionDepartment;

trait  checkDepartment {

public function checkDepartment(string $type) : IDepartment{

return match($type){
   
   'construction'=> new constructionDepartment,
  
};

}


}