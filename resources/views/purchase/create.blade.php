@extends('layouts.NewApp')

@section('content')
<div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <h4 class="page-title">Create Purchase Order</h4>
        </div>
    </div>
</div>
<pru-component refdata="{{$ref}}"></pru-component>
@endsection

@section('style')
<style>
.table thead tr th {
    text-align: center;
}

</style>
@endsection
@section('js')
    <!-- plugin js -->
    <script src="{{ asset('assets/js/vendor/dropzone.min.js') }}"></script>
    <!-- init js -->
    <script src="{{ asset('assets/js/ui/component.fileupload.js') }}"></script>
@endsection