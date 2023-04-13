@extends('layouts.NewApp')
@section('title', ' تسعير المورد ')
@section('content')
<div id="app">
<pricing-order-edit :data="{{$data}}"></pricing-order-edit>
</div>
                @endsection
