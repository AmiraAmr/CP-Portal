<?php 
namespace App\User\purchase_order;
use App\facede_pattern\Filter;
 class POFilter  extends Filter 
{

public function POFilter($request,$model){


 $model =    $this->MainFilter($request,$model);


 if ( $request && $request->supplier_id && $request->supplier_id !== '') {

    $model =   $model->where('supplier_id', $request->supplier_id);
}



if ( $request && $request->delivery_date) {

    $model =   $model->where('delivery_date', $request->delivery_date);
}


return  $model ;



}


}