<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\salary;
use App\report;
use Inertia\Inertia;
use App\Imports\SalariesImport;
use Maatwebsite\Excel\Facades\Excel;
class salariesController extends Controller
{


public function import(request $request){


    $image_tmp = $request->files;
    $extension = $image_tmp->getClientOriginalExtension();
    $fileName = rand(111, 99999) . '.' . $extension;

    $image_tmp->move('uploads/salaries', $fileName_image);


    Excel::import(new SalariesImport($request->date), 'uploads/salaries/'.$fileName);

}



    public function index()
    {
        return Inertia::render('Management/Salaries/Index');
        return view('managers.salary.index');
    }

    public function jsonSalaries(request $request)
    {

        $this->validate($request, [
            'salary_day_to' => ['numeric'],
            'salary_day_from' => ['numeric'],
            'salary_Hour_from' => ['numeric'],
            'salary_Hour_to' => ['numeric'],
            'working_hour_from' => ['numeric'],
            'working_hour_to' => ['numeric'],
            'Deduction_from' => ['numeric'],
            'Deduction_to' => ['numeric'],
            'Amount_to' => ['numeric'],
            'Amount_from' => ['numeric'],
        ]);
        $salary =    salary::Query();



        if ($request->name) {
            $salary = $salary->with([
                'employee' => function ($q) use ($request) {

                    return $q->where('name', $request->name);
                }
            ]);
        }

        if ($request->month) {
            $salary = $salary->where('month', $request->month);
        }

        if ($request->salary_day_from || $request->salary_day_to) {
            $salary = $salary->whereBetween('salary_day', [$request->salary_day_from, $request->salary_day_to]);
        }

        if ($request->salary_Hour_from || $request->salary_Hour_to) {
            $salary = $salary->whereBetween('salary_Hour', [$request->salary_Hour_from, $request->salary_Hour_to]);
        }


        if ($request->working_hour_from  || $request->working_hour_to) {
            $salary = $salary->whereBetween('working_hour', [$request->working_hour_from, $request->working_hour_to]);
        }

        if ($request->Deduction || $request->Deduction_to) {
            $salary = $salary->whereBetween('Deduction', [$request->Deduction_from, $request->Deduction_to]);
        }
        if ($request->Amount_from || $request->Amount_to) {
            $salary = $salary->whereBetween('Amount', [$request->Amount_from, $request->Amount_to]);
        }


        $salary = $salary->with(['user_approved_by', 'employee']);



        $salary = $salary->orderby('created_at', 'DESC')->paginate(10);

        return response()->json(['data' => $salary]);
    }

    public function salary_approval(request $request)
    {

        salary::create([
            'user_id' => $request->user_id,
            'month' => $request->month,
            'salary_day' => $request->salary_day,

            'salary_Hour' => $request->salary_Hour,

            'transportation_allowance' => $request->transportation_allowance,

            'communication_allowance' => $request->communication_allowance,

            'food_allowance' => $request->food_allowance,

            'other_allowance' => $request->other_allowance,

            'working_days' => $request->working_days,

            'working_hour' => $request->working_hour,
            'over_time' => $request->over_time,
            'Deduction' => $request->Deduction,
            'Amount' => $request->Amount,
            'approved_by' => auth()->user()->id
        ]);


        $report =   report::where('date', $subcontractor->month)->increment('total_cash_out', $subcontractor->Amount);

        if (empty($report)) {
            report::create([
                'date' => $subcontractor->month,
                'total_cash_out' => $subcontractor->Amount,
            ]);
        }
    }
}
