<?php

namespace App\DailyReport; 

use  App\attributes\attributesModule;

use App\Jobs\hearing_process_attendance;
use App\Jobs\performanceJob;
use Illuminate\Foundation\Bus\Dispatchable;
use App\performance\FacadePerformance;
use App\TimeSheet\ITimeSheet;
use App\attendance\calculeteTime;
use App\attendance\CalculeteLongTerm;

class user_daily_report implements attributesModule {
use Dispatchable , FacadePerformance , ITimeSheet  , calculeteTime , CalculeteLongTerm;

    public function attributes_store($data,$model,$list,$request=null){
      $list [ ] =  [ 

        'user_id' => $data['id'],
        'attending_time' =>  $request->from ?? null,
        'attending_leaving' =>  $request->to ?? null,
        'performance' => $data['performance'],
        'commitment' => $data['commitment'],
        'daily_report_id' => $model->id,

      ];


    

   


$this->Performance($data['id'] , 

$data['performance'],

$request->project_id ,

null);





      $time =    $this->calculeteTime($request->from , $request->to);
      

      $CalculeteLongTerm = $this->CalculeteLongTerm()  <= 0 ? 1 : $this->CalculeteLongTerm()  * 10;

    ;

   



     $timesheet_data = [ 

        'user_id' => $data['id'],
        'attending_time' =>  $request->from ?? null,
        'attending_leaving' =>  $request->to ?? null,
        'performance' => $data['performance'],
        'commitment' => $data['commitment'],
        'daily_report_id' => $model->id,
'project_id'=>$request->project_id
      ];

        $this->TimeSheet($timesheet_data , $CalculeteLongTerm , $time);



        return $list;
 
  
}

}
?>