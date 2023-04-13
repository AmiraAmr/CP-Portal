<?php

namespace App\User\purchase_order; 

use App\purchase_order_product;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Exceptions\CustomException;
use App\Jobs\update_pervious_value;
use Illuminate\Foundation\Events\Dispatchable;



trait PItem     {
  



public function add($data,$model){

    foreach($data as $attr){
   
        $validator = Validator::make($attr,[
            'qty' => array('required','numeric'),
            'unit' => array('required','string','max:255'),
            'unit_price' => array('required','numeric'),
    'id' => array('required','exists:products,id')
        ]



           
        );
    
 
  
        if ($validator->passes() == true) {
    
  
        $model->attributes()->attach($attr['id'] ?? null,[
      
              'qty'=>$attr['qty'],
               'unit'=>$attr['unit'],
                'unit_price'=>$attr['unit_price'],
               'total'=>$attr['total'] ?? 0,
           
            ]);

        
    
             /*
       $job = (new update_pervious_value($attr['unit_price'] , $attr['id'] ?? null   ,  auth()->user()->id, $attr['value']  ?? 0 
       ,auth()->user()->role && auth()->user()->role->section_id !== null ? auth()->user()->role->section_id : null
       
       ))->delay(Carbon::now()->addSeconds(90));
      */
    
         
    
           
    }else{
         
            $errors  = $validator->errors()->toArray();
            $data = json_encode($errors);
          
                    throw new CustomException ($data);
    
        }
    }
  
    

}


}