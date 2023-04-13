@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Purchase Order</h4>
        </div>
    </div>
</div>
<purchase-update-manager :data="{{$data}}" :role='{{ \App\role::where('id', auth()->user()->role_id)->first() }}'></purchase-update-manager>
@endsection
