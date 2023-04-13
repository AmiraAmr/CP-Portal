@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Site</h4>
        </div>
    </div>
</div>
<site-update-manager :data="{{$data}}" ></site-update-manager>
@endsection
