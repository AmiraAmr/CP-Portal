@extends('layouts.NewManage')

@section('content')

                        <!-- PAGE-HEADER -->
                        <div class="page-header">
                            <h1 class="page-title">Profile</h1>
                            <div>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0)">Pages</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">Profile</li>
                                </ol>
                            </div>
                        </div>
                        <!-- PAGE-HEADER END -->

                        <!-- ROW-1 OPEN -->
                        <div class="row" id="user-profile">
                            <div class="col-lg-12">
                            <div class="card-body">
                                        <div class="wideget-user mb-2">
                                            <div class="row">
                                                <div class="col-lg-12 col-md-12">
                                                    <div class="row">
                                                        <div class="panel profile-cover">
                                                            <div class="profile-cover__action bg-img"></div>
                                                            <div class="profile-cover__img">
                                                                <div class="profile-img-1">
                                                                  
                                                                </div>
                                                                <div class="profile-img-content text-dark text-start">
                                                                    <div class="text-dark">
                                                                        <h3 class="h3 mb-2">{{$data->name}}</h3>
                                                                        <h5 class="text-muted">{{$data->role->name ?? ''}}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                       
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="">
                                                            <div class="social social-profile-buttons mt-5 float-end">
                                                                <div class="mt-3">


                                                         
                                                                    <a class="social-icon text-primary" href=""><i class="fa fa-linkedin"></i></a>
                                                                    <a class="social-icon text-primary" href=""><i class="fa fa-google-plus"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                <div class="row">
                                    <div class="col-xl-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="main-profile-contact-list">
                                                    <div class="me-5">
                                                        <div class="media mb-4">
                                                            <div class="media-icon bg-secondary bradius me-3 mt-1">
                                                                <i class="fe fe-edit fs-20 text-white"></i>
                                                            </div>
                                                            <div class="media-body">
                                                                <span class="text-muted">working hour(s)</span>
                                                                <div class="fw-semibold fs-25">
                             
{{$data->attending_and_leaving_sum_min / 60 + $data->attending_and_leaving_sum_time_difference }}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="me-5 mt-5 mt-md-0">
                                                        <div class="media mb-4">
                                                            <div class="media-icon bg-danger bradius text-white me-3 mt-1">
                                                                <span class="mt-3">
                                                                    <i class="fe fe-users fs-20"></i>
                                                                </span>
                                                            </div>
                                                            <div class="media-body">
                                                                <span class="text-muted">Absence</span>
                                                                <div class="fw-semibold fs-25">
                                                                  {{$data->Absence}}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-header">
                                                <div class="card-title">About</div>
                                            </div>
                                            <div class="card-body">
                                        
                                                <hr>
                                                <div class="d-flex align-items-center mb-3 mt-3">
                                                    <div class="me-4 text-center text-primary">
                                                        <span><i class="fe fe-briefcase fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{{$data->contract->address ?? 'unknown'}} </strong>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center mb-3 mt-3">
                                                    <div class="me-4 text-center text-primary">
                                                        <span><i class="fe fe-map-pin fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{{$data->contract->country ?? 'unknown'}}</strong>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center mb-3 mt-3">
                                                    <div class="me-4 text-center text-primary">
                                                        <span><i class="fe fe-phone fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{{$data->contract->phone ?? 'unknown'}} </strong>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center mb-3 mt-3">
                                                    <div class="me-4 text-center text-primary">
                                                        <span><i class="fe fe-mail fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{{$data->email}} </strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="card">
                                            <div class="card-header">
                                                <div class="card-title">contract</div>
                                            </div>
                                            <div class="card-body">
                                                <div class="main-profile-contact-list">
                                                    <div class="me-5">
                                                        <div class="media mb-4">
                                                        
                                                            <div class="media-body">
                                                                <h6 class="font-weight-semibold mb-1">  role - {{$data->role->name ?? ''}} </h6>

                                                                <ul class="list-group">
  <li class="list-group-item">Contract expiry date :  {{$data->contract->contract_ex ?? ''}} </li>
 
  <li class="list-group-item">salary per month - {{$data->contract->salary_per_month ?? ''}} </li>
  
  <li class="list-group-item">Transportation Allowance - {{$data->contract->Transportation_Allowance ?? ''}}</li>

  <li class="list-group-item">Communication Allowance - {{$data->contract->Communication_Allowance ?? ''}}</li>

  <li class="list-group-item">Food_Allowance - {{$data->contract->Food_Allowance ?? ''}}</li>

  <li class="list-group-item">Other Allowance - {{$data->contract->Other_Allowance ?? ''}}</li>

</ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                     @foreach($data->task as $task)
                                        <div class="card border p-0 shadow-none">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="media mt-0">
                                                        <div class="media-user me-2">

                                                        </div>
                                                        <div class="media-body">
                                                            <h6 class="mb-0 mt-1">{{$task->name}}</h6>
                                                            <small class="text-muted">{{$task->start_at}}</small>
                                                      @if($task->status == 0)
                       <span class="badge bg-warning border-0">BENDING</span>
                       @elseif($task->status == 1)
         <span class="badge bg-success border-0">processing</span>
         @elseif($task->status == 2)
<span class="badge bg-danger border-0">rejected</span>
@elseif($task->status == 3)
<span class="badge bg-success border-0">closed</span>
                   
@endif

                                                        </div>
                                                    </div>
                                                    <div class="ms-auto">
                                             
                                                    </div>
                                                </div>
                                                <div class="mt-4">
                                                  
                                                    <p class="mb-0">{{$data->dis}}
                                                    </p>
                                                </div>
                                            </div>
                                     
                                        </div>
                                        @endforeach
                                        <div class="card">    
                                        <div class="card-header">Daily report</div>       
            <div class="card-body">
               <div class="table-responsive">
                  <table id="basic-datatable" class="table dt-responsive nowrap w-100">
                     <thead>
                        <tr>
                            <th>report</th>
                            <th>performance</th>
                            <th>commitment</th>
</tr>
</thead>
<tbody>
@foreach($data->user_daily_report as $user_daily_report)
         
    <tr>
    
    <td>
        {{$user_daily_report->ref}}
</td>

<td>{{$user_daily_report->pivot->performance}}</td>
<td>{{$user_daily_report->pivot->commitment}}</td>
    
</tr>
@endforeach
</tbody>
</table>
</div>
</div>
                                    </div>

                                    <div class="row">
             
                                    <div class="row justify-content-center">
         <div class="card mb-2">
                        <div class="card-header d-block">
                           <h4 class="card-title">  attachment</h4>
                        </div>
                        <div class="card-body">
                           <div class="col-md-8">
                            @foreach($data->user_file as $doc)
                              <a  href="/uploads/user_file/{{$doc->path}}" v-for="cycle in data.purchase_order_attachment" download style="color: #222">  <span class="badge bg-danger">
                            
                              </span></a>
                              @endforeach
                           </div>
                        </div>
                     </div>
                     </div>

</div>


                                        </div>
                                    </div>
                        
                                  
                                </div>
                            </div>
                            <!-- COL-END -->
                        </div>
                        <!-- ROW-1 CLOSED -->
               
@endsection
