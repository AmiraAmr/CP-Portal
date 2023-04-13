    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>kripton - Crypto Admin Dashboard</title>
    <!-- Favicon icon -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon.png">
	<link rel="stylesheet" href="{{asset('User/vendor/chartist/css/chartist.min.css')}}">
    <link href="{{asset('User/vendor/bootstrap-select/dist/css/bootstrap-select.min.css')}}" rel="stylesheet">
	<link href="{{asset('User/vendor/owl-carousel/owl.carousel.css')}}" rel="stylesheet">
    {{-- <link href="{{asset('User/css/style.css')}}" rel="stylesheet"> --}}
    <link href="{{asset('/css/icons.min.css')}}" rel="stylesheet">
    <link href="{{asset('/css/app.min.css')}}" rel="stylesheet">

    <link rel="stylesheet" href="{{asset('/css/table.css')}}">
    <link href="{{asset('assets/css/style.css')}}" rel="stylesheet" />
    <link href="{{asset('assets/css/dark-style.css')}}" rel="stylesheet" />
    <link href="{{asset('assets/css/transparent-style.css')}}" rel="stylesheet">
    <link href="{{asset('assets/css/skin-modes.css')}}" rel="stylesheet" />

    <!--- FONT-ICONS CSS -->
    <link href="{{asset('assets/css/icons.css')}}" rel="stylesheet" />

    <!-- COLOR SKIN CSS -->
    <link id="theme" rel="stylesheet" type="text/css" media="all" href="{{asset('assets/colors/color1.css')}}" />


<?php
            $employee = \App\workflow::where('name','employee')->first()->flowworkStep()
            ->get();
			$matrial_request = \App\workflow::where('name','matrial_request')->first()->flowworkStep()
			->get();

			$petty_cash =  \App\workflow::where('name','petty_cash')->first()->flowworkStep()
->get();

$site_request =  \App\workflow::where('name','site_request')->first()->flowworkStep()
->get();

$rfq =  \App\workflow::where('name','rfq')->first()->flowworkStep()
->get();

$subcontractor =\App\workflow::where('name','subcontractor')->first()->flowworkStep()
->get();

$purchase_order = \App\workflow::where('name','purchase_order')->first()->flowworkStep()
->get();
			?>

<style>
       <?php
            $notification =  auth()->user()->notification->take(8);
        ?>
    #containerz {
        width:580px;
        font-family:verdana,arial,helvetica,sans-serif;
        font-size:11px;
        text-align:center;
        margin:auto;
    }
    #containerz a {
        display:block;
        color:#000;
        text-decoration:none;
        background-color:#f6f6ff;
    }
    #containerz a:hover {
        color:#900;
        background-color:#f6f6ff;
    }
    #no1 {
        width:190px;
        line-height:60px;
        border:1px solid #000;
        margin:auto;
    }
    #no1 a {
        height:60px;
    }
    #line1 {
        font-size:0;
        width:1px;
        height:20px;
        color:#fff;
        background-color:#000;
        margin:auto;
    }
    #line2 {
        font-size:0;
        width:424px;
        height:1px;
        color:#fff;
        background-color:#000;
        margin:auto;
    }
    #line3 {
        font-size:0;
        display:inline;
        width:1px;
        height:20px;
        color:#fff;
        background-color:#000;
        margin-left:78px;
        float:left;
    }
    #line4,#line5,#line6 {
        font-size:0;
        display:inline;
        width:1px;
        height:20px;
        color:#fff;
        background-color:#000;
        margin-left:140px;
        float:left;
    }
    #no2 {
        display:inline;
        border:1px solid #000;
        clear:both;
        margin-left:35px;
        float:left;
    }
    #no2 a,#no4 a,#no8 a {
        width:84px;
        height:50px;
        padding-top:8px;
    }
    #no3 {
        display:inline;
        border:1px solid #000;
        margin-left:58px;
        float:left;
    }
    #no3 a,#no5 a,#no6 a,#no7 a,#no9 a {
        width:84px;
        height:42px;
        padding-top:16px;
    }
    #no4 {
        display:inline;
        border:1px solid #000;
        margin-left:53px;
        float:left;
    }
    #no5 {
        display:inline;
        border:1px solid #000;
        margin-left:55px;
        float:left;
    }
    #line7,#line13 {
        font-size:0;
        display:inline;
        width:1px;
        height:38px;
        color:#fff;
        background-color:#000;
        margin-left:219px;
        float:left;
    }
    #line8,#line14 {
        font-size:0;
        display:inline;
        width:1px;
        height:38px;
        color:#fff;
        background-color:#000;
        margin-left:281px;
        float:left;
    }
    #no6,#no8 {
        display:inline;
        border:1px solid #000;
        margin-left:107px;
        float:left;
    }
    #line9,#line11,#line15,#line17 {
        font-size:0;
        display:inline;
        width:26px;
        height:1px;
        color:#fff;
        background-color:#000;
        margin-top:29px;
        float:left;
    }
    #line10,#line12,#line16,#line18 {
        font-size:0;
        display:inline;
        width:1px;
        height:60px;
        color:#fff;
        background-color:#000;
        float:left;
    }
    #line16,#line18 {
        height:30px;
    }
    #no7,#no9 {
        display:inline;
        border:1px solid #000;
        margin-left:169px;
        float:left;
    }
    .clear {
        clear:both;
    }
</style>
<style>
    body{
        text-transform: capitalize !important;
    }
    button {
        text-transform: capitalize !important;
    }
</style>
@yield('style')
</head>
<body class="app sidebar-mini ltr">

    <!-- GLOBAL-LOADER -->
    <div id="global-loader">
        <img src="../assets/images/loader.svg" class="loader-img" alt="Loader">
    </div>
    <!-- /GLOBAL-LOADER -->

    <!-- PAGE -->
    <div class="page">
        <div class="page-main">

        @include('includes.managers.sidebar')
        <div class="content-body content-page" id="app">
            <!-- row -->
            @include('includes.managers.navbar')
            <notify-component></notify-component>
            @yield('content')
        </div>
        @include('includes.footer')
	</div>
    <!-- Required vendors -->



<script src="{{asset('/js/managers.js')}}"></script>


<script>
localStorage.setItem('uID',{{auth()->user()->id}})
    </script>

 <!-- JQUERY JS -->
 <script src="{{asset('assets/js/jquery.min.js')}}"></script>

<!-- BOOTSTRAP JS -->
<script src="{{asset('assets/plugins/bootstrap/js/popper.min.js')}}"></script>
<script src="{{asset('assets/plugins/bootstrap/js/bootstrap.min.js')}}"></script>

<!-- SPARKLINE JS-->
<script src="{{asset('assets/js/jquery.sparkline.min.js')}}"></script>

<!-- SIDE-MENU JS -->
<script src="{{asset('assets/plugins/sidemenu/sidemenu.js')}}"></script>

<!-- Perfect SCROLLBAR JS-->
<script src="{{asset('assets/plugins/p-scroll/perfect-scrollbar.js')}}"></script>
<script src="{{asset('assets/plugins/p-scroll/pscroll.js')}}"></script>
<script src="{{asset('assets/plugins/p-scroll/pscroll-1.js')}}"></script>

<!-- SIDEBAR JS -->
<script src="{{asset('assets/plugins/sidebar/sidebar.js')}}"></script>

<!-- Color Theme js -->
<script src="{{asset('assets/js/themeColors.js')}}"></script>

<!-- Sticky js -->
<script src="{{asset('assets/js/sticky.js')}}"></script>

<!-- CUSTOM JS -->
<script src="{{asset('assets/js/custom.js')}}"></script>



    @yield('js')
	<script>
		function carouselReview(){
			jQuery('.testimonial-one').owlCarousel({
				loop:true,
				autoplay:true,
				margin:20,
				nav:false,
				rtl:true,
				dots: false,
				navText: ['', ''],
				responsive:{
					0:{
						items:3
					},
					450:{
						items:4
					},
					600:{
						items:5
					},
					991:{
						items:5
					},

					1200:{
						items:7
					},
					1601:{
						items:5
					}
				}
			})
		}
		jQuery(window).on('load',function(){
			setTimeout(function(){
				carouselReview();
			}, 1000);
		});
	</script>
</body>
</html>
