@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">JobOffer</h4>
        </div>
    </div>
</div>
<joboffer-update-manager :data="{{$data}}"></joboffer-update-manager>
@endsection
