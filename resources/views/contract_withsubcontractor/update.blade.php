@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> contract</h4>
        </div>
    </div>
</div>
<cwc-update :data="{{$data}}"></cwc-update>

@endsection
