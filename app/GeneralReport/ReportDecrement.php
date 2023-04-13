<?php

namespace App\GeneralReport; 
use App\report;

trait ReportDecrement  {

public function ReportDecrement($date,$total){

    $report =   report::where('date', $date)->decrement('total_cash_out', $total);
              

}
   


}