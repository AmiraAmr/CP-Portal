@extends('layouts.app')

@section('content')
<div class="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-xxl-4 col-lg-5">
                <div class="card">

                    <!-- Logo -->
                    <div class="card-header pt-4 pb-4 text-center bg-primary">
                        <a href="index.html">
                            <span><img src="./index.jpg" alt="" height="18"></span>
                        </a>
                    </div>

                    <div class="card-body p-4">
                        
                        <div class="text-center w-75 m-auto">
                            <h4 class="text-dark-50 text-center pb-0 fw-bold">Sign In</h4>
                            <p class="text-muted mb-4">Enter your email address and password to access admin panel.</p>
                        </div>

                        <form method="POST" action="{{ route('login') }}">
                            @csrf
                            <div class="mb-3">
                                <label for="emailaddress" class="form-label">Email address</label>
                                <input class="form-control @error('email') is-invalid @enderror" id="email" type="email" name="email" value="{{ old('email') }}" required="" placeholder="Enter your email">
                                @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                
                                @if (Route::has('password.request'))
                                    <a href="{{ route('password.request') }}" class="text-muted float-end"><small>Forgot your password?</small></a>
                                @endif

                                <label for="password" class="form-label">Password</label>
                                <div class="input-group input-group-merge">
                                    <input type="password" id="password" class="form-control @error('password') is-invalid @enderror" placeholder="Enter your password"  name="password" required autocomplete="current-password">
                                    <div class="input-group-text" data-password="false">
                                        <span class="password-eye"></span>
                                    </div>
                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>

                            <div class="mb-3 mb-3">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="checkbox-signin" checked="" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                    <label class="form-check-label" for="checkbox-signin">Remember me</label>
                                </div>
                            </div>

                            <div class="mb-3 mb-0 text-center">
                                <button class="btn btn-primary" type="submit"> {{ __('Login') }} </button>
                            </div>

                        </form>
                    </div> <!-- end card-body -->
                </div>
                <!-- end card -->

                <div class="row mt-3">
                    <div class="col-12 text-center">
                        <p class="text-muted">Don't have an account? <a href="pages-register.html" class="text-muted ms-1"><b>Sign Up</b></a></p>
                    </div> <!-- end col -->
                </div>
                <!-- end row -->

            </div> <!-- end col -->
        </div>
        <!-- end row -->
    </div>
    <!-- end container -->
</div>
@endsection

@section('style')
<style>
.card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
    padding: 0 !important;
    background: #fff !important;
}
.card-header:first-child img {
    width: 100%;
    height: 200px;
    object-fit: contain;
}
</style>

@endsection