@extends('layouts.NewManage')
@section('title', ' قيد موردين')
@section('content')
<openingcredit-supplier-edit
:entry_manual="{{$data}}"
></openingcredit-supplier-edit>
@endsection