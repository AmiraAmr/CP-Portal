<?php
namespace App\DailyReport; 
use App\FileManager\FileModule; 
class DailyReport_FileManager implements FileModule {

    public function data_store($fileName,$model,$files,$info){

      $files[] = [
        'daily_report_id' => $model->id,
        'path' => $fileName,
       ];

       return $files;

       
}

}
?>