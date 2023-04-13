@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Create Subcontractor invoice</h4>
        </div>
    </div>
</div>
@if(!empty($invoice))
<subcontractor-create-component refdata="{{$ref}}" projectt="{{$project_id}}" num="{{$num}}"  :invoice="{{$invoice}}" contract_total="{{$contract_total}}" :attributes="{{$attributes}}"  id="{{$id}}" ></subcontractor-create-component>
@else
<subcontractor-create-component refdata="{{$ref}}"  projectt="{{$project_id}}"  num="{{$num}}" contract_total="{{$contract_total}}"  :attributes="{{$attributes}}"  id="{{$id}}" ></subcontractor-create-component>
@endif
@endsection

@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection