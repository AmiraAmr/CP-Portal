<?php

namespace App\User\Email; 

use Illuminate\Support\Facades\Validator;
use App\Jobs\sendcc;
use Carbon\Carbon;
use App\notification;
use Illuminate\Foundation\Bus\Dispatchable;
class cc {
use Dispatchable;
public function mail($data,$model,$content){
  
    


    $notification = [];

    if(!empty($data)){
        foreach($data as $user){


                if($model){


                    $model->mention()->attach([
                        $user['id'] ?? null
                            ]);


                }
          
       
        
         
    sendcc::dispatch($user,$content,'')
    ->delay(now()->addMinutes(10));


      //      NotificationEvent::dispatch($user->id,$content);

      CreateFact::dispatch($job);
      
      $notification[] = [
        'type' => 4,
        'read' => 1,
        'name' => $content,
        'user_id_to' => $user->id,
        'user_id_from' => auth()->user()->id,
    ];

        



        
 
        }
        


        $chunk_notification = array_chunk($notification, 10);

        foreach ($chunk_notification as $noti) {
            notification::insert($noti);
        }


        
    }
    
    
}

}