<?php 
namespace App\TimeSheet;
use Carbon\Carbon;
use App\timesheet_project_personal;
trait  TProject_personal_TimeSheet  {

    public function TProject_personal_TimeSheet($attendance , $numbers_util_now =null , $time){

        if($attendance['project_id'] !== null){

            $timesheet_project_personal =     timesheet_project_personal::
            
            where(['project_id'=>$attendance['project_id'],

            'user_id'=>auth()->user()->id,

            'date'=>Carbon::now()->startOfMonth()])->first();
          
            if($timesheet_project_personal){
           
                $timesheet_project_personal->increment(
             
                'time',$time
              );
       
       
            }else{
           
                $timesheet_project_personal =     timesheet_project_personal::create([
               
                'project_id'=>$attendance['project_id'],
                
                'user_id'=>$attendance['user_id'],
             
             
                'date'=>Carbon::now()->startOfMonth(),
            
           
              'time'=>$time
              
              ]
              
              );
            
            }
          
            
          }


    }

}