<?php 

namespace App\facede_pattern;
use App\petty_cash;
use App\explode\explodeRef ;
use App\getlatest\latest ;
use App\User\Email\cc;
use App\InterFace\WorkFlow\find ;
use App\InterFace\WorkFlow\steps ;
use App\petty_cash\PCCycle;
use App\petty_cash\PTUpdate;

use App\petty_cash_attachment;



trait EditPC {
 use find , DeletePC , PTUpdate   , steps , PCCycle ,explodeRef
 , latest ;
  




public function edit( $petty_cash ,$request, 
 $SaveFiles , $IItemManager){


  $attributes = json_decode($request->attr, true);

$users = json_decode($request->users, true);


$this->update($petty_cash, $request);


$this->deleteAttributes($petty_cash , $request);



$attribute_table = $petty_cash->attributes()->getRelated()->getTable();

 
$content   = 'user name:'.' '.auth()->user()->name ?? ''.'Project Name:'.' '.$Purchase_order->project->name ?? ''.'has been created:' .' '. $Purchase_order->ref . 'is waiting for review';
 
$cc = new cc;
$cc->mail($users ?? [] ,$Purchase_order,$content);



    

  $SaveFiles->SaveFile($request,$petty_cash, new petty_cash_attachment,$type);





  
  $rules = [


    "qty"  => "required|numeric",


    'dis' => "required|string",
    'unit' => "string|max:255",

    'unit_price' => "required|numeric",

];



    $IItemManager->SaveItem($attributes,$petty_cash, $attribute_table , $type , $rules );
    





}


   
   
 


   
   




}