<?php 

namespace App\facede_pattern;


use App\petty_cash_attachment;
use App\petty_cash_cycle;
trait DeletePC {


    public function deleteAttributes($request,$model){



      if ($request->deletedfiles) {
        petty_cash_attachment::find($request->deletedfiles)->delete();
    }


    $petty_cash_cycle =  $model->petty_cash_cycle()->orderBy('id', 'DESC')->first();
    
    if ($petty_cash_cycle) {

        $petty_cash_cycle->update(['status' => 0]);



        $workflow =   $this->find($type , $petty_cash_cycle->step);


        $this->mail($workflow->role->user,$content);


        //

    } else {
      $workflow  =   $this->find($type);


            $content = 'New petty cash Request';
            
            $this->mail($workflow->role->user,$content);




        $this->cycle( $workflow ,$model);

 


    }
  
  
  
  if (!empty($model->attributes2)) {
  
        $model->attributes2->delete();
    
  }
  
  
  


    }


}