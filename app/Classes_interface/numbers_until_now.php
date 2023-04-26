<?php
namespace App\Classes_interface;
use App\attendance\CalculeteLongTerm;
trait numbers_until_now {
use CalculeteLongTerm;
  public function numbers_until_now( $value_1 , $value_2=1 ) {

return ($this->CalculeteLongTerm()   * $value_1  * $value_2);

  }  

}