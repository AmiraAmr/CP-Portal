
@extends('layouts.NewManage')
@section('title', '  اضافة مورد ')
@section('content')
<div id="app">
 @if(isset($editdata))   
<supplierorder-create-component :editdata = '{{$editdata}}'></supplierorder-create-component>
@else
<?php
$def = null;
?>
<supplierorder-create-component editdata='{{$def}}'></supplierorder-create-component>
@endif
</div>
                @endsection
