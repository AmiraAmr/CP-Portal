@extends('layouts.NewApp')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> Petty Cash </h4>
        </div>
    </div>
</div>
<petty-update-component :data="{{$data}}"></petty-update-component>
@endsection
