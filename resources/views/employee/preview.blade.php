<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{asset('/preview/css/normalize.css')}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('/preview/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('/preview/css/style.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('/preview/css/print2.css')}}" media="print"/>
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></head>
<body>
 

<div id="app">
    <print-employee :data="{{$data}}" ></print-employee>
</div>


<script src="{{asset('/js/app.js')}}"></script>
    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>