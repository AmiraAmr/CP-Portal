@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <div class="page-title-right">
                <a class="btn btn-secondary" href="/user/createpurchaseorder" >Create</a>
            </div>
            <h4 class="page-title">Purchase Order</h4>
        </div>
    </div>
</div>
<table-component :workflow="{{$workflow}}" ></table-component>
@endsection

@section('js')
<!-- Datatables js -->
<script src="{{ asset('assets/js/vendor/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('assets/js/vendor/dataTables.bootstrap5.js') }}"></script>
<script src="{{ asset('assets/js/vendor/dataTables.responsive.min.js') }}"></script>
<script src="{{ asset('assets/js/vendor/responsive.bootstrap5.min.js') }}"></script>

<!-- Datatable Init js -->
<script src="{{ asset('assets/js/pages/demo.datatable-init.js') }}"></script>
@endsection

@section('style')
<link href="{{ asset('assets/css/vendor/dataTables.bootstrap5.css') }}" rel="stylesheet" type="text/css" />
<link href="{{ asset('assets/css/vendor/responsive.bootstrap5.css') }}" rel="stylesheet" type="text/css" />
<style>
  .wizard-wrap .failed::before{
      content: none !important
  }

  .wizard-wrap .failed {
      display: flex;
      justify-content: center;
  }
  .wizard-wrap .failed div {
  width: 40px;
  height: 40px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  }
  .wizard-wrap .failed div svg{
      fill: red !important
  }
  .wizard-wrap {
    z-index: 999;
    /* min-height: 300px; */
  }
  .wizard-wrap .wizard {
    position: relative;
  }
  .wizard-wrap .wizard li {
    list-style-type: none;
    text-transform: uppercase;
    font-size: 11px;
    float: left;
    position: relative;
    text-align: center;
  }
  .wizard-wrap .wizard li:before {
    content: " ";
    width: 2vw;
    height: 2vw;
    line-height: 2vw;
    min-width: 25px;
    min-height: 25px;
    display: block;
    font-size: calc(2vw/1.5);
    text-align: center;
    background: #fff;
    color: #ccc;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin: 0 auto;
    z-index: 1;
  }
  .wizard-wrap .wizard li.active:before {
    background: #ffc107;
    border: 2px solid #ffc107;
    color: #fff;
  }
  .wizard-wrap .wizard li:after {
    content: '';
    width: 100%;
    height: 0;
    border: 1px solid #ccc;
    position: absolute;
    left: -50%;
    z-index: -1;
    /*put it behind the numbers*/
    top: calc(2vw/2);
  }
  .wizard-wrap .wizard li.double:after {
    height: 5px;
  }
  .wizard-wrap .wizard li:first-child:after {
    content: none;
  }
  .wizard-wrap .wizard li.connect-left:first-child:after {
    content: '';
  }
  .wizard-wrap .wizard li.completed:after,
  .wizard-wrap .wizard li.active:after {
    border: 1px solid #ffc107;
  }
  .wizard-wrap .wizard li.completed:before {
      color: #00a884;
      border: 2px solid #00a884;
  }
  .wizard-wrap .wizard li.completed.fa-check:before {
    content: "✔";
    color: #00a884;
  }
  .wizard-wrap .wizard li.fa-sort:before {
    content: "↕";
    color: #ccc;
  }
  .wizard-wrap .wizard li.completed.fa-sort:before {
    content: "↕";
    color: #3b65b3;
  }
  .wizard-wrap .wizard p {
    position: absolute;
    color: #ccc;
    font-family: 'Myriad Pro', Arial, sans-serif;
    background-color: white;
    z-index: 2;
    top: calc(-2vw);
    left: 0;
    right: 0;
  }
  .wizard-wrap .wizard .active > p {
    color: #3b65b3;
    font-size: 11px;
    font-weight: 600;
  }
  .wizard-wrap .wizard li.fa p {
    font-family: 'Myriad Pro', Arial, sans-serif;
    font-size: 11px;
  }
  .wizard-wrap .wizard a.btn.btn-link {
    top: -4px;
    position: absolute;
    left: auto;
    margin-left: 10px;
  }
  .wizard-wrap .wizard ul {
    width: 1000%;
    position: relative;
    top: calc(9vw/2 - 2vw/2);
    left: calc(2vw/2);
    padding-left: 0;
  }
  .wizard-wrap .wizard ul.vertical:before {
    border-left: 1px dashed #ccc;
    content: '';
    left: calc(9vw/2-2vw/2);
    top: calc(-9vw+2vw);
    height: 9vw;
    position: absolute;
    z-index: -1;
  }
  .wizard-wrap .wizard ul.vertical.active:before {
    border-left: 1px solid #3b65b3;
  }
  .wizard-wrap .wizard ul.vertical li {
    left: calc(2vw/-2);
  }
  .wizard-wrap .wizard ul.split:after {
    border: 2px dashed #ccc;
    border-right: 0;
    border-bottom: 0;
    content: " ";
    left: 0;
    top: calc(-9vw/2+2vw/2);
    height: calc(6.36396103vw);
    width: calc(6.36396103vw);
    position: absolute;
    text-align: left;
    z-index: -1;
    transform: rotate(45deg);
  }
  .wizard-wrap .wizard ul.split.join:after {
    border: 2px dashed #ccc;
  }
  .wizard-wrap .wizard ul.split > li {
    top: calc(2vw/-2);
  }
  .wizard-wrap .wizard ul li.move-left {
    left: calc(-9vw/2-2vw/2);
  }
  .wizard-wrap .wizard ul li.move-right {
    left: calc(-9vw/2-2vw/2);
  }
  .wizard-wrap .wizard ul li.move-right:after {
    border: 0;
  }
  .wizard-wrap .wizard ul li.move-center {
    left: calc(9vw/2 - 2vw/2);
    top: -2vw;
  }
  .wizard-wrap .wizard ul.split.active-left:after {
    border-left: 2px solid #3b65b3;
  }
  .wizard-wrap .wizard ul.split.join.active-left:after {
    border-bottom: 2px solid #3b65b3;
  }
  .wizard-wrap .wizard ul.split.active-right:after {
    border-top: 2px solid #3b65b3;
  }
  .wizard-wrap .wizard ul.possible:before {
    border-left: 1px dashed #ccc;
  }
  .wizard-wrap .wizard ul.active:before {
    border-left: 1px dashed #3b65b3;
  }
  .wizard-wrap .wizard ul li:after {
    border: 1px dashed #ccc;
  }
  .wizard-wrap .wizard li ul li.active p {
    font-size: 12px;
    font-weight: normal;
  }
  .wizard-wrap .wizard.wizard-control {
    /* margin-bottom: 60px; */
    margin-top: -5px;
  }
  .wizard-wrap .wizard.wizard-control li {
    width: 9vw;
  }
  </style>
@endsection