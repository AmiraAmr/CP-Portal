<?php
namespace App\User\purchase_order; 
use App\FileManager\FileModule; 
class purchase_order_FileManager implements FileModule {

    public function data_store($fileName,$model,$files,$info){

      $files[] = [

        'purchase_id'=>$model->id,
        'path'=>$fileName,
        
       ];

       return $files;

       
}

}
?>