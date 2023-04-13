@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
        <div class="page-title-right">
              
            </div>

            <h4 class="page-title">marketing</h4>
            <a class="btn btn-secondary" href="{{route('marketing.create.user')}}" >Create</a>
        </div>
    </div>
</div>

<table-marketing  ></table-marketing>

@endsection
