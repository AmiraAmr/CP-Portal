@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> role </h4>
        </div>
    </div>
</div>


<role-create-component  :section="{{$section}}" :permission="{{$data}}"><role-create-component>


@endsection
