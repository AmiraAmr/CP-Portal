<?php
namespace App\petty_cash; 
 use App\petty_cash;
trait PTUpdate {

    public function update($model,$request ){

       return $model->update([
            'project_id' => $request->project_id,
            'status' => 0,
            'expected_amount' => ($request->total + $request->vat) ?? 0,
            'vat' => $request->vat ?? 0,
            'date' => $request->date,
            'subject' => $request->subject,
            'to' => $request->to,
        ]);



       
}

}
?>
