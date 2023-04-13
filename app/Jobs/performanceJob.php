<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\performance_daily_personal;
use App\performance_daily_project;
use App\performance_daily_section;
use App\performance_monthly_personal;
use App\performance_monthly_project;
use App\monthly_section;
use App\performance_project_personal;
use App\performance_section_personal;
use App\project_overall;
use App\performance\FacadePerformance;
use Carbon\Carbon;
class performanceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue,FacadePerformance, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $user,$performance,$project,$section;
    public function __construct($user,$performance,$project,$section)
    {
      $this->user = $user;
    $this->performance=  $performance;
   $this->project =  $project;
    $this->section = $section;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        $user = User::find($this->user)->with('contract');


        

$this->Performance($this->user , 

$this->performance,

$this->project ,

 $this->section );
   
  





  

    

  






    }
}
