@extends('layouts.NewApp')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">time sheet</h4>
        </div>
    </div>
</div>

<time-sheet-projectmanager :projects="{{$projects}}" ></time-sheet-projectmanager>

@endsection
