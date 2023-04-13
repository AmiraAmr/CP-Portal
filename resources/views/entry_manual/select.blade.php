@extends('layouts.NewManage')
@section('title', 'نوع القيد')
@section('content')
                        <div class="container-lg  border-container">
                            <div class="m-3  row">
                                <div >
                                    <a href="/managers/opening_credit" class="btn btn-danger">
                                        <i class="fas fa-greater-than  pt-1 "></i> Back  
</a>
                                </div>
                                <div class="text-end ">
                                    <a   href="/managers/opening_credit_select" class="btn btn-primary "> opening balances <i class="fa fa-plus" aria-hidden="true"></i></a>
                                            
                                                 <a   href="/managers/createmanule" class="btn btn-primary ">create accounting restrictions <i class="fa fa-plus" aria-hidden="true"></i></a>
                                </div>
                                
                  <div class="card">
                                          
                  <div class="card-body">

     
                                <div class=" text-center mb-5 mt-5 ">
                                    
                                    <div class="row">
                                        <div class="col-lg-12  d-flex justify-content-center">
                                        <div class="col-4">
                                        <a href="{{route('opening_credit.createaccounting')}}">       <img src="/assets/account.png"   style="hight:100px; width: 100px;"></a>

                                        <a href="{{route('opening_credit.createaccounting')}}">      <h5 class="text-blue ">accounting</h5></a>

                                            
                                            
                                        </div>
                                        <div class="col-4">
                                        <a href="{{route('opening_credit.createproduct')}}">      <img src="/assets/delivery-box.png" style="hight:100px;  width: 100px;"></a>

                                        <a href="{{route('opening_credit.createproduct')}}">        <h5 class="text-blue"> products</h5></a>
                                        </div>
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-lg-12  d-flex justify-content-center">
                                        <div class="col-4">
                                         <a href="{{route('createopening_credit')}}" >  <img src="/assets/rating.png" style="hight:100px;  width: 100px;"></a>
                                         <a href="{{route('createopening_credit')}}">     <h5 class="text-blue">customers</h5></a>
                                            

                                            
                                        </div>
                                        <div class="col-4">
                              <a href="{{route('opening_credit.createsuppiler')}}">              <img src="/assets/supplier.png" style="hight:100px;  width: 100px;" > </a>
                              <a href="{{route('opening_credit.createsuppiler')}}">     <h5 class="text-blue">suppliers</h5></a>
                                        </div>
                                        </div>
                                   
                                    </div>
                                </div>
                                </div>

                                </div>
                                </div>


                            </div>
                        </div>
                        @endsection