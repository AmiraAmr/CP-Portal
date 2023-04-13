<?php

namespace App\Project; 
use App\project;

trait ProjectSelectBox  {

public function ProjectSelectBox($select_data){
    return project::select($select_data)->get();
}
 


}