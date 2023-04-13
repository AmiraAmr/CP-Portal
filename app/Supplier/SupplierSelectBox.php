<?php

namespace App\Supplier; 
use App\supplier;

trait SupplierSelectBox  {

public function SupplierSelectBox(){
    return supplier::select(['id','comp','customer_name'])->get();
}
 


}