<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\petty_cash;
use App\petty_attr;
use App\notification;
use App\workflow;
use App\flowworkStep;
use Illuminate\Support\Str;
use App\Jobs\sendcc;
use Carbon\Carbon;
use App\Jobs\rolecc;
use App\petty_cash_attachment;
use App\petty_cash_cycle;
use Illuminate\Support\Facades\Validator;
use DB;
use App\Exceptions\CustomException;
use App\Events\NotificationEvent;
use App\project;
use Inertia\Inertia;
use App\facede_pattern\CreatePC;
use App\facede_pattern\EditPC;



use App\FileManager\SaveFiles;
use App\attributes\IItemManager;

class petty_cashController extends Controller
{
    use EditPC;
  
private $SaveFiles;

private $IItemManager;
    public function __construct(SaveFiles $SaveFiles  , IItemManager $IItemManager)
    {
   
       
$this->SaveFiles = $SaveFiles;
$this->IItemManager = $IItemManager;



    }



    public function edit($petty_cash)
    {

        if (is_numeric($petty_cash)) {
            $data = petty_cash::where('id', $petty_cash)->with(['petty_cash_cycle' => function ($q) {
                return  $q
                    ->with(['comment_petty_cash_cycle' => function ($qu) {
                        return $qu->with('attachment_petty_cash_cycle');
                    }])->with('role');
            }])->with(['attributes', 'petty_cash_attachment'])->first();
            if (!empty($data)) {
                $projects = project::all();
                return Inertia::render('User/PettyCash/Edit', ['data' => $data, 'projects' => $projects]);
                return view('petty_cash.update')->with('data', $data);
            }
        }
    }

    public function update(request $request, petty_cash $petty_cash)
    {

        $data =  $this->validate($request, [
            'project_id' => ['required', 'numeric'],
            'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],

            'to' => ['string', 'max:255'],
            'total' => ['required', 'numeric', 'digits_between:1,99999999'],

        ]);
        try {

            DB::transaction(function () use ($request, $data, $petty_cash) {

                $this->edit($petty_cash,$request,$this->SaveFiles, $this->IItemManager);

                return redirect()->route('user.index_petty_cash', ['message' => 'Modified successfully']);
            });
        } catch (Exception $e) {
            return $e;
        }
    }

    public function index()
    {
        $petty_cashworkflow =    workflow::where('name', 'petty_cash')->with(['flowworkStep' => function ($q) {
            return     $q->with('role');
        }])->first();
        $petty_cash = auth()->user()->petty_cash()->orderBy('created_at', 'DESC')
            ->with(['petty_cash_cycle' => function ($q) {
                return   $q->with('role');
            }])->paginate(10);
        return Inertia::render('User/PettyCash/Index', [
            'data' => $petty_cash,
            'workflow' => $petty_cashworkflow
        ]);
        return view('petty_cash.index')->with(['data' => $petty_cash, 'workflow', $petty_cashworkflow]);
    }

    public function prepetty_cashreturn(request  $request)
    {

        return Inertia::render('User/PettyCash/Preview');
    }

    public function create()
    {
        $projects = project::all();
        $data = petty_cash::latest()->first();
        $explode = explode("-", $data->ref ?? 'PC-' . '' . '0');
        return Inertia::render('User/PettyCash/Create', ['reference' => 'PC-' . '' . $explode[1] + 1, 'projects' => $projects]);
    }

    public function insrting(request $request)
    {

        $data =  $this->validate($request, [
            'project_id' => ['required', 'numeric', 'max:255'],
       //     'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],

            'to' => ['string', 'max:255'],
            'total' => ['required', 'numeric'],

        ]);
        try {

            DB::transaction(function () use ($request, $data) {

  

$CreatePC = new CreatePC;

$CreatePC->create($request,$this->SaveFiles, $this->IItemManager );


    return redirect()->route('user.index_petty_cash', ['message' => 'Created successfully']);
            });
        } catch (Exception $e) {
            return $e;
        }
    }

    public function petty_cashreturn($petty_cash)
    {
        if (is_numeric($petty_cash)) {

            $data = petty_cash::where('id', $petty_cash)->with(['attributes'])->with(['petty_cash_cycle' => function ($q) {
                return  $q
                    ->with(['comment_petty_cash_cycle' => function ($qu) {
                        return $qu->with('user');
                    }]);
            }])->with('project')->first();

            if (!empty($data)) {
                return Inertia::render('User/PettyCash/Preview', ['dataFromController' => $data,]);
                return view('petty_cash.preview')->with(['data' => $data]);
            }
        }
    }





    public function returnasjson()
    {
        $petty_cash = auth()->user()->petty_cash()->orderBy('created_at', 'DESC')
            ->with(['petty_cash_cycle' => function ($q) {
                return   $q->with('role');
            }])->paginate(10);
        return response()->json(['data' => $petty_cash]);
    }


    public function delete(petty_cash $petty_cash)
    {
        if ($petty_cash->user_id == auth()->user()->id) {
            $petty_cash->delete();
        }
    }
}
