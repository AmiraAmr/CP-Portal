@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Rfq</h4>
        </div>
    </div>
</div>
<rfq-update-manager   :data="{{$data}}" :role='{{ \App\role::where('id', auth()->user()->role_id)->first() }}'></rfq-update-manager>
@endsection
