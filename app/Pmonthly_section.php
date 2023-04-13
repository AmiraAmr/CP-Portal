<?php
namespace App\performance;
use App\monthly_section;
use Carbon\Carbon;
trait Pmonthly_section {

 
     public function monthly_section($performance , $section  , $increment , $numbers_util_now){
       
        if($section == null){
            $monthly_section = monthly_section::where(['date'=>Carbon::now()->startOfMonth(),'section_id'=>$section])->first();
    
            
            if($monthly_section){
                $monthly_section->increment('num_of_performers',1);
               
                $old =  $monthly_section->num_of_performers * $numbers_util_now / 100 ;
                
                $monthly_section->increment('point',$performance);
               
                $monthly_section->increment('percentage_performance',$old );
               
           
    
            }else{
                monthly_section::create([
                    'date'=>Carbon::now()->startOfMonth(),
                   
                    'point'=>$performance ?? 0,
                   
                    'section_id'=>$section,
                   
                    'percentage_attendance'=>0,
                   
                    'num_of_attendance'=>0,
                   
                    'percentage_performance'=>$increment,
                   
                    'saving_percentage'=>0,
    
    
                    'marketing_project'=>0,
                    'percentage_marketing_project'=>0,
                    'percentage_deal'=>0,
                    'num_deal'=>0,
                    
    
                    'cost_reduction'=>0,
                    'num_of_performers'=>1,
                          'time'=>0
                ]);
            }
            
         }
    
     }
}