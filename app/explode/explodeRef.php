<?php

namespace App\explode; 


trait explodeRef  {

public function explodeRef($model,$ref){
 return   explode("-", $model ?? $ref . '' . '0');
}

}
