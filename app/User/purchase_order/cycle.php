<?php

namespace App\User\purchase_order; 
use App\purchase_order_cycle;

trait cycle  {

    public function cycle($workflow,$model){

      
     purchase_order_cycle::create([
            'step'=>1,
            'status'=>0,
            'flowwork_step_id'=>$workflow->id,
            'role_id'=>$workflow->role_id,
            'purchase_order_id'=>$model->id
          ]);

       
    }


}