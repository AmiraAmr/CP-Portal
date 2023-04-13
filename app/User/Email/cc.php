<?php

namespace App\User\Email; 

use Illuminate\Support\Facades\Validator;
use App\Jobs\sendcc;
use Carbon\Carbon;
use App\notification;

trait cc {

public function mail($data,$model,$content){
  
    


    $notification = [];

    if(!empty($data)){
        foreach($data as $user){


                if($model){


                    $model->mention()->attach([
                        $user['id'] ?? null
                            ]);


                }
          
       
        
            $job = (new sendcc($user,$content,''))->delay(Carbon::now()->addSeconds(90));
            $this->dispatch($job);
      //      NotificationEvent::dispatch($user->id,$content);

      
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