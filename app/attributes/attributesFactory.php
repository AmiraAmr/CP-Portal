<?php

namespace App\attributes; 

use  App\User\purchase_order\attributes_store_po; 
use App\DailyReport\user_daily_report;
use App\DailyReport\daily_productivity_store;
use App\petty_cash\petty_cash_attributes;

 class attributesFactory{


    public function getattributesModule(string $type) : attributesModule{

return match($type){

 'purchase_order'=> new attributes_store_po,
 'users_daily_report'=>new user_daily_report,
 'daily_productivity'=>new daily_productivity_store,
 'petty_cash'=>new petty_cash_attributes,
'default'=>throw new \InvlidArgumentException('this module not exists create new one and try again'),

};
    

    }


}