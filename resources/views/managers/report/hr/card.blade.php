@extends('layouts.NewManage')

@section('content')

                        <!-- PAGE-HEADER -->
                        <div class="page-header">
                            <h1 class="page-title">card</h1>
                            <div>
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="javascript:void(0)">Pages</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">card</li>
                                </ol>
                            </div>
                        </div>
               
                        <!-- PAGE-HEADER END -->

                        <card-component url="{{  route('laborer.Attending_and_leaving',$data->emp_on) }}" :data="{{$data}}"   ></card-component>
                      
@endsection
