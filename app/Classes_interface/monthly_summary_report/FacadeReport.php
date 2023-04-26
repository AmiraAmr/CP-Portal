<?php
namespace App\Classes_interface\monthly_summary_report;
use App\Classes_interface\monthly_summary_report\factory\RateFactory;
use App\summaryreoprt;

trait FacadeReport {
use Eloquent , RateFactory ;
public function FacadeReport($value=1 , $type , $user  ){

$summaryreoprt =  summaryreoprt::first();

$Irate = $this->RateFactory_type($type);

$Irate->rate($this->Eloquent_monthly_report() ,  $value , $summaryreoprt , $user );
   


}



}