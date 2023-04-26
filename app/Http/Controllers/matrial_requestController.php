<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\matrial_request;
use App\matrial_attr;
use Illuminate\Support\Facades\Validator;
use DB;
use Carbon\Carbon;
use App\workflow;
use App\notification;
use App\flowworkStep;
use App\matrial_request_cycle;
use App\attachment_matrial_cycle;
use App\Exceptions\CustomException;
use App\Jobs\sendcc;
use App\matrial_request_attachment;
use App\Jobs\rolecc;

use App\User\matrialrequest\MSaveFiles;
use App\User\matrialrequest\MItem;

use App\matrial_condition as note;
use App\Events\NotificationEvent;
use App\project;
use Exception;
use Inertia\Inertia;
use App\User\Email\cc;
use App\Project\ProjectSelectBox;
use App\InterFace\WorkFlow\find ;
use App\InterFace\WorkFlow\steps ;
use App\User\matrialrequest\query;
use App\User\matrialrequest\Mcycle;
use App\User\matrialrequest\Mupdate;

use App\explode\explodeRef;
use App\getlatest\latest ;
class matrial_requestController extends Controller
{

use MSaveFiles , MItem  , find , query , steps ,
ProjectSelectBox,Mcycle , explodeRef , Mupdate , latest
;

 


    public function __construct()
    {
      $this->type = 'matrial_request';
    }


    public function matrial_requestprereturn(request  $request)
    {

        $data  =
            [
                'ref' => $request->def,
                'to' => $request->to,
                'date' => $request->date,
                'subject' => $request->subject,
                'content' => $request->content,
                'attributes' => json_decode($request->attr, true),
                'note' => json_decode($request->condition, true),
            ];

        return Inertia::render('User/MatrialRequest/Preview');

        return view('matrial_request.previewdef')->with(['data' => $data]);
    }

    public function create()
    {
        $projects =  $projects = $this->ProjectSelectBox(['id','name','po_expenses','po_budget']);


        $data = matrial_request::latest()->first();


        $explode = $this->explodeRef($data->ref,'MR-');


        return Inertia::render('User/MatrialRequest/Create', ['reference' => 'MR-' . '' . $explode[1] + 1, 'projects' => $projects]);
    }

    public function insarting(request $request)
    {
        $data =  $this->validate($request, [
            'quotation' => ['string', 'max:255'],
            'project_id' => ['required', 'numeric', 'max:255'],
            'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],


            'ref' => ['string', 'max:255'],
            'to' => ['required','string', 'max:255'],

        ]);

        try {

            DB::transaction(function () use ($request, $data) {
  

                $data = $this->latest(new Purchase_order);

        

                $explode = $this->explodeRef($data->ref,'MR-');


                $matrial_request = $this->Mcreate($request,$explode);



                $attributes = json_decode($request->attr, true);
                $users = json_decode($request->users, true);

              

                $this->saveFile($request,$matrial_request->id);

           

                $this->Item($attributes,$matrial_request);
 

 
                $content   = 'user name:'.' '.auth()->user()->name ?? ''.'Project Name:'.' '.$matrial_request->project->name ?? ''.'has been created:' .' '. $matrial_request->ref . 'is waiting for review';
 
$cc = new cc;

             $cc->mail($users ?? [] ,$matrial_request,$content);
               
           
                $workflow  =   $this->find($this->type);
               
               
           $cc->mail($workflow->role->user,$matrial_request,$content);
  
                



           $this->cycle(1,$matrial_request,$workflow);


                return redirect()->route('user.index_matrial_request', ['message' => 'Created successfully']);

            });
        } catch (Exception $e) {
            return $e;
        }
    }

    public function matrial_requestreturn($matrial_request)
    {
        if (is_numeric($matrial_request)) {

          

            $data = $this->Qpreview($matrial_request);


            if (!empty($data)) {
                return Inertia::render('User/MatrialRequest/Preview', ['dataFromController' => $data,]);
                return view('matrial_request.preview')->with(['data' => $data]);
            }
        }
    }


    public function index()
    {

        $mattrial_requestworkflow =  $this->steps($this->type);

        $matrial_request = $this->QIndex();

        return Inertia::render('User/MatrialRequest/Index', [
            'data' => $matrial_request,
            'workflow' => $mattrial_requestworkflow
        ]);


    }

    public function returnasjson()
    {
        $matrial_request = auth()->user()->matrial_request()->orderBy('created_at', 'DESC')
            ->with(['matrial_request_cycle' => function ($q) {
                return   $q->with('role');
            }])->paginate(10);

        return response()->json(['data' => $matrial_request]);
    }

    public function delete(matrial_request $matrial_request)
    {
      
            $matrial_request->delete();
        
    }




    public function edit($matrial_request)
    {
        if (is_numeric($matrial_request)) {
           $projects = $this->ProjectSelectBox(['id','name','po_expenses','po_budget']);

            $data = $this->Qupdate($matrial_request);

            if (!empty($data)) {
                return Inertia::render('User/MatrialRequest/Edit', [
                    'data' => $data,
                    'projects' => $projects
                ]);
            }
        }
    }

    public function action(request $request, matrial_request $matrial_request)
    {


        $data =  $this->validate($request, [
            'quotation' => ['string', 'max:255'],
            'project_id' => ['required', 'numeric', 'max:255'],
            'date' => ['required', 'date', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],


            'ref' => ['string', 'max:255'],
            'to' => ['string', 'max:255'],


        ]);

        try {

            DB::transaction(function () use ($request, $matrial_request, $data) {
       

                $this->Mupdate($matrial_request,$request);


                if ($request->deletedfiles) {
                    matrial_request_attachment::find($request->deletedfiles)->delete();
                }

                $matrial_request_cycle =  $matrial_request->matrial_request_cycle()->delete();

               
           
                $workflow  =   $this->find($this->type);
               
                $content = 'matrial_request request has been modified' . '' . $matrial_request->ref;
             


           $this->mail($workflow->role->user,$matrial_request,$content);
  

                $attributes = json_decode($request->attr, true);


                $this->saveFile($request,$matrial_request->id);

           

                $this->cycle(1,$matrial_request,$workflow);



                if (!empty($matrial_request->attributes)) {
                  
                        $matrial_request->attributes->delete();
                    
                }



                $this->Item($attributes,$matrial_request);
 



                return redirect()->route('user.index_matrial_request', ['message' => 'Modified successfully']);
            });
        } catch (Exception $e) {
            return $e;
        }
    }
}
