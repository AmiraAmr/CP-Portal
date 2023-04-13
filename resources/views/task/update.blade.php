@extends('layouts.NewApp')

@section('title', 'task')
@section('content')
<div class="row">

<update-emp-task :data="{{$data}}"></update-emp-task>

</div>

@endsection
