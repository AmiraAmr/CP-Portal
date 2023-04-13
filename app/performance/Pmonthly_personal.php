<?php
namespace App\performance;
use App\personal_overall;
use Carbon\Carbon;
trait Pmonthly_personal {

public function monthly_personal($user , $performance , $increment , $numbers_util_now ){


    
    if($user == null){
        $performance_monthly_personal = personal_overall::where(['date'=>Carbon::now()->startOfMonth(),'user_id'=>$user])->first();



        if($performance_monthly_personal){

            
            $performance_monthly_personal->increment('num_of_performers',1);

            $old =  $performance_monthly_personal->num_of_performers * $numbers_util_now / 100 ;
            
            $performance_monthly_personal->update([
        
        
                'percentage_performance'=>($old  ),
              
          
              ]);

            $performance_monthly_personal->increment('point',$performance);


        }else{
            personal_overall::create([
                'date'=>Carbon::now()->startOfMonth(),
                'point'=>$performance ?? 0,
                'user_id'=>$user,
                'num_of_performers'=>1,
                'num_of_attendance'=>0,
                'time'=>0,
                'marketing_project'=>0,
                'cost_reduction'=>0,
                'percentage_performance'=>$increment,
                'percentage_attendance'=>0,
                'percentage_section'=>0,
                'marketing'=>0
            ]);
        }
        
     }




}

}