<?php

namespace App\User\purchase_order\relationship;
  

 class CycleFactory{


public function getCycle(string $type) : CycleManagment{

return match($type){

 'manager_cycle_table'=> new ManagerCycle,
 'employee'=>new NEmployeeCycle,
'default'=>throw new\InvlidArgumentException('this module not exists create new one and try again'),

};
    

    }


}