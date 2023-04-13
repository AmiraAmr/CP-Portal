<?php
namespace App\attendance;
use DatePeriod;
use DateInterval;
use DateTime;
use \Carbon\Carbon;

trait CalculeteLongTerm {

    public function CalculeteLongTerm(){

        $start = new DateTime(Carbon::now()->startOfMonth());
        $end = new DateTime(Carbon::now()->format('Y-m-d'));
        
        $interval = new DateInterval('P1D');
        $daterange = new DatePeriod($start, $interval ,$end);
        
        $weekends = 0;
        foreach($daterange as $date){
            $days = $date->format('D');
            if ($days == 'Fri') { # we set friday
                $weekends++;
            }
        }

        # here we calculate the difference between the start of month and now
      $st1 = Carbon::now()->startOfMonth();
      $st2 = Carbon::now();
  

        $diff = $st2->diffInDays(Carbon::parse($st1));

#then we calculate wokring days 

 return $working_days = ($diff - $weekends  );





    }

    }
