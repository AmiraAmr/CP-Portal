@extends('layouts.NewApp')
@section('title', ' تعديل المواد ')
@section('content')
<div id="app">
<product-edit

:data="{{$data}}" :inventoryz="{{$data->inventoryz ?? 'null'}}"

></product-edit>
</div>
                @endsection
