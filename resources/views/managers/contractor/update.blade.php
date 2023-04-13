@extends('layouts.NewManage')
@section('title', 'اضافة عملاء')
@section('content')
<div id="app">
<contractor-update-component :data="{{$data}}"></contractor-update-component>
</div>
                @endsection
