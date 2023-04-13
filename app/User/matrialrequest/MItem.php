<?php

namespace App\User\matrialrequest; 

use App\matrial_request_product;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Exceptions\CustomException;



trait MItem {

public function Item($data,$model){

    foreach($data as $attr){
   
        $validator = Validator::make($attr,[
            'qty' => array('required','numeric'),
            'unit' => array('required','string','max:255'),
            'id' => array('required','exists:products,id')
        ]



           
        );
    
 
  
        if ($validator->passes() == true) {
    
  
        $model->attributes()->attach($attr['id'] ?? null,[
              'qty'=>$attr['qty'],
              'unit'=>$attr['unit'],
            ]);
    
             

           
    }else{
         
            $errors  = $validator->errors()->toArray();
            $data = json_encode($errors);
          
                    throw new CustomException ($data);
    
        }
    }
  
    

}


}