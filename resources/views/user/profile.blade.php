@extends('layouts.NewApp')

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

                        <profile-component :data="{{$data}}" ></profile-component>
                      
@endsection
