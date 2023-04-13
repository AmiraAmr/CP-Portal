@extends('layouts.NewManage')

@section('content')
@section('title', 'تعديل الرواتب')

<movements-edit

:easy_entry="{{$data}}"


></movements-edit>
@endsection