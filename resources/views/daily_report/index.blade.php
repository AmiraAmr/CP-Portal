@extends('layouts.NewApp')
@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <div class="page-title-right">
                <a class="btn btn-secondary" href="/daily_report/create" >Create</a>
            </div>
            <h4 class="page-title"> daily report </h4>
        </div>
    </div>
</div>
<index-daily-report ></index-daily-report>
@endsection
