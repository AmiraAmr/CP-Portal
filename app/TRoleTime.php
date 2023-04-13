<?php 
namespace App\TimeSheet;
use Carbon\Carbon;
use App\User;
use App\timesheet_monthly_role;

trait TRoleTime {

    public function TRoleTime($attendance , $numbers_util_now=null , $time){


      $user = User::find($attendance['user_id']);
            
 if(!empty($user->role)){

    $timesheet_monthly_role =     timesheet_monthly_role::where(['role_id'=>$user->role->id,'date'=>Carbon::now()->startOfMonth(),])->first();
      
    if($timesheet_monthly_role){
      $timesheet_monthly_role->increment(
        'time',$time
      );
    }else{
      $timesheet_daily_role =     timesheet_monthly_role::create([
        'role_id'=>$user->role->id,
      'date'=>Carbon::now()->startOfMonth()
    ,
      'time'=>$time
      
      ]
      
      );
    
    }
  
   }


    }

}