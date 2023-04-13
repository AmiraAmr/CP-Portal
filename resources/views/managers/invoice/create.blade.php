@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Create Invoice</h4>
        </div>
    </div>
</div>
<invoice-create-component  code="{{$code}}" ></invoice-create-component>
@endsection
@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection