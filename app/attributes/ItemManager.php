<?php

namespace App\attributes; 

use Carbon\Carbon;
use App\Exceptions\CustomException;
use DB;
use Illuminate\Support\Facades\Validator;
Class ItemManager   implements IItemManager  {
  

public function SaveItem($data, $model, $table, $type  ,$rules=null , $request=null){


    $list = [];

    foreach($data as $attr){
   
        
       $validator = Validator::make($attr,$rules


       
    );

    if ($validator->passes() == true) {

        $attributesFactory = new   attributesFactory;
      
        $attributesFactory =     $attributesFactory->getattributesModule($type);


        $list =   $attributesFactory->attributes_store($attr, $model, $list , $request);

    }else{
     
        $errors  = $validator->errors()->toArray();
        $data = json_encode($errors);
      
                throw new CustomException ($data);

    }

    }
  
    
   $chunkfille = array_chunk($list, 3);


   if(!empty($chunkfille)){

       foreach($chunkfille as $chunk){

        DB::table($table)->insert($chunk);


       }

          }
          


}


}