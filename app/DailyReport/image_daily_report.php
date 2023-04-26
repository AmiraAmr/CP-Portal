<?php
namespace App\DailyReport; 
use App\FileManager\FileModule; 
use App\FileManager\additionFileModule; 
class image_daily_report implements FileModule , additionFileModule {


  public function additionData($data , $count , $files){
 
   
    $update = $files[$count];
          
    $description =  'description-'.$count;
      
          $files[$count]['description'] = $data->$description;
    
          return $files;
    
        }


    public function data_store($fileName,$model,$files,$info){
      $files[] = [
        'daily_report_id' => $model->id,
        'path' => $fileName,
       ];

       return $files;

       
}

}
?>