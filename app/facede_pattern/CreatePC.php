<?php 

namespace App\facede_pattern;
use App\petty_cash;
use App\petty_cash\PTInsert;
use App\explode\explodeRef ;
use App\getlatest\latest ;
use App\User\Email\cc;
use App\InterFace\WorkFlow\find ;
use App\InterFace\WorkFlow\steps ;
use App\petty_cash\PCCycle;
use App\petty_cash_attachment;
use App\Classes_interface\monthly_summary_report\FacadeReport;


class CreatePC {
 use find , PTInsert ,FacadeReport   , steps , PCCycle ,explodeRef
 , latest ;
  




public function create($request, 
 $SaveFiles , $IItemManager){



  $attributes = json_decode($request->attr, true);

$users = json_decode($request->users, true);



    $data = $this->latest(new petty_cash);

    
    $explode = $this->explodeRef($data->ref,'PC-');

$petty_cash = $this->insert($request, $explode);


$this->FacadeReport($request->overall , 'cash_out');


$attribute_table = $petty_cash->attributes()->getRelated()->getTable();

 
$content   = 'user name:'.' '.auth()->user()->name ?? ''.'Project Name:'.' '.$Purchase_order->project->name ?? ''.'has been created:' .' '. $Purchase_order->ref . 'is waiting for review';
 
$cc = new cc;


$cc->mail($users ?? [] ,$Purchase_order,$content);

$type = 'petty_cash';
    $workflow  =   $this->find($type);

  

  $cc->mail($workflow->role->user,$Purchase_order,$content);
  



    

  $SaveFiles->SaveFile($request,$petty_cash, new petty_cash_attachment,$type);





  
  $rules = [


    "qty"  => "required|numeric",


    'dis' => "required|string",
    'unit' => "string|max:255",

    'unit_price' => "required|numeric",

];



    $IItemManager->SaveItem($attributes,$petty_cash, $attribute_table , $type , $rules );
    

    
  $this->cycle( $workflow ,$petty_cash);

 



}


   
   
 


   
   




}