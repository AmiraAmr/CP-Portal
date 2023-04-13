<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\User;
use Illuminate\Support\Str;

use Storage;
use App\Attending_and_leaving;
use DB;
use App\project;

use App\timesheet_monthly_personal;
use App\timesheet_monthly_project;
use App\monthly_section;
use App\timesheet_daily_role;
use App\timesheet_monthly_role;
use App\timesheet_daily_section;
use App\timesheet_daily_project;
use App\timesheet_project_personal;
use App\attendance\calculeteTime;
use App\attendance\CalculeteLongTerm;

use App\project_overall;
use App\TimeSheet\TimeSheet;
class hearing_process_attendance implements ShouldQueue
{
    use Dispatchable, TimeSheet ,InteractsWithQueue, Queueable, SerializesModels , calculeteTime , CalculeteLongTerm;

    /**
     * Create a new job instance.
     *
     * @return void
     */

     public $attendance;

    public function __construct($attendance)
    {
        $this->attendance = $attendance;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {


 //     $user = User::find($this->attendance->user_id);


      $time =    $this->calculeteTime($this->Attending_and_leaving->attending_time , $this->Attending_and_leaving->attending_leaving);
      

      $CalculeteLongTerm = $this->CalculeteLongTerm();

   
        $this->TimeSheet($this->Attending_and_leaving , $CalculeteLongTerm);





    }
}
