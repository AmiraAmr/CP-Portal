<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\role;
use App\permission;
use App\section;
use Inertia\Inertia;

class RoleController extends Controller
{

    public function rolechunk()
    {
        $data = role::get()->chunk(10);
        return response()->json(['data' => $data]);
    }

    public function create()
    {
        $permission = permission::get();
        $section = section::select(['name', 'id'])->get();
        return Inertia::render('Management/Roles/Create', ['data' => $permission, 'section' => $section]);
        return view('managers.role.create')->with(['data' => $permission, 'section' => $section]);
    }

    public function edit(role $role)
    {
        $permission = permission::get();

        $section = section::select(['name', 'id'])->get();
        $permissionrole = $role->permission;
        return Inertia::render('Management/Roles/Edit', ['data' => $permission, 'role' => $role, 'permissionrole' => $permissionrole, 'section' => $section]);

        return view('managers.role.update')->with(['data' => $permission, 'role' => $role, 'permissionrole' => $permissionrole, 'section' => $section]);
    }

    public function insert(request $request)
    {

        $this->validate($request, [
            'name' => ['required', 'max:255', 'string'],

        ]);

        $role =    role::create([

            'name' => $request->name, 'section_id' => $request->section_id
        ]);


        $json = json_decode($request->permission, true);
        $role->permission()->attach($json);
        return redirect()->route('index.role', ['message' => 'Created successfully']);
    }



    public function update(request $request, role $role)
    {

        $this->validate($request, [
            'name' => ['required', 'max:255', 'string'],
            'section_id' => ['required', 'max:255', 'numeric'],

        ]);

        $role->update([

            'name' => $request->name, 'section_id' => $request->section_id
        ]);


        $json = json_decode($request->permission, true);
        $role->permission()->sync($json);
        return redirect()->route('index.role', ['message' => 'Modified successfully']);
    }



    public function index()
    {
        $data = role::with('section')->paginate(10);
        return Inertia::render('Management/Roles/Index', [
            'data' => $data,
        ]);
        return view('managers.role.index');
    }

    public function json()
    {
        $data = role::with('section')->paginate(10);
        return response()->json(['data' => $data]);
    }
}
