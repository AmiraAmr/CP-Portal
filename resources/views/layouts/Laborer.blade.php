<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

 
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->

    <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="{{asset('User/vendor/chartist/css/chartist.min.css')}}">
    <link href="{{asset('User/vendor/bootstrap-select/dist/css/bootstrap-select.min.css')}}" rel="stylesheet">
	<link href="{{asset('User/vendor/owl-carousel/owl.carousel.css')}}" rel="stylesheet">
	<!-- /global stylesheets -->
    <link href="{{asset('/css/icons.min.css')}}" rel="stylesheet">
    <link href="{{asset('/css/app.min.css')}}" rel="stylesheet">
	
  
	<!-- Core JS files -->
	<script src="{{asset('/global_assets/js/main/jquery.min.js')}}"></script>
	<script src="{{asset('/global_assets/js/main/bootstrap.bundle.min.js')}}"></script>
	<script src="{{asset('/global_assets/js/plugins/loaders/blockui.min.js')}}"></script>
    @yield('style')

    <style>

body,
html {
    width: 100%;
    height: 100%;
}

body {
    background: #010c1f;
    
}

#app {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

section.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
}

h3.is-3,
p.time {
    color: white;
}

h3.is-3:not(:last-child) {
    margin: 0;
    padding: 0;
}

.time {
    font-size: 7em;
}

.shadow {
    text-shadow: 0 0 15px rgba(100, 100, 100, 0.75);
}


.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 500px;

  
  .camera-button {
    margin-bottom: 2rem;
  }
  
  .camera-box {    
    .camera-shutter {
      opacity: 0;
      width: 450px;
      height: 337.5px;
      background-color: #fff;
      position: absolute;
      
      &.flash {
        opacity: 1;
      }
    }
  }
  
  .camera-shoot {
    margin: 1rem 0;
    
    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      
      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }
  
  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;
    
    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }
    
    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;
      
      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;
        
        &:nth-child(2) {
          animation-delay: .2s;
        }
        
        &:nth-child(3) {
          animation-delay: .4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }
}
</style>
</head>
<body>
<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="/">
                    <img src="./index.jpg" alt="" height="75" class="d-inline-block align-text-top">
                  </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                      
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item"
                                
                                href="/home"
                                     >
                home
                                    </a>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

    <div id="app">
 
        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <script src="{{asset('/js/app.js')}}"></script>
    
    <script src="{{asset('User/vendor/global/global.min.js')}}"></script>
	<script src="{{asset('User/vendor/bootstrap-select/dist/js/bootstrap-select.min.js')}}"></script>
	<script src="{{asset('/vendor/chart.js/Chart.bundle.min.js')}}"></script>
	
	<!-- Chart piety plugin files -->
    <script src="{{asset('User/vendor/peity/jquery.peity.min.js')}}"></script>
	
	<!-- Apex Chart -->
	<script src="{{asset('User/vendor/apexchart/apexchart.js')}}"></script>
	
	<!-- Dashboard 1 -->
	<script src="{{asset('User/js/dashboard/dashboard-1.js')}}"></script>
	
	<script src="{{asset('User/vendor/owl-carousel/owl.carousel.js')}}"></script>
    <script src="{{asset('User/js/custom.min.js')}}"></script>
	<script src="{{asset('User/js/deznav-init.js')}}"></script>
    <script src="{{asset('assets/js/vendor.min.js')}} "></script>
    <script src="{{asset('assets/js/app.min.js')}}" ></script>
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