@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">service </h4>
        </div>
    </div>
</div>



<create-service  refdata="{{$ref}}" ></create-service>
@endsection
@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection