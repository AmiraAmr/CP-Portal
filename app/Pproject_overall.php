<?php
namespace App\performance;
use App\project_overall;
use Carbon\Carbon;
trait Pproject_overall {


    public function project_overall($performance , $project , $increment  , $numbers_util_now ){
      
        
        if($project == null){

    
            $project_overall = project_overall::where(['date'=>Carbon::now()->startOfMonth(),'project_id'=>$project])->first();
    
    if($project_overall){

        $project_overall->increment(
            'num_of_performers',1
               );

        $old =  $project_overall->num_of_performers * $numbers_util_now / 100 ;
                
        $project_overall->update([
    
    
            'percentage_performance'=>($old    ),
          
      
          ]);
       
               $project_overall->increment(
                'performance_point',$performance
                   );
    
               
    
    }else{
        project_overall::create([
            'date'=>Carbon::now()->startOfMonth(),
            'percentage_performance'=>( $increment ),
            'cash_out'=>0,
            'cash_in'=>0,
            'date'=>Carbon::now()->startOfMonth(),
            'project_id'=>$project,
            'num_of_performers'=>1,
            'num_of_attendance'=>0,
    'time_attendance'=>0,
    
            'percentage_attendance'=>0
        ]);
    }
    
    
          
            
         }
    
    

         
    }

}