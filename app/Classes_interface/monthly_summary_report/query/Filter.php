<?php
namespace App\Classes_interface\monthly_summary_report\query;

trait Filter{


    public function query_Filter($request=null , $model){

if($request->from){
    $model = $model->where('date','>=',$request->from);
}

if($request->to){
    $model = $model->where('date','=<',$request->to);
}

return $model;

    }


}