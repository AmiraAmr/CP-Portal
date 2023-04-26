<?php
namespace App\Classes_interface\department\calculate_degree;
class attendance_department implements Icalculate_degree {
    use DepartmentRate , IIncrement;


    public function calculate_degree($model , $user){

return $this->global_calculator($model->attendance_percentage ?? 0 , $user->role->section->percentage_attendance ) ;
    

    }

}