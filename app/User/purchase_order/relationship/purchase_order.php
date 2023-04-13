<?php 
 
 namespace App\User\purchase_order\relationship;
  use App\User\relationship\user;
  use App\User\purchase_order\POFilter;

  class  purchase_order   {
use user;

public function purchase_order($model,$request=null,$user=true){

 
if($request){

$model->WhereHas('purchase_order', function ($q) use ($request) {

    $POFilter = new POFilter;

    $POFilter->POFilter($request , $q);
    
    
        });

    }
        
  
        
    $model->with(['purchase_order' => function ($query ) use($user) {
                    
               
            $user ? $this->user($query) : '';
                    
                    
                    }]);



 




return $model ;
}



        }