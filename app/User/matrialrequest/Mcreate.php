<?php
namespace App\User\matrialrequest; 

use App\matrial_request;

use App\Exceptions\CustomException;

trait Mcreate {
public function Mcreate($data,$explode){

 return matrial_request::create([

'project_id' => $data['project_id'],
'date' => $data['date'],
'subject' => $data['subject'],
'content' => $data->content,
'user_id' => auth()->user()->id,
'ref' =>  'MR-' . '' . $explode[1] + 1,
'status' => 0,
'to' => $data['to'] ?? null
]);



}

}