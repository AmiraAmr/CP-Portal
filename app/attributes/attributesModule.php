<?php 

namespace App\attributes;

interface  attributesModule {

    public function attributes_store($data,$model,$list, $request=null);
    

}