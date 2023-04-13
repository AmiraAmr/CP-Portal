<?php
namespace App\petty_cash; 
 use App\petty_cash;
trait PTInsert {

    public function insert($request , $explode){

return petty_cash::create([
    'project_id' => $request->project_id,
    'user_id' => auth()->user()->id,
    'status' => 0,
    'expected_amount' => ($request->total + $request->vat),
    'vat' => $request->vat,
    'ref' => 'PC-' . '' . $explode[1] + 1,
    //'date' => $request->date,
    'content' => $request->content,
    'subject' => $request->subject,
    'to' => $request->to,
]);


       
}

}
?>v