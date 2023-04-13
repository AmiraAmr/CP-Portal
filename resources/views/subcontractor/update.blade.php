@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> Subcontractor Invoice </h4>
        </div>
    </div>
</div>
<subcontractor-update :data="{{$data}}" ></subcontractor-update>
@endsection
