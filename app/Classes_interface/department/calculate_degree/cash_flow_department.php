<?php
namespace App\Classes_interface\department\calculate_degree;
class cash_flow_department implements Icalculate_degree {
    use DepartmentRate , IIncrement;


    public function calculate_degree($model , $user){

        $value = $this->IIncrement($model->cash_out - $model->cash_in , $model->cash_in ?? 1  )  / $user->role->section->when_cash_flow  * 100 ;
        
        
        if($value >= $user->role->section->when_cash_flow &&   $user->role->section->when_cash_flow > 0 ){

                    return  $this->global_calculator($value , $user->role->section->percentage_cash_flow );
                    
        }        
    }

}