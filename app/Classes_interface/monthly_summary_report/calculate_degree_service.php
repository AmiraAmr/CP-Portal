<?php
namespace App\Classes_interface\monthly_summary_report;

class calculate_degree_service   {

 


    public function calculate_degree($model , $user ) {
 


 $implementions  = [
        new attendance,
        new performance,
  new cash_in,
  new cash_out,
      new Daily_Report,
      new commitment,
       new cost_reduction,
        new department_reaction,
          new tender_deal ,
           new tender_project,
           new marketing_deal,
          new marketing_project,
       ];
    
$incerment = 0;


foreach($implementions as $implemention){
$incerment = ($implemention->calculate_degree($model , $user)    ?? 0  + $incerment) ;
}


return $incerment;

    }

}
