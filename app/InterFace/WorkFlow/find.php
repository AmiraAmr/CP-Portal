<?php 

namespace App\InterFace\WorkFlow;
use App\workflow;
trait   find  {

public function find($type, $step=null){

         $workflow = workflow::where(['name' => $type])->first()->flowworkStep();
        
        if($step){
                $workflow =    $workflow->where(['step' => $step]);
        }
      
    return      $workflow->with(['role'=>function($role){
                $role->with('user');
        }])
        ->first();


        
     }



     



}