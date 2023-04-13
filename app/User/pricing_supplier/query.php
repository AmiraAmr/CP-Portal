<?php

namespace App\User\pricing_supplier; 

use App\pricing_supplier;

trait query {

public function Qupdate($id){

    
  return   pricing_supplier::where('id', $pricing_supplier)->with(['pricing_supplier_cycle' => function ($q) {


    return  $q->with(['pricing_supplier_comment_cycle' => function ($qu) {


        return $qu->with('files');


    }])->with('role');


},'files','attributes',

'note'])->first();


}


    public function Qpreview($id){

      return pricing_supplier::where('id', $id)
      ->with(['attributes', 'note','pricing_supplier_cycle' => function ($q) {
          return 
          
          $q->with(['pricing_supplier_comment_cycle' => function ($qu) {
              return $qu->with('user');
          },'role'
      
      
      ]);

     

      }])->first();

        
        
    

    }

public function Qindex(){

return    auth()->user()->pricing_supplier()->orderBy('created_at', 'DESC')
->with(['pricing_supplier_cycle' => function ($q) {
        return $q->with('role');
        
    },'supplier'])->paginate(10);



}

public function details($id){
 return   pricing_supplier::where('id',$id)->with(['attributes', 'attributes2', 'note'])->first();
}



}
