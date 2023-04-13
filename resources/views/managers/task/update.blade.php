@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">WorkFlow</h4>
        </div>
    </div>
</div>
<update-task-manager  :data="{{$data}}"  ></update-task-manager>
@endsection
