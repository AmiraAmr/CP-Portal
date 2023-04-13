@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Create Site inv</h4>
        </div>
    </div>
</div>
<site-create-component  refdata="{{$ref}}" ></site-create-component>
@endsection

@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection