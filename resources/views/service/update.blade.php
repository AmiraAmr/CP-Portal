@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> service </h4>
        </div>
    </div>
</div>

<update-service :data="{{$data}}"></update-service>
@endsection
