<?php 

namespace App\facede_pattern;


use App\purchase_order_attachment;

class DeletePO {


    public function deleteAttributes($request,$model){


        
if ($request->deletedfiles) {
    purchase_order_attachment::find($request->deletedfiles)->delete();
  }
  
  
  if(!empty($model->purchase_order_cycle)){
    $model =  $model->purchase_order_cycle()->delete();
  }
  
  
  
  
  
  
  if(!empty($model->note)){
  $model->note->delete();
  }
   
  
  
  
  if (!empty($model->attributes2)) {
  
        $model->attributes2->delete();
    
  }
  
  
  


    }


}