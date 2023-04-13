@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
        <div class="page-title-right">
                <a class="btn btn-secondary" href="{{route('projectmanager.create_laborer')}}" >Create</a>
            </div>

            <h4 class="page-title">laborers</h4>

        </div>
    </div>
</div>
<table-laborer-projectmanager  :projects="{{$projects}}" ></table-laborer-projectmanager>

@endsection
