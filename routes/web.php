<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Jobs\qremail;
use Illuminate\Support\Str;
use App\Events\NotificationEvent;
use App\Http\Controllers\contractor_employee;
use App\Http\Controllers\contractorController;
use App\Http\Controllers\contractWithSubcontractorController;
use App\Http\Controllers\daily_reportController;
use App\Http\Controllers\DcController;
use App\Http\Controllers\employeeController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\matrial_requestController;
use App\Http\Controllers\MyProfileController;
use App\Http\Controllers\petty_cashController;
use App\Http\Controllers\pricing_supplierController;
use App\Http\Controllers\productController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\projectManagerController;
use App\Http\Controllers\purchaseController;
use App\Http\Controllers\rfqController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\serviceController;
use App\Http\Controllers\siteController;
use App\Http\Controllers\subcontractorController;
use App\Http\Controllers\supplierController;
use App\Http\Controllers\tenderController;
use App\Http\Controllers\userController;
use App\Http\Controllers\sectionController;

use App\Http\Controllers\managercontractwithsubcontractorController;

use App\Http\Controllers\managerpricing_supplierController;

use App\Http\Controllers\projectController;

use App\Http\Controllers\reportController;

use App\Http\Controllers\financialController;

use App\Http\Controllers\managerServiceController;

use App\Http\Controllers\salariesController;


use App\Http\Controllers\managersdaily_reportController;

use App\Http\Controllers\LaborerattendingController;

use App\Http\Controllers\customerController;
use App\Http\Controllers\customizeWorkflowController;
use App\Http\Controllers\employeemanagerController;
use App\Http\Controllers\HRController;
use App\Http\Controllers\invoiceController;
use App\Http\Controllers\LaborerController;
use App\Http\Controllers\ManagerJobOfferController;
use App\Http\Controllers\managerpurchaseController;
use App\Http\Controllers\managersMatrialrequestController;
use App\Http\Controllers\marketingController;
use App\Http\Controllers\taskManagerController;
use App\Http\Controllers\usersupplierController;
use App\Http\Middleware\laborer;
use App\project;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

Route::middleware([laborer::class])->group(function () {

    // ------------------------- * * * User profile * * * ---------------------------------

    Route::group(['prefix' => 'profile'], function () {

        Route::get('/timesheet', [MyProfileController::class, 'mytimesheet'])->name('mytimesheet');

        Route::post('/jsontimesheet', [MyProfileController::class, 'jsontimesheet']);

        Route::get('/', 'MyProfileController@profile')->name('my.profile');
    });

    //---------------------------** Suppliers ** -----------------------------------

    Route::post('/getselectboxsupp', 'usersupplierController@getselectboxsupp')->name('user.getselectboxsupp');
    Route::get('/createsupplier', [usersupplierController::class, 'createpage'])->name('user.createpage');
    Route::get('/supplierselex', 'usersupplierController@supplierselex')->name('user.supplierselex');
    Route::get('/suppilercount', 'usersupplierController@suppilercount')->name('user.suppilercount');

    Route::post('/createsupp', [usersupplierController::class, 'createsupp'])->name('user.createsupp');

    Route::get('/suppliertable', [usersupplierController::class, 'suppliertable'])->name('user.suppliertable');

    Route::get('/supplierjson', 'usersupplierController@supplierjson')->name('user.supplierjson');

    Route::post('/updatesupp/{supplier}', [usersupplierController::class, 'updatesupp'])->name('user.updatesupp');

    //---------------------------------** ends of suppliers ** --------------------------------



    // ----------------------- pricing supplier -----------------------------------


    Route::get('/pricing_supplierindex', [pricing_supplierController::class, 'index'])->name('pricing_supplierindex');

    Route::get('/pricing_suppliercreate', [pricing_supplierController::class, 'create'])->name('pricing_suppliercreate');

    Route::get('/pricing_supplierjson', 'pricing_supplierController@pricing_supplierjson')->name('pricing_supplierjson');

    Route::POST('/pricing_supplierselect', 'pricing_supplierController@pricing_supplierselect')->name('pricing_supplierselect');

    Route::post('/pricing_supplierinsert', [pricing_supplierController::class, 'insert'])->name('pricing_supplierinsert');


    Route::post('/pricing_supplierdelete/{ids}', 'pricing_supplierController@delete')->name('pricing_supplierdelete');


    Route::post('/pricing_supplierupdate/{pricing_supplier}', [pricing_supplierController::class, 'update'])->name('pricing_supplierupdate');


    Route::get('/pricing_supplierpreview/{pricing_supplier}', [pricing_supplierController::class, 'preview'])->name('pricing_supplierpreview');


    Route::post('/pricing_suppliersAutoComplete', [pricing_supplierController::class, 'pricing_suppliersAutoComplete'])->name('pricing_suppliersAutoComplete');

    Route::post('/getricingdetails/{pricing_supplier}', [pricing_supplierController::class, 'getricingdetails'])->name('getricingdetails');


    Route::get('/pricing_supplieredit/{pricing_supplier}', [pricing_supplierController::class, 'edit'])->name('pricing_supplieredit');



    //--------------------------------------* * employee_by_role * ** -----------------------------


    Route::get('/employee_by_role/{role}', [userController::class, 'employee_by_role'])->name('user.employee_by_role');


    //-----------------------------------   ** role **    ------------------------------------------


    Route::get('/rolechunk', [RoleController::class, 'rolechunk'])->name('role.rolechunk');

    //-------------------------------------------------------------------------------



    Route::get('/start_day', [LaborerattendingController::class, 'start_day'])->name('laborer.start_day');




    Route::group(['prefix' => 'service'], function () {
        #create page
        Route::get('/create', [serviceController::class, 'create'])->name('user.service.create');


        Route::get('/index', [serviceController::class, 'index'])->name('user.service.index');

        Route::get('/preview/{service}', [serviceController::class, 'servicereturn'])->name('user.service.preview');


        Route::get('/edit/{service}', [serviceController::class, 'edit'])->name('user.service.edit');


        Route::post('/update/{service}', [serviceController::class, 'update'])->name('user.service.update');


        Route::get('/preview2', [serviceController::class, 'preview2'])->name('user.service.preview2');


        Route::post('/insert', [serviceController::class, 'insrting'])->name('user.service.insert');


        Route::post('/delete/{service}', [serviceController::class, 'delete'])->name('user.service.json');


        Route::post('/json', 'serviceController@json')->name('user.service.json');
    });



    // ---------------------------- * * *  JobOffer * * * ------------------------------



    Route::group(['prefix' => 'joboffer'], function () {
        #create page
        Route::get('/create', [JobOfferController::class, 'create'])->name('user.joboffer.create');

        Route::get('/index', [JobOfferController::class, 'index'])->name('user.joboffer.index');

        Route::get('/preview/{joboffer}', [JobOfferController::class, 'preview'])->name('user.joboffer.preview');

        Route::get('/update/{joboffer}', [JobOfferController::class, 'update'])->name('user.joboffer.update');

        Route::post('/updating/{joboffer}', [JobOfferController::class, 'action'])->name('user.joboffer.action');


        Route::get('/preview2', [JobOfferController::class, 'preview2'])->name('user.joboffer.preview2');


        Route::post('/insert', [JobOfferController::class, 'insert'])->name('user.joboffer.insert');


        Route::post('/json', 'JobOfferController@json')->name('user.joboffer.json');
    });




    Route::get('/qremail', 'qrController@qr')->name('qr');

    Route::get('qr/{num}', 'qrController@find')->name('find.qr');



    Route::group(['prefix' => 'tender'], function () {

        Route::get('/', [tenderController::class, 'index'])->name('tender.index');

        Route::get('/update/{marketing}', [tenderController::class, 'update'])->name('tender.update');

        Route::post('/response/{marketing}', [tenderController::class, 'responses'])->name('tender.response');

        Route::post('/json', 'tenderController@json')->name('tender.json');
    });

    Route::group(['prefix' => 'marketing'], function () {

        Route::get('/create', [marketingController::class, 'create'])->name('marketing.create.user');

        Route::post('/add', [marketingController::class, 'add'])->name('marketing.add.user');

        Route::post('/json', [marketingController::class, 'json'])->name('marketing.json.user');

        Route::post('/delete/{marketing}', [marketingController::class, 'delete'])->name('marketing.delete.user');


        Route::get('/', [marketingController::class, 'index'])->name('marketing.index.user');

        Route::get('/edit/{marketing}', [marketingController::class, 'edit'])->name('marketing.edit.user');

        Route::post('/update/{marketing}', [marketingController::class, 'update'])->name('marketing.update.user');
    });


    // -----------------------  project manager * * * -----------------------------------
    Route::group(['prefix' => 'project_manager'], function () {


        Route::group(['prefix' => 'laborer'], function () {

            Route::get('/create', [projectManagerController::class, 'create_laborer'])->name('projectmanager.create_laborer');

            Route::get('/edit/{User}', [projectManagerController::class, 'edit_laborer'])->name('projectmanager.edit_laborer');

            Route::get('/', [projectManagerController::class, 'index_laborer'])->name('projectmanager.index_laborer');

            Route::get('/json', [projectManagerController::class, 'json_laborer'])->name('projectmanager.json_laborer');

            Route::post('/add', [projectManagerController::class, 'add_laborer'])->name('projectmanager.add_laborer');

            Route::post('/update/{User}', [projectManagerController::class, 'update_laborer'])->name('projectmanager.update_laborer');
        });


        Route::group(['prefix' => 'attendance'], function () {

            Route::post('/post', 'projectManagerController@attendance_absence_manule')->name('projectmanager.attendance_absence_manule');

            Route::get('/', 'projectManagerController@manule_attendance')->name('projectmanager.attendance_absence_manule');
        });

        Route::group(['prefix' => 'report'], function () {
            Route::get('/summary', 'projectManagerController@projectstimesheetPage')->name('projectmanager.projectstimesheetPage');

            Route::post('/jsonprojectReport', 'projectManagerController@jsonprojectReport')->name('projectmanager.jsonprojectReport');
        });



        Route::group(['prefix' => 'timesheet'], function () {

            Route::get('/', [projectManagerController::class, 'timesheet'])->name('projectmanager.timesheet');

            Route::post('/jsontimesheet', [projectManagerController::class, 'jsontimesheet'])->name('projectmanager.jsontimesheet');
        });

        // ------------------------------- * * *  cost center * * *  ---------------------------------------
        Route::group(['prefix' => 'costcenter'], function () {
            Route::post('/json/{id}', 'projectManagerController@costcenterjson')->name('projectmanager.jsoncostcenter');

            Route::get('/', 'projectManagerController@costcenter')->name('projectmanager.costcenter');
        });
        Route::group(['prefix' => 'DCC'], function () {
            //----------------------** dc **------------------------------------------
            Route::post('/jsondc', 'projectManagerController@data')->name('dc.data');

            Route::post('/jsondcpo', [projectManagerController::class, 'podata'])->name('podata');


            Route::post('/jsondcmatrial_request', [projectManagerController::class, 'matrial_requestdata'])->name('matrial_request');


            Route::post('/jsondcpetty_cash', [projectManagerController::class, 'petty_cashdata'])->name('petty_cashdata');


            Route::post('/jsondcsubcontractor', [projectManagerController::class, 'subcontractordata'])->name('subcontractordata');

            Route::post('/summary', [projectManagerController::class, 'summary'])->name('dcsummary');

            Route::get('/index', [projectManagerController::class, 'index'])->name('projectManager.dc.index');
        });
    });


    // ------------------------ * * * Daily Report * * * ------------------------

    Route::group(['prefix' => 'daily_report'], function () {

        Route::get('/index', [daily_reportController::class, 'index'])->name('daily_report_index.user');

        Route::get('/create', [daily_reportController::class, 'create'])->name('daily_report_create.user');



        Route::get('/project_manager', [daily_reportController::class, 'project_manager_daily_report'])->name('project_manager_daily_report.user');

        Route::post('/json_project_manager', [daily_reportController::class, 'json_project_manager_daily_Report'])->name('json_project_manager_daily_Report.user');


        Route::get('/preview/{dailyReport}', [daily_reportController::class, 'preview'])->name('daily_report_preview.user');


        Route::get('/edit/{dailyReport}', [daily_reportController::class, 'edit'])->name('daily_report_edit.user');

        Route::post('/updating/{dailyReport}', [daily_reportController::class, 'updating'])->name('updating_daily_Report.user');

        Route::post('/json_daily_Report', [daily_reportController::class, 'json_daily_Report'])->name('json_daily_Report.user');

        Route::post('/inserting', [daily_reportController::class, 'inserting'])->name('inserting.user');

        Route::post('/supervisor/{project}', [daily_reportController::class, 'supervisor'])->name('supervisor.user');

        Route::post('/delete/{dailyReport}', [daily_reportController::class, 'delete'])->name('delete.user');
    });



    // -------------------------- contractor ----------------------------------

    Route::get('/CHunking_contractor_data',  [contractor_employee::class, 'CHunking_contractor_data'])->name('user.CHunking_contractor_data');

    Route::get('/contractor/update/{contractor}', [contractor_employee::class, 'updatecontractorpage'])->name('user.updatecontractorpage');

    Route::get('/contractorcpage', [contractor_employee::class, 'addcpage'])->name('user.addcpage');

    Route::post('/contractor', [contractor_employee::class, 'contractor'])->name('user.contractor');

    Route::get('/contractorjson', [contractor_employee::class, 'contractorjson'])->name('user.contractorjson');

    Route::get('/contractorindex', [contractor_employee::class, 'index'])->name('user.contractorindex');

    Route::get('/contractordebetor', [contractor_employee::class, 'contractordebetor'])->name('user.contractordebetor');

    Route::post('/deletecontractor/{ids}', [contractor_employee::class, 'delete'])->name('user.deletecontractor');

    Route::post('/updatecontractor/{contractor}', [contractor_employee::class, 'updatecontractor'])->name('user.updatecontractor');



    //----------------------------------** User Task --------------------------

    Route::get('/task/index', 'EmployeeTaskController@index')->name('index.task.Emp');

    Route::get('/task/editTask/{task}', 'EmployeeTaskController@editTask')->name('index.task.editTask');

    Route::post('/task/mission_completed/{task}', 'EmployeeTaskController@mission_completed')->name('index.task.mission_completed');

    Route::post('/task/JsonTaskData', 'EmployeeTaskController@JsonTaskData')->name('json.task.Emp');
    //---------------------------------------------------------------------------
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('/readnot/{notification}', 'NotificationController@readnot')->name('readnot');

    Route::post('/addfile', 'processingController@addfile')->name('addfile');



    //---------------*Auto complete cws *-----------------------------------
    Route::post('/chunkcws', 'contractWithSubcontractorController@chunkcws')->name('chunkcws');

    //---------------*select box getCostCenter *-----------------------------------
    Route::post('/getCostCenter', 'CostcenterController@getCostCenter')->name('getCostCenter');

    //---------------*select box getCostCenter *-----------------------------------
    Route::get('/getCostCenterSelectBoxwithoutprameter', 'CostcenterController@getCostCenterSelectBoxwithoutprameter')
        ->name('getCostCenterSelectBoxwithoutprameter');


    //---------------*json pagination *-----------------------------------
    Route::post('/jsoncostcenter', 'CostcenterController@jsoncostcenter')->name('jsoncostcenter');



    //---------------*json pagination *-----------------------------------
    Route::get('/costcenter/table', 'CostcenterController@index')->name('indexcostcenter');

    //---------------*json pagination *-----------------------------------
    Route::post('/recordcostcenter', 'CostcenterController@record')->name('recordcostcenter');

    //---------------*update cost center *-----------------------------------


    Route::post('/costcenterupdate/{cost_center}', 'CostcenterController@update')->name('costcenter.update');
    //--------------- *suppliers autocomlete * ---------------------------
    Route::get('/supplierselex', [supplierController::class, 'supplierselex'])->name('supplierselex');
    //-----------------------------------------------------------------------


    // ----------------------**  ** ----------------------


    Route::post('/contractor_autotComplete', [contractorController::class, 'getselectboxcontractor'])->name('getselectboxcontractor');


    //---------------** product autoComplete **------------------------------
    Route::post('/autoCompleteProduct', [productController::class, 'autoCompleteProduct'])->name('autoCompleteProduct');
    //-----------------------------------------------------------------------




    // -------------------** chunking users ** -------------------------------------------
    Route::get('/CHunking_user', [userController::class, 'CHunking_user'])->name('user.CHunking_user');
    //--------------------------------------------------------------------------------------



    Route::group(['prefix' => 'cws'],  function () {

        Route::get('/preview/{contract_withsubcontractor}', [contractWithSubcontractorController::class, 'preview'])->name('user.updatepagecws');


        Route::get('/updatepage/{contract_withsubcontractor}', [contractWithSubcontractorController::class, 'updatepage'])->name('user.updatepagecws');

        Route::post('/updating/{contract_withsubcontractor}', [contractWithSubcontractorController::class, 'updating'])->name('user.updatecws');



        Route::post('/Insert', [contractWithSubcontractorController::class, 'contract_withsubcontractorinsrting'])->name('user.subcontractorinsrting');

        Route::get('/create', [contractWithSubcontractorController::class, 'create'])->name('user.createsubcontractorinv');

        Route::get('/index', [contractWithSubcontractorController::class, 'index'])->name('user.index_CWS');

        Route::get('/returnasjson',   [contractWithSubcontractorController::class, 'returnasjson'])->name('user.returnasjson');
    });


    Route::group(['prefix' => 'admin', 'middleware' => ['auth' => 'admin']], function () {
        //Admin

        Route::get('/project_index', [projectController::class, 'index'])->name('project.index');
        Route::get('/project_edit/{project}', [projectController::class, 'edit'])->name('project.edit');
        Route::get('/project_json', [projectController::class, 'json'])->name('project.json');
        Route::post('/update_project/{project}', [projectController::class, 'update'])->name('project.update');
        Route::post('/delete_project/{project}', [projectController::class, 'delete'])->name('project.delete');
        Route::post('/post_project', [projectController::class, 'create'])->name('project.create');


        Route::get('/user/rig', [userController::class, 'rig'])->name('user.rig');

        Route::get('/user/edit/{User}', [userController::class, 'edit'])->name('user.edit');

        Route::post('/user/updateuser/{User}', [userController::class, 'update'])->name('user.update');

        Route::post('/user/adminornot/{User}', [userController::class, 'adminornot'])->name('user.adminornot');

        Route::post('/user/managerornot/{User}', [userController::class, 'managerornot'])->name('user.managerornot');



        Route::get('/user/role', [userController::class, 'role'])->name('user.role');



        Route::post('/user/add', [userController::class, 'add'])->name('user.add');
    });

    Route::group(['middleware' => ['auth' => 'user']], function () {
        Route::get('/home', 'HomeController@index')->name('home');
        Route::get('/user/createpurchaseorder', [purchaseController::class, 'createpurchaseorder'])->name('user.purchase');
        Route::post('/user/insarting_data', [purchaseController::class, 'insarting_data'])->name('user.insarting_data');

        Route::post('/user/delete_data/{Purchase_order}', [purchaseController::class, 'delete'])->name('user.delete_data');

        Route::get('/user/prepurchasereturn', [purchaseController::class, 'prepurchasereturn'])->name('user.prepurchasereturn');


        Route::get('/user/purchase_table', [purchaseController::class, 'index'])->name('user.purchase_tablez');



        Route::get('/user/purchase_update/{Purchase_order}', [purchaseController::class, 'update'])->name('user.purchase_upate');

        Route::post('/user/purchase_action/{Purchase_order}', [purchaseController::class, 'action'])->name('user.purchase_action');




        Route::get('/user/returnasjson', 'purchaseController@returnasjson')->name('user.returnasjson');

        Route::get('/user/purchasereturn/{Purchase_order}', [purchaseController::class, 'purchasereturn'])->name('user.purchasereturn');
        //users
        Route::post('/user/userautocomplete', [userController::class, 'autocomplete'])->name('user.userautocomplete');


        Route::get('/selectproject', [projectController::class, 'selectproject'])->name('project.selectproject');



        //subcontractor

        //-------------------- Archives -----------------------
        Route::get('/user/Archives', [subcontractorController::class, 'Archives'])->name('user.Archives');

        Route::post('/user/jsonArchives', 'subcontractorController@jsonArchives')->name('user.jsonArchives');
        //---------------------------------------------------------------


        Route::post('/user/subcontractor/update/{subcontractor}', [subcontractorController::class, 'updating'])->name('user.createsubcontractorinvupdate');

        Route::get('/user/subcontractor/updatepage/{subcontractor}', [subcontractorController::class, 'updatepage'])->name('user.createsubcontractorinvupdatepage');

        Route::post('/user/subcontractorinsrting/{contract_withsubcontractor}', [subcontractorController::class, 'subcontractorinsrting'])->name('user.subcontractorinsrting');

        Route::get('/user/createsubcontractorinv/{contract_withsubcontractor}', [subcontractorController::class, 'create'])->name('user.createsubcontractorinv');

        Route::get('/user/index_subcontractor_inv/{contract_withsubcontractor}',  [subcontractorController::class, 'index'])->name('user.index_subcontractor_inv');

        Route::get('/user/subcontractorreturn/{subcontractor}', [subcontractorController::class, 'subcontractorreturn'])->name('user.subcontractorreturn');

        Route::get('/user/returnsubcontractorasjson/{contract_withsubcontractor}', 'subcontractorController@returnasjson')->name('user.returnasjson');

        Route::get('/user/presubcontractorreturn', 'subcontractorController@presubcontractorreturn')->name('user.presubcontractorreturn');






        Route::post('/user/delete_contractora_data/{subcontractor}', 'subcontractorController@delete')->name('user.contractoradelete');




        //frq

        Route::post('/user/frqinsrting', [rfqController::class, 'insrting'])->name('user.frqinsrting');

        Route::get('/user/createfrqinv', [rfqController::class, 'create'])->name('user.createfrqinv');

        Route::get('/user/index_frq_inv', [rfqController::class, 'index'])->name('user.index_frq_inv');

        Route::get('/user/frqreturn/{rfq}', [rfqController::class, 'frqreturn'])->name('user.frqreturn');

        Route::get('/user/returnfrqasjson', 'rfqController@returnasjson')->name('user.returnasjson');

        Route::get('/user/prefrqreturn', [rfqController::class, 'prefrqreturn'])->name('user.prefrqreturn');





        Route::post('/user/delete_frq_data/{rfq}', 'rfqController@delete')->name('user.frqadelete');



        //employee

        Route::post('/user/employeeinsrting', [employeeController::class, 'insrting'])->name('user.employeeinsrting');
        Route::get('/user/createemployeeinv', [employeeController::class, 'create'])->name('user.createemployeeinv');
        Route::get('/user/index_employee_inv', [employeeController::class, 'index'])->name('user.index_employee_inv');
        Route::get('/user/employeereturn/{employee}', [employeeController::class, 'employeereturn'])->name('user.employeereturn');
        Route::get('/user/preemployeereturn', [employeeController::class, 'preemployeereturn'])->name('user.preemployeereturn');
        Route::get('/user/returnemployeeasjson', 'employeeController@returnasjson')->name('user.returnasjson');
        Route::post('/user/delete_employee_data/{employee}', [employeeController::class, 'delete'])->name('user.employeeadelete');





        //site

        Route::post('/user/siteinsrting', [siteController::class, 'insrting'])->name('user.siteinsrting');

        Route::get('/user/createsiteinv', [siteController::class, 'create'])->name('user.createsiteinv');

        Route::get('/user/index_site_inv', [siteController::class, 'index'])->name('user.index_site_inv');

        Route::get('/user/sitereturn/{site}', [siteController::class, 'sitereturn'])->name('user.sitereturn');

        Route::get('/user/returnsiteasjson', 'siteController@returnasjson')->name('user.sitereturnasjson');

        Route::get('/user/presitereturn', [siteController::class, 'presitereturn'])->name('user.presitereturn');

        Route::post('/user/delete_site_data/{site}', [siteController::class, 'delete'])->name('user.siteadelete');



        //----------------------------------** petty cash ** ---------------------------------------


        Route::post('/user/petty_cashinsrting', [petty_cashController::class, 'insrting'])->name('user.pettyinsrting');

        Route::get('/user/create_petty_cash', [petty_cashController::class, 'create'])->name('user.create_petty_cash');

        Route::get('/user/index_petty_cash', [petty_cashController::class, 'index'])->name('user.index_petty_cash');

        Route::get('/user/petty_cashreturn/{petty_cash}', [petty_cashController::class, 'petty_cashreturn'])->name('user.petty_cashreturn');

        Route::get('/user/returnpetty_cashasjson', 'petty_cashController@returnasjson')->name('user.returnpetty_cashasjson');


        Route::get('/user/prepetty_cashreturn', [petty_cashController::class, 'prepetty_cashreturn'])->name('user.prepetty_cashreturn');


        Route::get('/user/petty_cash_edit/{petty_cash}', [petty_cashController::class, 'edit'])->name('user.petty_cash_edit');

        Route::post('/user/petty_cash_update/{petty_cash}', [petty_cashController::class, 'update'])->name('user.petty_cash_update');




        Route::post('/user/delete_petty_cash_data/{petty_cash}', 'petty_cashController@delete')->name('user.delete_petty_cash_data');

        //-------------------------------- end petty cash ------------------------------------------------

        /// matrial_request
        Route::post('/user/matrial_request/update/{matrial_request}', [matrial_requestController::class, 'action'])->name('user.matrialaction');

        Route::get('/user/matrial_request/edit/{matrial_request}', [matrial_requestController::class, 'edit'])->name('user.matrial_requestedit');

        Route::post('/user/matrial_request_insrting', [matrial_requestController::class, 'insarting'])->name('user.matrialinsrting');

        Route::get('/user/create_matrial_request', [matrial_requestController::class, 'create'])->name('user.create_matrial_requestController');

        Route::get('/user/index_matrial_request', [matrial_requestController::class, 'index'])->name('user.index_matrial_request');

        Route::get('/user/matrial_requestreturn/{matrial_request}', [matrial_requestController::class, 'matrial_requestreturn'])->name('user.matrial_requestreturn');

        Route::get('/user/returnmatrial_requestasjson', 'matrial_requestController@returnasjson')->name('user.returnmatrial_requestasjson');

        Route::get('/user/matrial_requestpreview', [matrial_requestController::class, 'matrial_requestprereturn'])->name('user.matrial_requestprereturn');

        Route::post('/user/delete_matrial_request_data/{matrial_request}', [matrial_requestController::class, 'delete'])->name('user.matrial_request');
    });

    ///managers_matrial_request
    Route::group(['prefix' => 'managers', 'middleware' => ['auth' => 'manager']], function () {


        Route::get('/', function () {
            return Inertia::render('Management/Dashboard/Index', [
                'projects' => project::all()
            ]);
        });

        // -------------------------- contractor ----------------------------------

        Route::get('/contractor/profile/{contractor}', [contractorController::class, 'profile'])->name('profilecontractorpage');



        Route::get('/CHunking_contractor_data', [contractorController::class, 'CHunking_contractor_data'])->name('CHunking_contractor_data');

        Route::get('/contractor/update/{contractor}',   [contractorController::class, 'updatecontractorpage'])->name('updatecontractorpage');

        Route::get('/contractorcpage',   [contractorController::class, 'addcpage'])->name('addcpage');

        Route::post('/contractor',   [contractorController::class, 'contractor'])->name('contractor');

        Route::get('/contractorjson',   [contractorController::class, 'contractorjson'])->name('contractorjson');

        Route::get('/contractorindex',  [contractorController::class, 'index'])->name('contractorindex');


        Route::get('/contractordebetor', [contractorController::class, 'contractordebetor'])->name('contractordebetor');


        Route::post('/deletecontractor/{ids}', [contractorController::class, 'delete'])->name('deletecontractor');

        Route::post('/updatecontractor/{contractor}',   [contractorController::class, 'updatecontractor'])->name('updatecontractor');



        ///------------------------------- section --------------------------------------
        Route::group(['prefix' => 'department'], function () {

            Route::get('/', [sectionController::class, 'index'])->name('section.index');
            Route::get('/create', [sectionController::class, 'create'])->name('section.create');

            Route::get('/edit/{section}',   [sectionController::class, 'edit'])->name('section.edit');

            Route::post('/json',  [sectionController::class, 'json'])->name('section.json');

            Route::post('/insert',  [sectionController::class, 'insert'])->name('section.insert');

            Route::post('/update/{section}',   [sectionController::class, 'update'])->name('section.update');
        });

        // ------------------------------- * * * HR * * * ---------------------------------------------

        Route::group(['prefix' => 'HR'], function () {

            Route::get('/profile/{User}', [HRController::class, 'profile'])->name('profile');

            Route::get('/card/{User}',  [HRController::class, 'card'])->name('card');









            Route::group(['prefix' => 'attendance'], function () {

                Route::get('/',   [HRController::class, 'attendancetoday'])->name('attendancetoday');


                Route::post('/json',   [HRController::class, 'attendancejson'])->name('attendancejson');
            });
        });




        //  --------------------------------- * * * CWS * * * --------------------------------------------------


        Route::post('/action_CWS/{contract_withsubcontractor}', [managercontractwithsubcontractorController::class, 'action'])->name('managers.action_CWS');

        Route::get('/update_CWS/{contract_withsubcontractor}', [managercontractwithsubcontractorController::class, 'update'])->name('managers.update_cws_requestreturn');


        Route::get('/preview_CWS/{contract_withsubcontractor}',  [managercontractwithsubcontractorController::class, 'preview'])->name('managers.preview_requestreturn');

        Route::get('/index_CWS',  [managercontractwithsubcontractorController::class, 'index'])->name('managers.index_CWS');

        Route::post('/returnjsonCWS', [managercontractwithsubcontractorController::class, 'returnasjson'])->name('managers.returnjsonCWS');



        //---------------------------- * * pricing suppliers * * * -------------------------


        Route::group(['prefix' => 'pricing_supplier'],  function () {
            Route::get('/index', [managerpricing_supplierController::class, 'index'])->name('managers.pricing_supplier.index');

            Route::post('/json',  [managerpricing_supplierController::class, 'json'])->name('managers.pricing_supplier.json');

            Route::get('/preview/{pricing_supplier}',  [managerpricing_supplierController::class, 'preview'])->name('managers.pricing_supplier.preview');

            Route::get('/update/{pricing_supplier}',  [managerpricing_supplierController::class, 'update'])->name('managers.pricing_supplier.update');


            Route::post('/updating/{pricing_supplier}',   [managerpricing_supplierController::class, 'action'])->name('managers.pricing_supplier.updating');
        });

        //----------------- salaries controller ------------------------------------


        Route::group(['prefix' => 'report'],  function () {

            Route::get('/cost_center', [projectController::class, 'projectPage'])->name('projectPage');

            Route::post('/projectJson/{project}', [projectController::class, 'projectJson'])->name('projectJson');


            Route::post('/stockJson/{project}', [reportController::class, 'stock'])->name('stockJson');



            Route::post('/project_search', [reportController::class, 'project_search'])->name('project_search');



            Route::group(['prefix' => 'daily'],  function () {

                Route::group(['prefix' => 'financial'],  function () {

                    Route::get('/update/{financial_daily_report}', [financialController::class, 'update'])->name('daily.financial_create');

                    Route::get('/preview/{financial_daily_report}', [financialController::class, 'preview'])->name('daily.financial_preview');



                    Route::get('/', [financialController::class, 'index'])->name('daily.financial_index');


                    Route::post('/insert', [financialController::class, 'insert'])->name('daily.financial_insert');


                    Route::post('/confirm/{financial_daily_report}', [financialController::class, 'confirm'])->name('daily.financial_confirm');


                    Route::post('/json', [financialController::class, 'json'])->name('daily.financial_json');
                });
            });





            Route::group(['prefix' => 'company'],  function () {

                Route::get('/', [reportController::class, 'company'])->name('company_report');

            Route::post('/json', [reportController::class, 'company_json'])->name('company.json');


            });


            Route::group(['prefix' => 'cash_out'],  function () {

                Route::get('/', [reportController::class, 'cash_out'])->name('cash_out.report');

            Route::post('/json', [reportController::class, 'cash_out_json'])->name('cash_out.json');


            });


            Route::group(['prefix' => 'cash_in'],  function () {

                Route::get('/', [reportController::class, 'cash_in'])->name('cash_in.report');

            Route::post('/json', [reportController::class, 'cash_in_json'])->name('cash_in.json');


            });


            Route::group(['prefix' => 'performance'],  function () {

                Route::get('/', [reportController::class, 'performance'])->name('performance.report');

            Route::post('/json', [reportController::class, 'performance_json'])->name('performancejson');


            });


            
            Route::group(['prefix' => 'HR'],  function () {

            Route::post('/json', [reportController::class, 'HR_json'])->name('HRjson');


            });



                 Route::group(['prefix' => 'financial'],  function () {

                Route::get('/', [reportController::class, 'financial'])->name('financialjson');

            Route::post('/json', [reportController::class, 'financial_json'])->name('financialjson');


            });


            Route::group(['prefix' => 'commitment'],  function () {

                Route::get('/', [reportController::class, 'commitment'])->name('tenderjson');

            Route::post('/json', [reportController::class, 'commitment_json'])->name('tenderjson');


            });

            Route::group(['prefix' => 'department'],  function () {




                Route::group(['prefix' => 'tender'],  function () {

                    Route::post('/json', [reportController::class, 'tenderjson'])->name('tenderjson');

                    Route::get('/',  [reportController::class, 'tenderpage'])->name('tenderpage.report');
                });




                Route::group(['prefix' => 'marketing'],  function () {

                    Route::post('/json',  [reportController::class, 'marketingjson'])->name('marketingjson');

                    Route::get('/',  [reportController::class, 'marketingpage'])->name('marketingpage.report');
                });




                Route::group(['prefix' => 'procurement'],  function () {

                    Route::post('/json',  [reportController::class, 'procurementjson'])->name('procurementjson');

                    Route::get('/',  [reportController::class, 'procurementpage'])->name('procurementpage');
                });



                Route::group(['prefix' => 'construction'],  function () {

                    Route::post('/json', [reportController::class, 'jsonconstruction'])->name('jsonconstruction');

                    Route::get('/',  [reportController::class, 'construction'])->name('construction');
                });
            });



            Route::get('/stockpage',  [reportController::class, 'stockpage'])->name('stockpage');



            Route::get('/position',  [reportController::class, 'positiontimesheetPage'])->name('positiontimesheetPage');


            Route::post('/jsonpositionReport',  [reportController::class, 'jsonpositionReport'])->name('stockJson');




            Route::group(
                ['prefix' => 'project'],
                function () {
                    Route::get('/',  [reportController::class, 'projectstimesheetPage'])->name('projectstimesheetPage');


                    Route::post('/jsonprojectReport',  [reportController::class, 'jsonprojectReport'])->name('projectJson');
                }

            );
        });





        Route::group(['prefix' => 'service'], function () {
            #create page
            Route::get('/index', [managerServiceController::class, 'index'])->name('manager.service.index');

            Route::get('/preview/{service}', [managerServiceController::class, 'preview'])->name('manager.service.preview');

            Route::get('/update/{service}', [managerServiceController::class, 'edit'])->name('manager.service.edit');

            Route::post('/updating/{service}', [managerServiceController::class, 'action'])->name('manager.service.edit');

            Route::post('/delete/{service}', [managerServiceController::class, 'delete'])->name('manager.service.json');

            Route::post('/json', [managerServiceController::class, 'json'])->name('manager.service.json');
        });



        Route::group(['prefix' => 'salaries'],  function () {
            //salary approval
            Route::post('/salary_approval', [salariesController::class, 'salary_approval'])->name('salary_approval');

            Route::post('/jsonSalaries', [salariesController::class, 'jsonSalaries'])->name('jsonSalaries');

            Route::post('/upload', [salariesController::class, 'import'])->name('salary_import');


            Route::get('/index', [salariesController::class, 'index'])->name('salary_index');
        });



        // ------------------------ * *  * daily report * *  * ----------------------------


        Route::group(['prefix' => 'daily_report'], function () {

            Route::get('/index', [managersdaily_reportController::class, 'index'])->name('daily_report_index.managers');

            Route::get('/edit/{dailyReport}', [managersdaily_reportController::class, 'edit'])->name('daily_report_edit.managers');

            Route::post('/updating/{dailyReport}', [managersdaily_reportController::class, 'updating'])->name('updating_daily_Report.managers');

            Route::post('/json_daily_Report', [managersdaily_reportController::class, 'json_daily_Report'])->name('json_daily_Report.managers');

            Route::post('/delete/{daily_Report}', [managersdaily_reportController::class, 'inserting'])->name('delete.managers');


            Route::get('/preview/{dailyReport}', [managersdaily_reportController::class, 'preview'])->name('daily_report_preview.user');
        });




        //-------------------- ** table users ** ------------------------------------------

        Route::post('/attendance_absence', [LaborerattendingController::class, 'attendance_absence'])->name('user.attendance_absence');

        Route::post('/sortUsersByProject/{project}', [LaborerattendingController::class, 'sortUsersByProject'])->name('user.sortUsersByProject');

        Route::get('/attendance/Manule', [LaborerattendingController::class, 'attendance_Manule'])->name('attendance_Manule');


        Route::post('/attendance/{User}', [LaborerattendingController::class, 'attendance'])->name('user.attendance');


        Route::get('/user/usertable', [userController::class, 'usertable'])->name('user.usertable');

        Route::post('/user/jsonUser', [userController::class, 'jsonUser'])->name('user.jsonUser');

        Route::post('/user/{User}', [userController::class, 'delete'])->name('user.delete');





        //----------------------- customer -------------------------------


        Route::get('/CHunking_customer_data', [customerController::class, 'CHunking_customer_data'])->name('CHunking_customer_data');


        Route::get('/customer/update/{customer}', [customerController::class, 'updatecustomerpage'])->name('updatecustomerpage');

        Route::get('/addcpage', [customerController::class, 'addcpage'])->name('addcpage');

        Route::post('/customer', [customerController::class, 'customer'])->name('customer');

        Route::get('/customerjson', [customerController::class, 'customerjson'])->name('customerjson');

        Route::get('/customerindex', [customerController::class, 'index'])->name('customerindex');

        Route::get('/customerdebetor', [customerController::class, 'customerdebetor'])->name('customerdebetor');




        Route::post('/deletecustomer/{ids}', [customerController::class, 'delete'])->name('deletecustomer');


        Route::post('/updatecustomer/{customer}', [customerController::class, 'updatecustomer'])->name('updatecustomer');




        //-------------------------task -----------------------------------

        Route::get('/task/index', [taskManagerController::class, 'index'])->name('task.index');


        Route::post('/task/delete/{task}',  [taskManagerController::class, 'delete'])->name('task.delete');


        Route::post('JsonTaskData',  [taskManagerController::class, 'JsonTaskData'])->name('task.JsonTaskData');

        Route::post('/task/UpdatePostTask/{task}', [taskManagerController::class, 'UpdatePostTask'])->name('task.UpdatePostTask');

        Route::get('/task/Create',  [taskManagerController::class, 'create'])->name('dc.create');

        Route::get('/task/editTask/{task}',  [taskManagerController::class, 'editTask'])->name('task.editTask');

        Route::post('/task/PostTask',  [taskManagerController::class, 'PostTask'])->name('task.PostTask');

        //----------------------** dc **------------------------------------------
        Route::post('/jsondc', 'DcController@data')->name('dc.data');

        Route::post('/jsondcpo', [DcController::class, 'podata'])->name('podata');

        Route::post('/jsondcmatrial_request', [DcController::class, 'matrial_requestdata'])->name('matrial_request');

        Route::post('/jsondcpetty_cash', [DcController::class, 'petty_cashdata'])->name('petty_cashdata');

        Route::post('/jsondcsubcontractor', [DcController::class, 'subcontractordata'])->name('subcontractordata');

        Route::post('/jsonSalaries', [DcController::class, 'jsonSalaries'])->name('jsonSalaries');

        Route::post('/dcsummary', [DcController::class, 'summary'])->name('dcsummary');

        Route::get('/dcindex', [DcController::class, 'index'])->name('dc.index');


        //------------------- **customizeWorkflow ----------------------------------------

        Route::get('/customizeWorkpurchase', [customizeWorkflowController::class, 'workflowPurchase'])->name('customizeWorkpurchase');

        Route::post('/updateWorkflow', [customizeWorkflowController::class, 'updateWorkflow'])->name('updateWorkflow');

        // ----------------------- WorkFlow  cws  ---------------------------------

        Route::get('/workflowcws', 'customizeWorkflowController@workflowcws')->name('workflowcws');

        Route::post('/updatecwsWorkflow', 'customizeWorkflowController@updatecwsWorkflow')->name('updatecwsWorkflow');

        // ----------------------- WorkFlow  pricing_supplier  ---------------------------------

        Route::get('/workflowpricing_supplier', 'customizeWorkflowController@workflowpricing_supplier')->name('workflowpricing_supplier');

        Route::post('/updatepricing_supplierWorkflow', 'customizeWorkflowController@updatepricing_supplierWorkflow')->name('updatepricing_supplierWorkflow');

        // ----------------------- WorkFlow  employee  ---------------------------------

        Route::get('/workflowemployee', 'customizeWorkflowController@workflowemployee')->name('workflowemployee');

        Route::post('/updateemployeeWorkflow', 'customizeWorkflowController@updateemployeeWorkflow')->name('updateemployeeWorkflow');

        // ----------------------- WorkFlow  matrial_request  ---------------------------------

        Route::get('/workflowmatrial_request', [customizeWorkflowController::class, 'workflowmatrial_request'])->name('workflowmatrial_request');

        Route::post('/updatematrial_requestWorkflow', [customizeWorkflowController::class, 'updatematrial_requestWorkflow'])->name('updatematrial_requestWorkflow');

        // ----------------------- WorkFlow  employee  ---------------------------------

        Route::get('/workflowemployee', 'customizeWorkflowController@workflowemployee')->name('workflowemployee');

        Route::post('/updateemployeeWorkflow', 'customizeWorkflowController@updateemployeeWorkflow')->name('updateemployeeWorkflow');

        // ----------------------- WorkFlow  pricing_supplier  ---------------------------------

        Route::get('/workflowpricing_supplier', 'customizeWorkflowController@workflowpricing_supplier')->name('workflowpricing_supplier');

        Route::post('/updatepricing_supplierWorkflow', 'customizeWorkflowController@updatepricing_supplierWorkflow')->name('updatepricing_supplierWorkflow');


        // ----------------------- WorkFlow  cws  ---------------------------------

        Route::get('/workflowcws', 'customizeWorkflowController@workflowcws')->name('workflowcws');

        Route::post('/updatecwsWorkflow', 'customizeWorkflowController@updatecwsWorkflow')->name('updatecwsWorkflow');

        // ----------------------- WorkFlow  service  ---------------------------------

        Route::get('/workflowservice', [customizeWorkflowController::class, 'workflowservice'])->name('workflowservice');

        Route::post('/updateserviceWorkflow', [customizeWorkflowController::class, 'updateserviceWorkflow'])->name('updateserviceWorkflow');

        // ----------------------- WorkFlow  job offer ---------------------------------

        Route::get('/workflowjoboffer', [customizeWorkflowController::class, 'workflowjoboffer'])->name('workflowjoboffer');

        Route::post('/updatejobofferWorkflow', [customizeWorkflowController::class, 'updatejobofferWorkflow'])->name('updatejobofferWorkflow');




        // ----------------------- WorkFlow  petty cash ---------------------------------

        Route::get('/workflowpetty_cash', 'customizeWorkflowController@workflowpetty_cash')->name('workflowpetty_cash');

        Route::post('/updateWorkflowPetty_cash', 'customizeWorkflowController@updateWorkflowPetty_cash')->name('updateWorkflowPetty_cash');


        // ------------ --------------- WorkFlow subcontractor ---------------------


        Route::get('/workflowsubcontractor', 'customizeWorkflowController@workflowsubcontractor')->name('workflowsubcontractor');

        Route::post('/updateWorkflowsubcontractor', 'customizeWorkflowController@updateWorkflowsubcontractor')->name('updateWorkflowsubcontractor');

        //-------------------------** entry Manule ** -------------------------------


        Route::get('/opening_credit_product', 'opening_creditController@createproduct')->name('opening_credit.createproduct');

        Route::get('/createmanule', 'manuleController@manulepage')->name('manulepage.manulepage');

        Route::get('/customer_opening_credit', 'opening_creditController@createpage')->name('createopening_credit');
        Route::post('/createopening_credit_insarting', 'opening_creditController@insarting')->name('createopening_credit.insarting');


        Route::get('/createopening_credit_accounting', 'opening_creditController@createaccounting')->name('opening_credit.createaccounting');

        Route::get('/opening_credit_select', 'opening_creditController@select')->name('opening_credit.select');

        Route::get('/allaccount', 'opening_creditController@allaccount')->name('opening_credit.allaccount');

        Route::get('/opening_credit_createsuppiler', 'opening_creditController@createsuppiler')->name('opening_credit.createsuppiler');


        Route::get('/opening_credit', 'opening_creditController@index')->name('index.entry_manuale');


        Route::post('/opening_credit_homejson', 'opening_creditController@homejson')->name('opening_credit.homejson');

        Route::get('/opening_credit_edit/{entry_manual}', 'opening_creditController@editpage')->name('opening_credit.edit');

        Route::get('/review/{entry_manual}', 'opening_creditController@printentry')->name('printentry.edit');

        Route::post('/opening_credit_update/{entry_manual}', 'opening_creditController@update')->name('opening_credit.update');

        Route::post('/opening_credit_delete/{entry_manual}', 'opening_creditController@delete')->name('opening_credit.delete');

        //-----------------------------------------------------------------------------



        //---------------laborer managment ----------------------------------------//



        Route::get('/Laborer_create', 'LaborerController@create')->name('laborer.create');
        Route::post('/jsonlaborer', [LaborerController::class, 'jsonlaborer'])
            ->name('laborer.jsonlaborer');
        Route::get('/laborerindex', [LaborerController::class, 'index'])->name('laborer.index');
        Route::get('/performance/{User}', 'LaborerController@performance')->name('laborer.performance');
        Route::post('/Laborer_add', 'LaborerController@add')->name('laborer.add');
        Route::post('/Laborer_update/{User}', 'LaborerController@update')->name('laborer.upate');
        Route::get('/Laborer_edit/{User}', [LaborerController::class, 'edit'])->name('laborer.edit');
        Route::post('/Laborer_delete/{User}', 'LaborerController@delete')->name('laborer.delete');
        Route::post('/SearchLaborer', 'LaborerController@SearchLaborer')->name('laborer.SearchLaborer');




        ///

        //---------------------------** easy_restriction **--------------------------

        Route::get('/selecteasyeasy_entries', 'easy_restrictionController@select')->name('jsons656tocck');

        Route::get('/home_entries', 'easy_restrictionController@pagesay')->name('pagesay');

        Route::post('/homejson', 'easy_restrictionController@homejson')->name('homejson');

        Route::get('/productfixed0saccount', 'easy_restrictionController@productfixed0saccount')->name('productfixed0saccount');
        Route::get('/producteleingsaccount', 'easy_restrictionController@producteleingsaccount')->name('producteleingsaccount');


        Route::get('/moneymovement_entries', 'easy_restrictionController@moneymovements')->name('moneymovements');

        Route::get('/moneymovementsaccount', 'easy_restrictionController@moneymovementsaccount')->name('moneymovementsaccount');

        Route::get('/moneycapitalsaccount', 'easy_restrictionController@moneycapitalsaccount')->name('moneycapitalsaccount');

        Route::get('/moneycapital2saccount', 'easy_restrictionController@moneycapital2saccount')->name('moneycapital2saccount');



        Route::get('/capital_entries', 'easy_restrictionController@moneycapital')->name('moneycapital');



        Route::get('/fixedsaccount', 'easy_restrictionController@fixedsaccount')->name('fixedsaccount');


        Route::get('/Fixedasset_entries', 'easy_restrictionController@Fixedasset')->name('Fixedasset');



        Route::get('/fixed0saccount', 'easy_restrictionController@fixed0saccount')->name('fixed0saccount');

        Route::get('/withdraw_entries', 'easy_restrictionController@withdraw')->name('withdraw');


        Route::get('/distributeprofits', 'easy_restrictionController@distributeprofits')->name('distributeprofits');


        Route::get('/distributeprofits_entries', 'easy_restrictionController@profits')->name('profits');

        Route::get('/payrollaccounting_entries', 'easy_restrictionController@payrollaccounting')->name('payrollaccounting_entries');

        Route::get('/payrollaccountinga', 'easy_restrictionController@payrollaccountinga')->name('payrollaccountinga');




        Route::post('/easymovementpost', 'easy_restrictionController@easymovement')->name('easymovementeasymovement');

        Route::post('/editeasymovement/{easy_restriction}', 'easy_restrictionController@editeasymovement')->name('editeasymovement');



        Route::post('/deleteeasymovement/{easy_restriction}', 'easy_restrictionController@delete')->name('deleteeasymovement');




        Route::get('/daily_entry/{easy_restriction}', 'easy_restrictionController@spicesay')->name('spicesay');


        Route::get('/easy_entryedit/{easy_restriction}', 'easy_restrictionController@moneymovementsedit')->name('moneymovementsedit.edit');



        Route::get('/print_esay_entry/{easy_restriction}', 'easy_restrictionController@spiceasy')->name('moneymovementsedit.spiceasy');



        //------------------------------------------------------------------------

        /// -------------------------** tree ***-------------------------------------



        Route::get('/accountbanksele', 'accountbankController@accountbanksele')->name('accountbanksele');



        Route::get('/editaccount3/{sub_account3}', 'accountbankController@editaccount3')->name('editaccount3');




        Route::get('/editaccount4/{sub_account4}', 'accountbankController@editaccount4')->name('editaccount4');



        Route::post('/update4/{sub_account4}', 'accountbankController@update4')->name('update4');


        Route::post('/update3/{sub_account3}', 'accountbankController@update3')->name('update3');



        Route::post('/deleteacreateccountbank1/{accountbank}', 'accountbankController@delete1')->name('deleteaccountbankController1');

        Route::post('/deleteacreateccountbank2/{subaccount1}', 'accountbankController@delete2')->name('deleteaccountbankController2');

        Route::post('/deleteacreateccountbank3/{sub_account3}', 'accountbankController@delete3')->name('deleteaccountbankController3');

        Route::post('/deleteacreateccountbank4/{sub_account4}', 'accountbankController@delete4')->name('deleteaccountbankController4');

        Route::post('/updateacc/{accountbank}', 'accountbankController@updateacc')->name('updateacc');


        Route::get('/accountbanktable', 'accountbankController@accountbanktable')->name('accountbanktable');

        Route::get('/accountbankjson', 'accountbankController@accountbankjson')->name('accountbankjson');


        Route::get('/createaccountbank', 'accountbankController@accountbankpage')->name('accountbankpage');

        Route::post('/createacreateccountbank', 'accountbankController@create')->name('create');



        // ------------------------ ends of tree *------------------------------------



        // -------------------------------- * * * Role  * * * -------------------------------------


        Route::group(['prefix' => 'role'], function () {

            Route::post('/insert', [RoleController::class, 'insert'])->name('role.insert');

            Route::post('/json', 'RoleController@json')->name('role.json');


            Route::get('/', [RoleController::class, 'index'])->name('index.role');


            Route::get('/create', [RoleController::class, 'create'])->name('role.create');

            Route::get('/edit/{role}', [RoleController::class, 'edit'])->name('role.edit');

            Route::post('/update/{role}', [RoleController::class, 'update'])->name('role.update');
        });

        //---------------------------** Suppliers ** -----------------------------------


        Route::post('/getselectboxsupp', [supplierController::class, 'getselectboxsupp'])->name('getselectboxsupp');
        Route::get('/createsupplier', [supplierController::class, 'createpage'])->name('createpage');
        Route::get('/supplierselex', [supplierController::class, 'supplierselex'])->name('supplierselex');
        Route::get('/suppilercount', 'supplierController@suppilercount')->name('suppilercount');

        Route::post('/createsupp', [supplierController::class, 'createsupp'])->name('createsupp');

        Route::get('/suppliertable', [supplierController::class, 'suppliertable'])->name('suppliertable');

        Route::get('/supplierjson', 'supplierController@supplierjson')->name('supplierjson');

        Route::post('/deletesupp/{ids}', [supplierController::class, 'delete'])->name('deletesup');

        Route::post('/updatesupp/{supplier}', [supplierController::class, 'updatesupp'])->name('updatesupp');


        //---------------------------------** ends of suppliers ** --------------------------------

        // ------------------------ ** invoice ** -----------------------------

        Route::group(['prefix' => 'invoice'],  function () {
            Route::get('/create', [invoiceController::class, 'create'])->name('invoice.create');
            Route::post('/insert_invoice', [invoiceController::class, 'insert_invoice'])->name('invoice.insert_invoice');
            Route::post('/jsonInvoice', [invoiceController::class, 'jsonInvoice'])->name('invoice.jsonInvoice');
            Route::get('/index', [invoiceController::class, 'table'])->name('invoice.index');
            Route::get('/edit/{invoice}', [invoiceController::class, 'edit'])->name('invoice.edit');
            Route::post('/update/{invoice}', 'invoiceController@update')->name('invoice.update');
        });



        // --------------------------- * * * reports * * * -----------------------------------------

        Route::post('/ledger', 'ledgercontroller@ledger')->name('ledger');


        Route::get('/trial_balances', 'ledgercontroller@trial_balances')->name('trial_balances');

        Route::get('/Balance_Sheet', 'ledgercontroller@Balance_Sheet')->name('Balance_Sheet');


        Route::get('/Journal_Reports', 'ledgercontroller@Journal_Reports')->name('Journal_Reports');


        Route::post('/easy_restriction_json', 'ledgercontroller@easy_restriction_json')->name('easy_restriction_json');

        Route::post('/manule_entry_json', 'ledgercontroller@easy_entry_json')->name('easy_entry_json');


        Route::get('/ledgerpage', 'ledgercontroller@ledgerpage')->name('ledgerpage');

        Route::get('/report_tax', 'ledgercontroller@tax')->name('report.tax');
        Route::post('/report_purchase_order', 'ledgercontroller@purchase_order')->name('report.purchase_order');

        Route::get('/sales_and_purchasesreport', 'ledgercontroller@sales_and_purchasesreport')->name('report.sales_and_purchasesreport');

        Route::post('/sales_invoicesjson', 'ledgercontroller@sales_invoicesjson')->name('report.sales_invoicesjson');

        Route::get('/sales_invoices', 'ledgercontroller@sales_invoices')->name('report.sales_invoices');



        Route::post('/ar_by_customersjson', 'ledgercontroller@ar_by_customersjson')->name('report.ar_by_customersjson');

        Route::get('/ar_by_customers', 'ledgercontroller@ar_by_customers')->name('report.ar_by_customers');

        Route::post('/ap_by_vendorsjson', 'ledgercontroller@ap_by_vendorsjson')->name('report.ap_by_vendorsjson');

        Route::get('/ap_by_vendors', 'ledgercontroller@ap_by_vendors')->name('report.ap_by_vendors');

        Route::get('/report/Account_Summary', 'ledgercontroller@SummaryAccount')->name('report.SummaryAccount');


        Route::post('/report/purchase_orderjson', 'ledgercontroller@purchase_orderjson')->name('report.purchase_orderjson');
        Route::get('/report/purchase_order', 'ledgercontroller@purchase_orderchart')->name('report.purchase_order');

        Route::get('/report/homepage', 'ledgercontroller@homepage')->name('report.homepage');


        Route::post('/ledger2', 'ledgercontroller@ledger2')->name('report.ledger2');


        Route::post('/sales_and_purchases', 'ledgercontroller@sales_and_purchases')->name('report.sales_and_purchases');

        Route::post('/taxreportjson', 'ledgercontroller@taxreportjson')->name('report.taxreportjson');

        Route::get('/taxreport', 'ledgercontroller@taxreport')->name('report.taxreport');

        Route::get('/productcharts', 'ledgercontroller@productcharts')->name('report.productcharts');


        Route::post('/productchartsjson', 'ledgercontroller@productchartsjson')->name('report.productchartsjson');


        // ---------------------- - * * * joboffer * * * -----------------------------

        Route::group(['prefix' => 'joboffer'], function () {

            Route::get('/update/{joboffer}', [ManagerJobOfferController::class, 'update'])->name('manager.joboffer.update');

            Route::get('/index', [ManagerJobOfferController::class, 'index'])->name('manager.joboffer.index');

            Route::get('/preview/{joboffer}', [ManagerJobOfferController::class, 'preview'])->name('manager.joboffer.preview');

            Route::get('/preview2', 'ManagerJobOfferController@preview2')->name('manager.joboffer.preview2');

            Route::post('/updating/{joboffer}', [ManagerJobOfferController::class, 'updating'])->name('manager.joboffer.insert');

            Route::post('/json', [ManagerJobOfferController::class, 'json'])->name('user.joboffer.json');
        });




        // ------------------------- * * *  ExportPdf * * * --------------------------

        Route::group(['prefix' => 'Export'], function () {
            Route::get('/petty_cash', 'ExportPdfController@petty_cash')->name('petty_cash.export');

            Route::get('/purchaseorder', 'ExportPdfController@purchaseorder')->name('purchaseorder.export');

            Route::get('/subcontractor', 'ExportPdfController@subcontractor')->name('subcontractor.export');
        });



        //---------------------------- ** Products ** --------------------------------

        Route::get('/product_table', [productController::class, 'producttable'])->name('product_table');

        Route::post('/productjson', [productController::class, 'productjson'])->name('productjson');

        Route::get('/productselect', 'productController@productselect')->name('productselect');

        Route::get('/product', 'productController@product')->name('product');

        Route::get('/edit_product/{product}', 'productController@edit')->name('edit_product');

        Route::post('/product_delete/{ids}', 'productController@delete')->name('productdelete');

        Route::post('/updateproduct/{product}', 'productController@updateproduct')->name('editproduct');

        Route::post('/addproduct', 'productController@addproduct')->name('addproduct');



        //----------------------------- ends products routes ------------------------------------
        Route::post('/action_matrial_request/{matrial_request}', 'managersMatrialrequestController@action')->name('managers.action_matrial_request');


        Route::post('/forwardToPo/{matrial_request}', 'managersMatrialrequestController@forwardToPo')->name('managers.forwardToPo');

        Route::post('/forwardToPetty_cash/{matrial_request}', 'managersMatrialrequestController@forwardToPetty_cash')->name('managers.forwardToPetty_cash');


        Route::get('/update_matrial/{matrial_request}', [managersMatrialrequestController::class, 'updatematrial_requestreturn'])->name('managers.updatematrial_requestreturn');


        Route::get('/index_matrial_request', [managersMatrialrequestController::class, 'index'])->name('managers.index_matrial_request');

        Route::get('/returnjsonmatrial', 'managersMatrialrequestController@returnjsonmatrial')->name('managers.returnjsonmatrial');

        Route::get('/matrial_requestreturn/{matrial_request}', [managersMatrialrequestController::class, 'matrial_requestreturn'])->name('managers.matrial_requestreturn');


        // subcontractorManagerController

        Route::post('/action_subcontractor_request/{subcontractor}', 'subcontractorManagerController@action')->name('managers.action_matrial_request');

        Route::post('/inv_subcontractor_request/{subcontractor}', 'subcontractorManagerController@inv')->name('managers.inv_matrial_request');






        Route::get('/update_subcontractor/{subcontractor}', 'subcontractorManagerController@update')->name('managers.updatematrial_requestreturn');


        Route::get('/index_subcontractor_request', 'subcontractorManagerController@index')->name('managers.index_subcontractor_request');

        Route::get('/returnjsonsubcontractor', 'subcontractorManagerController@returnasjson')->name('managers.returnjsonsubcontractor');

        Route::get('/subcontractor_requestreturn/{subcontractor}', 'subcontractorManagerController@subcontractorreturn')->name('managers.subcontractorreturn');





        // ----------------------------- * * * petty_cash * * * -------------------------------------------



        Route::post('/updatetotal_petty_cash/{petty_cash}', 'managers_petty_cash_Controller@updatetotal')->name('managers.updatetotal');


        Route::post('/inv_petty_cash/{petty_cash}', 'managers_petty_cash_Controller@inv')->name('managers.inv_petty_cash_request');


        Route::post('/action_petty_cash/{petty_cash}', 'managers_petty_cash_Controller@action')->name('managers.action_petty_cash_request');

        Route::get('/update_petty_cash/{petty_cash}', 'managers_petty_cash_Controller@update')->name('managers.update_petty_cash_requestreturn');


        Route::get('/index_petty_cash', 'managers_petty_cash_Controller@index')->name('managers.index_petty_cash_request');

        Route::post('returnjsonpetty_cash', 'managers_petty_cash_Controller@returnasjson')->name('managers.returnjsonpetty_cash');

        Route::get('/petty_cashreturn/{petty_cash}', 'managers_petty_cash_Controller@petty_cashreturn')->name('managers.subcontractor_petty_cash');


        // rfq_managers

        Route::post('/action_rfq/{rfq}', 'managersrfqController@action')->name('managers.action_rfq_request');

        Route::get('/update_rfq/{rfq}', 'managersrfqController@update')->name('managers.update_rfq_requestreturn');


        Route::get('/index_rfq', 'managersrfqController@index')->name('managers.index_rfq_request');

        Route::get('/returnjsonrfq', 'managersrfqController@returnasjson')->name('managers.returnjsonrfq');

        Route::get('/rfqreturn/{rfq}', 'managersrfqController@rfqreturn')->name('managers.rfqii');




        // managers site


        Route::post('/action_site/{site}', 'sitemanagerController@action')->name('managers.action_site_request');

        Route::get('/update_site/{site}', 'sitemanagerController@update')->name('managers.update_site_requestreturn');


        Route::get('/index_site', 'sitemanagerController@index')->name('managers.index_site_request');

        Route::get('/returnjsonsite', 'sitemanagerController@returnasjson')->name('managers.returnjsonrsite');

        Route::get('/sitereturn/{site}', 'sitemanagerController@sitereturn')->name('managers.siteii');


        // managers employee


        Route::post('/action_employee/{employee}', [employeemanagerController::class, 'action'])->name('managers.action_employee_request');

        Route::get('/update_employee/{employee}', [employeemanagerController::class, 'update'])->name('managers.update_employee_requestreturn');


        Route::get('/index_employee', [employeemanagerController::class, 'index'])->name('managers.index_employee_request');

        Route::get('/returnjsonemployee', 'employeemanagerController@returnasjson')->name('managers.returnjsonremployee');

        Route::get('/employeereturn/{employee}', 'employeemanagerController@employeereturn')->name('managers.employeeii');





        // purchase_managers



        Route::post('/action_purchase_order_inv/{Purchase_order}', 'managerpurchaseController@inv')->name('managers.inv');

        Route::post('/action_purchase_order/{Purchase_order}', [managerpurchaseController::class, 'action'])->name('managers.action_purchase_order_request');

        Route::get('/update_purchase_order/{Purchase_order}', [managerpurchaseController::class, 'update'])->name('managers.update_purchase_order_requestreturn');


        Route::get('/index_purchase_order', [managerpurchaseController::class, 'index'])->name('managers.index_purchase_order_request');

        Route::post('/returnjsonpurchase', [managerpurchaseController::class, 'returnjsonpurchase'])->name('managers.returnjsonpurchase_order');

        Route::get('/purchase_orderreturn/{Purchase_order}', [managerpurchaseController::class, 'purchasereturn'])->name('managers.purchase_order');
    });
});
