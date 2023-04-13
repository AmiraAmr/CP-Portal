<?php

namespace App\getlatest; 


trait latest  {

    public function latest($model){
return $model->latest()->first();
    }

}

