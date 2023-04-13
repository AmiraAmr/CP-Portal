<!DOCTYPE html>
<html dir="rtl" lang="ar">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-title" content="Qoyod - قيود">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">
    <!-- web page icon-->
    <link href="assets/logo_57.png" sizes="57x57" rel="icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!--Google Fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;300;400;500;600;700;800;900&family=Inconsolata:wght@700;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;300;400;500;600;700;800;900&family=Cairo:wght@200;400;600;800&family=Inconsolata:wght@700;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- font awosome file-->
    <link rel="stylesheet" href="{{asset('newasset/css/all.min.css')}}">
    <!--/normalize file -->
    <link rel="stylesheet" href="{{asset('newasset/css/normalize.css')}}">
    <!-- style sheet file-->
    <link rel="stylesheet" href="{{asset('newasset/css/main.css')}}">
    <title> دفتر الأستاذ </title>
</head>

<body class="emp-body">
    <nav style="--bs-breadcrumb-divider: ''" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"> <a href="{{route('report.homepage')}}">التقارير</a></li>
            <li class="breadcrumb-item active" aria-current="page"><i class="fa fa-angle-double-left client_primary_color"></i> <a href="#">دفتر الاستاذ </a> </li>
        </ol>
    </nav>





    <div  id="app">  

<general-ledger></general-ledger>
</div>

    <script src="{{ asset('js/reports.js') }}" ></script>




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="js/main.js"></script>

</body>

</html>