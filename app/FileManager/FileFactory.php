<?php

namespace App\FileManager; 
use App\User\purchase_order\purchase_order_FileManager;
use App\DailyReport\DailyReport_FileManager;
use App\petty_cash\FileManagerPetty;
 class FileFactory{


    public function getFileModule(string $type) : FileModule{

return match($type){

 'purchase_order'=> new purchase_order_FileManager,
 'daily_report'=>new DailyReport_FileManager,
 'petty_cash'=> new FileManagerPetty,
'default'=>throw new \InvlidArgumentException('this module not exists create new one and try again'),

};
    

    }


}