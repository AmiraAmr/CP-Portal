@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Matrial Request</h4>
        </div>
    </div>
</div>
<create-matrial  refdata="{{$ref}}" ></create-matrial>
@endsection

@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection