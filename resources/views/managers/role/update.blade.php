@extends('layouts.NewManage')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> role </h4>
        </div>
    </div>
</div>


<role-update-component :permissionrole="{{$permissionrole}}"  :data="{{$role}}"  :section="{{$section}}"  :permission="{{$data}}"><role-update-component>


@endsection
