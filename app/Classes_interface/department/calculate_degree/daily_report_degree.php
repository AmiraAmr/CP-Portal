<?php
namespace App\Classes_interface\department\calculate_degree;
class daily_report_degree implements Icalculate_degree {
    use DepartmentRate , IIncrement;


    public function calculate_degree($model , $user){

return  $this->global_calculator($model->daily_report_percentage , $user->role->section->daily_report_percentage );

    }

}