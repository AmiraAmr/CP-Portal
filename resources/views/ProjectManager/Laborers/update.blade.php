@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Laborers</h4>
        </div>
    </div>
</div>

<update-laborer-projectmanager  :data="{{$data}}"   :projects="{{$projects}}" ></update-laborer-projectmanager>


@endsection
