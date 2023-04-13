<?php 

namespace App\FileManager;

interface  FileModule {

    public function data_store($fileName,$model,$files,$info);
    

}