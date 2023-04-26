<?php 

namespace App\facede_pattern;
use App\dailyReport;
use App\explode\explodeRef ;
use App\getlatest\latest ;
use App\User\Email\cc;

use App\InterFace\WorkFlow\find ;
use App\InterFace\WorkFlow\steps ;
use App\daily_report_attachment;
use App\daily_productivity;
use App\DailyReport\DInsert;
use App\image_daily_report;

class CreateDaily_Report {
 use find , DInsert   , steps , explodeRef
 , latest ;
  




public function create($request,  $SaveFiles , $IItemManager ){




  $daily_productivities =  json_decode($request->daily_productivities, true);

  $users = json_decode($request->engineers, true);



    $data = $this->latest(new dailyReport);

    

    $explode = $this->explodeRef($data->ref,'R-');



  $daily_report = $this->insert($request,$explode);


$daily_productivity_table = $daily_report->daily_productivity()->getRelated()->getTable();


$content   = 'user name:'.' '.auth()->user()->name ?? ''.'Project Name:'.' '.$daily_report->project->name ?? ''.'has been created:' .' '. $daily_report->ref . 'is waiting for review';
 

//$this->mail($users ?? [] ,$daily_report,$content);



  $SaveFiles->SaveFile($request,$daily_report, new daily_report_attachment,'daily_report',null ,$request->count);



  $SaveFiles->SaveFile($request,$daily_report, new image_daily_report,'image_daily_report', 'dailyReport/image' , $request->fileImage, 'fileImage-'  );







  $rules_daily_productivities = [
    'unit' => $data['unit'],
    'item' => array('string','max:255'),
    'quantity' => array('required','numeric'),
  'unit' => array('string')
  ];

  
  
    $IItemManager->SaveItem($daily_productivities, $daily_report , $daily_productivity_table,'daily_productivity' , $rules_daily_productivities , $request );
    


    
$user_table = $daily_report->users()->getTable();



$rules_users = [
   
  'commitment' => array('numeric','max:255'),
  'performance' => array('required','numeric'),

];


$IItemManager->SaveItem($users, $daily_report, $user_table , 'users_daily_report' , $rules_users , $request );
    






}


   
   
 


   
   




}