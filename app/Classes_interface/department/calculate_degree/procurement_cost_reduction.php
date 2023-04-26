<?php
namespace App\Classes_interface\department\calculate_degree;
class calculate_degree implements Icalculate_degree {
    use DepartmentRate , IIncrement;


    public function calculate_degree($model , $user){

return  $this->global_calculator($model->cost_reduction , $user->role->section->cost_reduction );

    }

}