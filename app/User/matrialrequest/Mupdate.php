<?php

namespace App\User\matrialrequest; 

use App\matrial_request;

use App\Exceptions\CustomException;

trait Mupdate {
public function Mupdate($matrial_request,$data){

    $matrial_request->update([

        'project_id' => $data['project_id'],
        'date' => $data['date'],
        'subject' => $data['subject'],
        'ref' => $data['ref'],
        'status' => 0,
        'to' => $data['to'],
        
        
        
        ]);

        
}

}