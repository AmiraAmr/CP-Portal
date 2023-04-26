<?php 
namespace App\TimeSheet;
use App\personal_overall;
use Carbon\Carbon;
trait Tmonthly_personal  {

    public function Tmonthly_personal($attendance , $numbers_util_now=null , $time){

      
  $timesheet_monthly_personal =     personal_overall::where(['user_id'=>$attendance['user_id'],
  'date'=>Carbon::now()->startOfMonth(),])->first();
 
$increment = 1  / $numbers_util_now * 100;

  if($timesheet_monthly_personal){
    $timesheet_monthly_personal->increment(
      'num_of_attendance',$time / 540 > 1 ? 1 : $time / 540
    );

$old =  $timesheet_monthly_personal->num_of_attendance / $numbers_util_now * 100 ;

$timesheet_monthly_personal->update([
    

  'percentage_attendance'=>($old   ),


]);


    $timesheet_monthly_personal->increment(
      'time',$time > 540 ?  540 : $time
    );

    $timesheet_monthly_personal->increment(
      'overtime',$time > 540 ? $time - 540 : 0
    );
  
  }else{
    $timesheet_monthly_personal =     personal_overall::create([
      'user_id'=>$attendance['user_id'],
    'date'=>Carbon::now()->startOfMonth()
  ,
    'time'=>$time > 540 ?  540 : $time,
    'overtime'=>$time > 540 ? $time - 540 : 0,
    'num_of_performers'=>0,
    'num_of_attendance'=>$time / 540 > 1 ? 1 : $time / 540,
    'marketing_project'=>0,
    'percentage_performance'=>0,
    'percentage_attendance'=>$increment,
'percentage_section'=>0,
'cost_reduction'=>0,
'marketing'=>0
    ]
    
    );
  

        
  }
        
            

    }

}