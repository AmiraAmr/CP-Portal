
@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">edit Invoice</h4>
        </div>
    </div>
</div>
<invoice-edit-component  :data="{{$data}}" ></invoice-edit-component>
@endsection
@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection