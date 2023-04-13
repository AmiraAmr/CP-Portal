<?php

namespace App\User\matrialrequest; 

use App\matrial_request;

use App\Exceptions\CustomException;

trait query {

public function Qupdate($id){

   return matrial_request::where('id', $id)->with(['matrial_request_cycle' => function ($q) {
        return  $q->with(['comment_matrial_cycle' => function ($qu) {
            return $qu->with('attachment_matrial_cycle');
        },'role']);

    },'files','attributes'])->first();


}


    public function Qpreview($id){

   return    matrial_request::where('id', $id)->with(['matrial_request_cycle' => function ($q) {
              $q->with(['comment_matrial_cycle' => function ($qu) {
                 $qu->with('user');
            }]);
        },'attributes', 'note','project'])->first();

    }

public function Qindex(){


   return auth()->user()->matrial_request()->orderBy('created_at', 'DESC')
   ->with(['matrial_request_cycle' => function ($q) {
       return   $q->with('role');
   }])->paginate(10);



}



}
