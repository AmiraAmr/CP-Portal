@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">daily financial report </h4>
        </div>
    </div>
</div>
<create-report-financial :data="{{$data}}"  :allowed="{{$allowed}}" ></create-report-financial>
@endsection
