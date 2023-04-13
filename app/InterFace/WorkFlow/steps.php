<?php 

namespace App\InterFace\WorkFlow;
use App\workflow;
trait   steps  {

public function steps($type){
    return   workflow::where('name', $type)->with(['flowworkStep' => function ($q) {
        return     $q->with('role');
    }])->first();

}


}