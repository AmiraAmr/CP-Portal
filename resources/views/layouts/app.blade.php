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
    <link href="{{asset('/css/icons.min.css')}}" rel="stylesheet">
    <link href="{{asset('/css/app.min.css')}}" rel="stylesheet">
    @yield('style')
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
</body>
</html>
