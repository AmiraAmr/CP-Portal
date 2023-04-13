<?php 
namespace App\TimeSheet;

use Carbon\Carbon;

use App\User;

use App\monthly_section;

trait   TSectionTimeSheet  {

    public function TSectionTimeSheet($attendance , $numbers_util_now=null , $time){

      $user = User::find($attendance['user_id']);

      if(!empty($user->role) && $user->role->section_id !== null){
 
        $number = $user->role->section()->count();
       
        $numbers_util_now = $number  * $numbers_util_now;


      $increment = $this->IIncrement(1,$numbers_util_now)  ;
       
      
          $monthly_section =     monthly_section::where(['section_id'=>$user->role->section_id,'date'=>Carbon::now()->startOfMonth(),])->first();
          
          if($monthly_section){
            $old =   $this->IIncrement($monthly_section->num_of_attendance,$numbers_util_now)  ;
       
            $monthly_section->increment(
              'time',$time
            );
       
            $monthly_section
            ->increment(
              'percentage_attendance',($old+$increment)
            );
       
       
            $monthly_section
            ->increment(
              'num_of_attendance',1
            );
       
       
       
          }else{
            $monthly_section =     monthly_section::create([
              'section_id'=>$user->role->section_id,
            'date'=>Carbon::now()->startOfMonth(),
          'percentage_attendance'=>$increment,
       'num_of_attendance'=>1,
       'percentage_performance'=>0,
       'saving_percentage'=>0,
       
       'marketing_project'=>0,
       'percentage_marketing_project'=>0,
       'percentage_deal'=>0,
       'num_deal'=>0,
       
       'cost_reduction'=>0,
       'num_of_performers'=>0,
            'time'=>$time
            
            ]
            
            );
          
          }
          
        }
       
        


    }

}
 
 
