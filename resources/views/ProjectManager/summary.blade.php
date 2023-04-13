@extends('layouts.NewApp')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">analysis HR </h4>
        </div>
    </div>
</div>
<project-time-sheet  :projects="{{$projects}}" ></project-time-sheet>
@endsection
