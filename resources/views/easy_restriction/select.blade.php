@extends('layouts.NewManage')
@section('title', 'نوع القيد ')
@section('content')
<div class="container-lg  border-container">
                            <div class="m-3  row">
                                <div class="col-6">
                                    <button type="button" class="btn btn-lightblue">
                                        <i class="fas fa-greater-than  pt-1 "></i> رجوع  
                                       </button>
                                </div>
                               
                        <div class="card">
                                     
                        <div class="card-body">
                        <div class="card-header"> اختيار نوع القيد</div>
                                <div class=" text-center mb-5 mt-5 ">
  
                                    <div class="row mb-5 ">
                                        <div class="col-lg-12  d-flex justify-content-center">
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 bg-white ">
                                         
                                        
                                        <a  href="{{route('moneymovements')}}" > <img src="/assets/images/money-management.png" style="height: 100px;width:150px ;">
</a>
<a  href="{{route('moneymovements')}}" >   <h5 class="text-blue ">تحركات أموال</h5></a>
 
                                        </div>
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
                                        <a href="{{route('withdraw')}}"  >  <img src="/assets/images/cash-withdrawal.png" style="height: 100px;width:150px ;">
</a>
<a href="{{route('withdraw')}}"  > <h5 class="text-blue ">سحب المالك</h5>
</a>
                                 
                                            
                                        </div>
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 ">
                                        <a href="{{route('Fixedasset')}}"  >   <img src="/assets/images/fixed-asset.png" style="height: 100px;width:150px ;">

</a>
                                         <a href="{{route('Fixedasset')}}"  > <h5 class="text-blue">

اهلاك اصل ثابت

                                         </h5></a>
                                        </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12  d-flex justify-content-center">
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 " >
                                         <a href="{{route('payrollaccounting_entries')}}" >  <img src="/assets/images/salary.png" style="height: 100px;width:150px ;"></a>

                                            <div class="text-blue p-3 btn-lightblue " style="width: 150px;">
                                            
                                            
                                            <a href="{{route('payrollaccounting_entries')}}" >    <h5 class="text-blue">   محاسبة الرواتب</h5></a>
                                        
                                        
                                        </div>
                                            
                                        </div>
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12  ">
                                        <a href="{{route('moneycapital')}}">     <img src="/assets/images/investment.png" style="height: 100px;width:150px ;">
</a>
                                    <a href="{{route('moneycapital')}}">       <h5 class="text-blue ">راس المال</h5></a>

                                            
            
                                        </div>
                                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12 " >
                                        <a href="{{route('profits')}}">     <img src="/assets/images/profits.png" style="height: 100px;width:150px ;"></a>


                                            <a href="{{route('profits')}}">                    <h5 class="text-blue">توزيع الارباح</h5></a>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

      @endsection
