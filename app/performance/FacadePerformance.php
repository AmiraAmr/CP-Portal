<?php 

namespace App\performance;
use App\increment\IIncrement;
trait  FacadePerformance {
use Pmonthly_personal , Pmonthly_section , 
Pperformance_project_personal 
, Pperformance_section_personal 
, Pproject_overall , IIncrement;


    public function Performance($user , 

    $performance,
    
    $project ,
    
     $section){

        

$days_without_weekends = $this->CalculeteLongTerm();
  

$numbers_util_now = 1  * $days_without_weekends * 10;
   

 $increment =    $this->IIncrement($performance , $numbers_util_now ) ;


$this->project_overall($performance , $project , $increment , $numbers_util_now);


$this->monthly_personal( $user , $performance , $increment , $numbers_util_now );


 // $this->monthly_section($performance , $section  , $increment , $numbers_util_now);


$this->performance_project_personal($performance , $project , $user );


$this->performance_section_personal($user  , $section ,  $performance );


    }


}