@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> Employee </h4>
        </div>
    </div>
</div>
<employee-update-manager :data="{{$data}}" :role='{{ \App\role::where('id', auth()->user()->role_id)->first() }}'></employee-update-manager>
@endsection
