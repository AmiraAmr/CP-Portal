<?php

namespace App\petty_cash; 
use App\petty_cash_cycle;

trait PCCycle  {

    public function cycle($workflow,$model){

        petty_cash_cycle::insert([
            'step' => $workflow->step,
            'status' => 0,
            'flowwork_step_id' => $workflow->id,
            'role_id' => $workflow->role_id,
            'petty_cash_id' => $model->id
        ]);

       
    }


}