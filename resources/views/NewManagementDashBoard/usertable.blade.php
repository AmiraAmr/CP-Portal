@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <div class="page-title-right">
                <a class="btn btn-secondary" href="/admin/user/rig" >Create</a>
            </div>
            <h4 class="page-title">Users</h4>
        </div>
    </div>
</div>
<table-user></table-user>
@endsection
