@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Users</h4>
        </div>
    </div>
</div>
<edit-user :data="{{$data}}"></edit-user>
@endsection
