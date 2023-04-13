@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">construction department  </h4>
        </div>
    </div>
</div>
<rating-construction  :bid_value="{{$bid_value}}" ></rating-construction>
@endsection
