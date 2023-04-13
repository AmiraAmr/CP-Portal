@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">marketing</h4>
        </div>
    </div>
</div>

<create-marketing  refdata="{{$ref}}" ></create-marketing>
@endsection
