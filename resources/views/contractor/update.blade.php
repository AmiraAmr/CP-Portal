@extends('layouts.NewApp')
@section('title', 'اضافة عملاء')
@section('content')
<div id="app">
<contractor-update-user :data="{{$data}}"></contractor-update-user>
</div>
                @endsection
