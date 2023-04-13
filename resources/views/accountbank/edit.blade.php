@extends('layouts.NewManage')
@section('title', 'تعديل حساب')
@section('content')
<div id="app">
<account-edit

:data="{{$data}}"

></account-edit>
</div>
                @endsection
