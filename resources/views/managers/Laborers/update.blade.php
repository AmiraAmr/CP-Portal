@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Laborers</h4>
        </div>
    </div>
</div>
<update-laborers-manager

:data="{{$data}}"
></update-laborers-manager>
@endsection
