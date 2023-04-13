<?php

namespace App\User\matrialrequest; 
use App\matrial_request_attachment;
use Illuminate\Support\Str;
trait MSaveFiles {

    public function saveFile($data,$id){
$files = [];

        if($data->count > 0){
            for($counter = 0;  $counter <= $data->count;  $counter++){
             
                $img = 'files-'.$counter;
                
                  if($data->$img){
                    $image_tmp = $data->$img;
                    $fileName = Str::random(40).'.'.$image_tmp->getClientOriginalExtension();
              
                    $image_tmp->move('uploads/matrial_request', $fileName);

                    $files[] = [
                        'matrial_request_id' => $id,
                        'path' => $fileName,
                    ];
                    ++$counter;
                } else {
                    $fileName = null;
                }
            }

            $chunkfille = array_chunk($files, 3);
            if (!empty($chunkfille)) {
                foreach ($chunkfille as $chunk) {
                    matrial_request_attachment::insert($chunk);
                }
            
           
              }
           
        
                     
           }
           

    }

}

?>