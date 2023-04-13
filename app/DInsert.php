<?php
namespace App\DailyReport;

use App\dailyReport;


trait DInsert{

    
    
public function Insert($request){

   return dailyReport::create([
        'project_id' => $request->project_id,
    //    'date' => $request->date,
        'ref' => $request->ref,
        'The_scope_of_work' => $request->The_scope_of_work,
        'supervisor_id' => auth()->user()->id,
        'workplace' => $request->workplace,
        'note' => $request->note,
        'status' => 0,
        'number_of_staff' => $request->number_of_staff,
    ]);

}


}