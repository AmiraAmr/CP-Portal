@extends('layouts.NewManage')

@section('title', 'اضافة عملاء')
@section('content')
<div id="app">
<customer-update-component :data="{{$data}}"></customer-update-component>
</div>
                @endsection
