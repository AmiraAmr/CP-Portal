<?php 
  namespace App\User\purchase_order\relationship;
  
 abstract  class  relationshipFacede  {

    use attachment , attributes  ;


public function getRelationship( $model, $request=null,  $type , $comment=false  , $user=false  , $attributes=false , $attributes2=false , $attachment=false , $project=true  ){

$CycleFactory = new CycleFactory;


$getCycle = $CycleFactory->getCycle($type);

return $getCycle->Cycle( $model,$request ,$comment, $user , $attributes 
, $attributes2 , $attachment , $project );



}








 }