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
use App\User;
use App\Classes_interface\monthly_summary_report\FacadeReport;
class user_daily_report implements attributesModule {
use Dispatchable , FacadePerformance , ITimeSheet , FacadeReport  , calculeteTime , CalculeteLongTerm;

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
      

      $CalculeteLongTerm = $this->CalculeteLongTerm();

   



     $timesheet_data = [ 

        'user_id' => $data['id'],
        'attending_time' =>  $request->from ?? null,
        'attending_leaving' =>  $request->to ?? null,
        'performance' => $data['performance'],
        'commitment' => $data['commitment'],
        'daily_report_id' => $model->id,
    
'project_id'=>$request->project_id
      ];

$user =  User::find($data['id']);

    $this->FacadeReport($data['commitment'] , 'commitment' ,$user);

    $this->FacadeReport($data['performance'] , 'performance' ,$user);


        $this->TimeSheet($timesheet_data , $CalculeteLongTerm , $time);



        return $list;
 
  
}

}
?>