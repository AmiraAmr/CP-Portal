<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\section;
use Inertia\Inertia;

class sectionController extends Controller
{
    public function index()
    {
        $data = section::paginate(10);
        return Inertia::render('Management/Sections/Index', [
            'data' => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('Management/Sections/Create');
        return view('managers.section.create');
    }

    public function insert(request $request)
    {

        $this->validate($request, [
            'name' => ['required', 'max:255', 'string'],
            'marketing_project' => ['numeric'],
            'percentage_attendance' => ['numeric', 'required'],
            'percentage_performance' => ['numeric', 'required'],
            'percentage_deal' => ['numeric', 'required'],
            'percentage_cash_flow' => ['numeric', 'required'],
        ]);


        section::create([
            'name' => $request->name,
            'marketing_project' => $request->marketing_project,
            'percentage_attendance' => $request->percentage_attendance,
            'percentage_performance' => $request->percentage_performance,
            'percentage_deal' => $request->percentage_deal,
            'percentage_cash_flow' => $request->percentage_cash_flow,
            'percentage_section' => $request->percentage_section
        ]);

        return redirect()->route('section.index', ['message' => 'Created successfully']);

    }

    public function update(request $request, section $section)
    {

        $this->validate($request, [
            'name' => ['required', 'max:255', 'string'],
            'marketing_project' => ['numeric'],
            'percentage_attendance' => ['numeric', 'required'],
            'percentage_performance' => ['numeric', 'required'],
            'percentage_deal' => ['numeric', 'required'],
            'percentage_cash_flow' => ['numeric', 'required'],
        ]);


        $section->update([
            'name' => $request->name,
            'marketing_project' => $request->marketing_project,
            'percentage_attendance' => $request->percentage_attendance,
            'percentage_performance' => $request->percentage_performance,
            'percentage_deal' => $request->percentage_deal,
            'percentage_cash_flow' => $request->percentage_cash_flow,
            'percentage_section' => $request->percentage_section
        ]);
        return redirect()->route('section.index', ['message' => 'Modified successfully']);

    }



    public function edit(section $section)
    {
        return Inertia::render('Management/Sections/Edit', ['section' => $section]);
        return view('managers.section.edit')->with(['section' => $section]);
    }

    public function json(request $request)
    {

        $data = section::paginate(10);

        return response()->json(['data' => $data]);
    }
}
