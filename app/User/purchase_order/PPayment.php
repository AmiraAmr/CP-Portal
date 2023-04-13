<?php

namespace App\User\purchase_order; 


use App\payment_term as note;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\CustomException;

trait PPayment {

    public function pay($data,$model,$cash){

        
  if(!empty($payment)  && $cash  == 1 ){
    $rules = [
  
        'name'=> "required|string",
        'percentage'=> "required|numeric",
        'amount'=> "required|numeric",
    
    ];
      foreach($payment as $pay){
          $validator = Validator::make($pay, $rules);
          
          if ($validator->passes()) {
              note::insert([
              'dis'=>$pay['dis'] ?? null,
              'purchase_order_id'=>$Purchase_order->id,
                'percentage'=>$pay['percentage'] ?? null,
            'name'=>$pay['name']?? null,
  'amount'=>$pay['amount'] ?? null,
        'date'=>$pay['date'] ?? null,
              ]);
          }else{
           
           $errors  = $validator->errors()->toArray();
      $data = json_encode($errors);
      
              throw new CustomException ($data);
          }
      }
  }
  
  

    }

}