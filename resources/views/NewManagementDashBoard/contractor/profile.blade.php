@extends('layouts.NewManage')
@section('title', 'addcontractor ')
@section('content')
<div id="app">
<contractor-profile-component   :data="{{$data}}"></contractor-profile-component>
</div>
                @endsection
