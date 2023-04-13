<?php

namespace App\User\matrialrequest; 

use App\matrial_request_cycle;
use Illuminate\Support\Facades\Validator;

trait Mcycle {

public function cycle($step,$model,$workflow){


    matrial_request_cycle::insert([
        'step' => $step,
        'status' => 0,
        'flowwork_step_id' => $workflow->id,
        'role_id' => $workflow->role_id,
        'matrial_request_id' => $model->id
    ]);
    



}


}