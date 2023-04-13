
@extends('layouts.NewApp')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title"> DCC </h4>
        </div>
    </div>
</div>

<dcc-projectmanager

:purchase_orderworkflow="{{$purchase_orderworkflow}}"

:petty_cashworkflow="{{$petty_cashworkflow}}"

:subcontrctorworkflow="{{$subcontrctorworkflow}}"

:matrial_requestworkflow="{{$matrial_requestworkflow}}"

:projects="{{$projects}}"
></dcc-projectmanager>

@endsection
