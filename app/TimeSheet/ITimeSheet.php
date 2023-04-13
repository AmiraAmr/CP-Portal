<?php 
namespace App\TimeSheet;

trait  ITimeSheet {
use Tmonthly_personal , Tproject_overall_Time , TProject_personal_TimeSheet , TRoleTime, TSectionTimeSheet;

    public function TimeSheet($attendance , $numbers_util_now=null , $time){


        $this->Tmonthly_personal($attendance, $numbers_util_now , $time);
       
        $this->Tproject_overall_Time($attendance, $numbers_util_now , $time);

        $this->TProject_personal_TimeSheet($attendance, $numbers_util_now ,$time);


        $this->TRoleTime($attendance, $numbers_util_now , $time);


        $this->TSectionTimeSheet($attendance, $numbers_util_now , $time);




    }

}