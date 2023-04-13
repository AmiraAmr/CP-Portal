<?php

namespace App\Imports;

use App\Models\salary;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Collection;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\User;
use App\salary as salaries;
class SalariesImport implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    protected $month;

    public function __construct($month)
    {
        $this->month = $month;

    
  
    }

    public function collection(Collection $rows)
    {

    
    $data = [];

   

        foreach($rows as $row){
   $user =   User::where('Accommodation',$row[0])->first();
    

    $data [] = [
     
    'user_id'=>$user->id ?? null,
    'salary'=>$row[1],
    'added'=>$row[2],
    'Deduction'=>$row[3],
    'Amount'=>($row[1] + $row[2] - $row[3]),
'month'=> $this->month,
'approved_by'=>auth()->user()->id
    ];


        }

        salaries::insert($data);

      
    


  
      
    }

    public function headingRow(): int
    {
        return 4;
    }

}
