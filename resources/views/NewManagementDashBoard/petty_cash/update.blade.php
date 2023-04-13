@extends('layouts.NewManage')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> Petty Cash </h4>
        </div>
    </div>
</div>
<petty_cash-update-manager :data="{{$data}}"></petty_cash-update-manager>
@endsection
