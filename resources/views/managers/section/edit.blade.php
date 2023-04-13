@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> department </h4>
        </div>
    </div>
</div>


<section-update-component :data="{{$section}}"  ><section-update-component>


@endsection
