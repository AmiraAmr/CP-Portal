@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> contract</h4>
        </div>
    </div>
</div>
<cws-update-component :data="{{$data}}"></cws-update-component>
@endsection
