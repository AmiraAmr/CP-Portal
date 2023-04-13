@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Purchase Order</h4>
        </div>
    </div>
</div>
<update-purchase :data="{{$data}}" ></update-purchase>
@endsection
