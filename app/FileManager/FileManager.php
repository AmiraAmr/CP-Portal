<?php

namespace App\FileManager; 
use Illuminate\Support\Str;

class FileManager  implements SaveFiles {

    public function SaveFile($data,$model,$table_file,$type,$path = ''){

$files = [];

        if($data->count > 0){

            for($counter = 0;  $counter <= $data->count;  $counter++){
             
                $img = 'files-'.$counter;
                
                  if($data->$img){

                    $image_tmp = $data->$img;

                    $fileName = Str::random(40).'.'.$image_tmp->getClientOriginalExtension();
                              
            $image_tmp->move('uploads/'.$type ?? $path .'/'.$model->ref, $fileName);



                $Department = new   FileFactory;
      
                $Department =     $Department->getFileModule($type);


               

             $files =   $Department->data_store($fileName,$model,$files,$image_tmp);


             

                }else{
                  $fileName = null;
                
                }
           
           
              }

         
           
           
              $chunkfille = array_chunk($files, 3);


       
              if(!empty($chunkfille)){

                  foreach($chunkfille as $chunk){

                    $table_file->insert($chunk);


                  }
                     }
                     
           }
           

    }

}

?>