<?php
namespace App\petty_cash; 
use App\FileManager\FileModule; 
class FileManagerPetty implements FileModule {

    public function data_store($fileName,$model,$files,$info){

      $files[] = [
        'petty_id' => $model->id,
        'path' => $fileName,

       ];

       return $files;

       
}

}
?>v