@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Create contract</h4>
        </div>
    </div>
</div>
<cwc-create-component refdata="{{$ref}}" ></cwc-create-component>
@endsection

@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection