<?php
namespace App\performance;
use App\performance_section_personal;
use Carbon\Carbon;
trait Pperformance_section_personal {


    public function performance_section_personal($user  , $section ,  $performance ){

        if($section == null && $user){

            $performance_section_personal = performance_section_personal::where(['date'=>Carbon::now()->startOfMonth(),'section_id'=>$section,'user_id'=>$user])->first();
            
            if($performance_section_personal){
                $performance_section_personal->increment('point',$performance);
            }else{
                performance_section_personal::create([
                    'date'=>Carbon::now()->startOfMonth(),
                    'point'=>$performance ?? 0,
                    'section_id'=>$section,
                    'user_id'=>$user
                ]);
            }
            
            }

        }
    }
