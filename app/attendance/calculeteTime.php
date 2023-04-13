<?php
namespace App\attendance;
use DatePeriod;
use DateInterval;
use DateTime;
use \Carbon\Carbon;

trait calculeteTime {

    public function calculeteTime($from, $to=null){


      
        $startTime = Carbon::createFromFormat('Y-m-d H:i:s',$from);
       
     
        $endTime =   $to ??   Carbon::now()->timezone('Asia/Riyadh');
       
       
        $endTime = Carbon::createFromFormat('Y-m-d H:i:s',$endTime)->timezone('Asia/Riyadh');


        return    $totalDuration =  $startTime->diffInMinutes($endTime);


    }


}