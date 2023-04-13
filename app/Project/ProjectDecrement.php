<?php

namespace App\Project; 
use App\project;

trait ProjectDecrement  {


public function ProjectDecrement($project,$attributes){

    
    $project->decrement($attributes);


}


}