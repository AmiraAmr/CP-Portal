<?php 
namespace App\performance;
use App\performance_project_personal;
use Carbon\Carbon;
trait Pperformance_project_personal{

public function performance_project_personal($performance , $project , $user ){

    if($project == null && $user){
        $performance_project_personal = performance_project_personal::where(['date'=>Carbon::now()->startOfMonth(),'project_id'=>$project,'user_id'=>$user])->first();
    
        if($performance_project_personal){
            $performance_project_personal->increment('point',$performance);
        }else{
            performance_project_personal::create([
                'date'=>Carbon::now()->startOfMonth(),
                'point'=>$performance ?? 0,
                'project_id'=>$project,
                'user_id'=>$user
            ]);
        }
        
     }

}

}