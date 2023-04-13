@extends('layouts.NewManage')
@section('title', 'تعديل الحسابات')
@section('content')
<accounting-edit

:entry_manual="{{$data}}"


></accounting-edit>
@endsection