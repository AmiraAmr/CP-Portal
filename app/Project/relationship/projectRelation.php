<?php
namespace App\Project\relationship; 
use App\project;

trait projectRelation  {


public function project($model){

return $model->with('project');

}



}