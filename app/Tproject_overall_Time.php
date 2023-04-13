<?php 
namespace App\TimeSheet;
use App\increment\IIncrement;
use Carbon\Carbon;
use App\project_overall;
trait   Tproject_overall_Time  {
use IIncrement;
    public function Tproject_overall_Time($attendance , $numbers_util_now=null , $time){


        if($attendance['project_id'] !== null){


            $number = project::find($attendance['project_id'])->user()->count(); # this test  number of workers 
            
            
            $project_overall = project_overall::where(['date'=>Carbon::now()->startOfMonth(),'project_id'=>$attendance['project_id']])->first();
            
          
            $increment =  $this->IIncrement(1,$numbers_util_now);

              if($project_overall){
                
                $project_overall->increment('num_of_attendance',1);
                
            $old =   $this->IIncrement($project_overall->num_of_attendance,$numbers_util_now)  ;
            
            
                    $project_overall->update([
                
                
                        'percentage_attendance'=>($old   ),
                      
                  
                      ]);
                
     
                
                
            
              
              }else{
             
                    project_overall::create([
                        'date'=>Carbon::now()->startOfMonth(),
                        'percentage_performance'=>0,
                        'cash_out'=>0,
                        'percentage_attendance'=>($increment ),
                        'cash_in'=>0,
                        'num_of_performers'=>0,
                        'num_of_attendance'=>1,
                        'performance_point'=>0,
                        'time_attendance'=>$time,
                     'cost_reduction'=>0,
                        'project_id'=>$attendance['project_id'] ?? null
                    ]);
                
                
                
            
              
              
              }
              
              
              }


    }

}