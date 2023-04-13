@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">subcontractor</h4>
        </div>
    </div>
</div>
<workflow-subcontractor-manager  :role="{{$role}}" :workflow="{{$workflow}}" ></workflow-subcontractor-manager>
@endsection
