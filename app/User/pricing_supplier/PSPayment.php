<?php

namespace App\User\pricing_supplier; 


use App\payment_term as note;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\CustomException;

trait PSPayment {

    public function pay($data,$model,$cash){

        
  if(!empty($payment)  && $cash  == 1 ){
    $rules = [
  
        'name'=> "required|string",
        'percentage'=> "required|numeric",
        'amount'=> "required|numeric",
    
    ];

    $pays = [];

      foreach($payment as $pay){
          $validator = Validator::make($pay, $rules);
          
          if ($validator->passes()) {
       $pays [] =   [
              'dis'=>$pay['dis'] ?? null,
              'pricing_supplier_id' => $pricing_supplier->id,
                'percentage'=>$pay['percentage'] ?? null,
            'name'=>$pay['name']?? null,
  'amount'=>$pay['amount'] ?? null,
        'date'=>$pay['date'] ?? null,
              ];
          }else{
           
           $errors  = $validator->errors()->toArray();
      $data = json_encode($errors);
      
              throw new CustomException ($data);
          }
      }


      payment_pricing::insert($pays);


  }
  
  

    }

}