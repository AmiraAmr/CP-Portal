<?php

namespace App\User\purchase_order; 

use App\Purchase_order;

use App\Exceptions\CustomException;
use App\User\purchase_order\relationship\relationshipFacede;
class  query extends relationshipFacede   {

public function Qupdate($model  , $type ='employee' ){


  $model =  Purchase_order::where('id',$model);


  $data =  $this->getRelationship($model , $request=null , $type  , $user=false  , $attributes=true , 
  
  $attributes2=true , $attachment=true  , $project=true , $payment=true  );

 return $data->first();


}


public function Qpreview( $model    , $type ='employee'  ){

    $model =  Purchase_order::where('id',$model);

  $data =  $this->getRelationship($model , $request=null , $type
  
  ,
  $comment=false

  , $user=false  , $attributes=true , 
  
  $attributes2=true , $attachment=false  , $project=true , $payment=true  );

  return  $data->first();

      }

public function Qindex($model,  $request=null  , $type ='employee'  , $user = false ){

  
  $PO = $this->getRelationship($model , $request, $type 
  ,$comment=false , $user  
   , $attributes=false , $attributes2=false , 
  $attachment=false , $project=true   , $payment=false  );



return  $PO->paginate(10);





}



}
