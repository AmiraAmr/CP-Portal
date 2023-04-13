<?php
$purchasez = \App\Purchase_order::where('status',0)->count();
$petty_cashz = \App\petty_cash::where('status',0)->count();
$Subcontractorz = \App\subcontractor::where('status',0)->count();
?>

    <div class="sticky">
                <div class="app-sidebar__overlay" data-bs-toggle="sidebar"></div>
                <div class="app-sidebar">
                    <div class="side-header">
                      
                        <!-- LOGO -->
                    </div>
                    <div class="main-sidemenu">
                        <div class="slide-left disabled" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"/></svg></div>
                        <ul class="side-menu">
                            <li class="sub-category">
                                <h3>financial</h3>
                            </li>
                            
                  
                                         
                            <li class="slide">
                                <a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)"><i class="side-menu__icon fe fe-slack"></i><span class="side-menu__label">Procurement</span><i class="angle fe fe-chevron-right"></i></a>
                                <ul class="slide-menu">
                                @if(!empty(Auth::user()->role))
            @foreach($purchase_order as $purchase)
            @if(Auth::user()->role->name == $purchase->role->name) 
            <li class="side-nav-item">
                <a href="{{ route('managers.index_purchase_order_request') }}" class="side-nav-link {{ Route::currentRouteNamed('managers.index_purchase_order_request') ? 'active' : '' }}">
                 
                    <span> Purchase order <span class="badge bg-danger border-0" >{{$purchasez}} </span> </span>
                </a>
            </li>
            @endif
            @endforeach
            @endif
         

      

            <li class="side-nav-item">
                <a href="{{ route('managers.pricing_supplier.index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>pricing_supplier </span>
                </a>
            </li>


          
            <li class="side-nav-item">
                <a href="{{ route('product_table') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>building materials </span>
                </a>
            </li>



        </ul>
                            </li>
                      
                 
                      
             


                            
                            <li class="slide">
                                <a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)"><i class="side-menu__icon fe fe-slack"></i><span class="side-menu__label">customer & suppliers</span><i class="angle fe fe-chevron-right"></i></a>
                                <ul class="slide-menu">
              
        
                                <li class="side-nav-item">
                <a href="{{ route('suppliertable') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>   supplier </span>
                </a>
            </li>


                                <li class="side-nav-item">
                <a href="{{ route('customerindex') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>customer</span>
                </a>
            </li>




</li>                      




</li>                         





                                </ul>
                            </li>
              
                                                 


                                @if(!empty(Auth::user()->role))
            @foreach($matrial_request as $matrial)
            @if(Auth::user()->role->name == $matrial->role->name)
            <li class="side-nav-item">
                <a href="{{ route('managers.index_matrial_request') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span> Matrial Request </span>
                </a>
            </li>
            @endif
            @endforeach
            @endif

            
            @if(!empty(Auth::user()->role))
            @foreach($petty_cash as $petty)
            @if(Auth::user()->role->name == $petty->role->name)
                <li class="side-nav-item">
                    <a href="{{ route('managers.index_petty_cash_request') }}" class="side-nav-link">
                        <i class="uil uil-money-bill"></i>
                        <span> Petty Cash  <span class="badge bg-danger border-0" >{{$petty_cashz}} </span> </span>
                    </a>
                </li>
            @endif
            @endforeach
            @endif

            @if(!empty(Auth::user()->role))
            @foreach($site_request as $site)
            @if(Auth::user()->role->name == $site->role->name)
            <li class="side-nav-item">
                <a href="{{ route('managers.index_site_request') }}" class="side-nav-link">
                    <i class="uil uil-globe"></i>
                    <span> Site Request </span>
                </a>
            </li>
            @endif
            @endforeach
            @endif

            
            @if(!empty(Auth::user()->role))

            @foreach($employee as $employes)
            
            @if(Auth::user()->role->name == $employes->role->name)

                <li class="side-nav-item">
                    <a href="{{ route('managers.index_employee_request') }}" class="side-nav-link">
                    
                        <span> Employee Request </span>
                    </a>
                </li>
            @endif
            @endforeach
            @endif

        
            @if(!empty(Auth::user()->role))
            @foreach($rfq as $rf)
           
            @if(Auth::user()->role->name == $rf->role->name)
                <li class="side-nav-item">
                    <a href="{{ route('managers.index_rfq_request') }}" class="side-nav-link">
                 
                        <span> Rfq </span>
                    </a>
                </li>
            @endif
            @endforeach
            @endif

            
            @if(!empty(Auth::user()->role))
            @foreach($subcontractor as $sub)
          
            @if(Auth::user()->role->name == $sub->role->name)
                <li class="side-nav-item">
                    <a href="{{ route('managers.index_subcontractor_request') }}" class="side-nav-link">
                    
                        <span> Subcontractor Invoice  <span class="badge bg-danger border-0" >{{$Subcontractorz}} </span>  </span>
                    </a>
                </li>
            @endif
            @endforeach
            @endif

       

            <li class="side-nav-item">
                <a href="{{ route('contractorindex') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>contractor</span>
                </a>
            </li>

            <li class="side-nav-item">
                <a href="{{ route('laborer.index') }}" class="side-nav-link">
                    <i class="uil uil-money-bill"></i>
                    <span> time sheet </span>
                </a>
            </li>



            <li class="side-nav-item">
                <a href="{{ route('managers.index_CWS') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>contract </span>
                </a>
            </li>

            
            <li class="side-nav-item">
                <a href="{{ route('task.index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>task</span>
                </a>
            </li>

            
            <li class="side-nav-item">
                <a href="{{ route('dc.index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>DCC</span>
                </a>
            </li>

            

            
            <li class="side-nav-item">
                <a href="{{ route('daily_report_index.managers') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>daily_report</span>
                </a>
            </li>


            <li class="side-nav-item">
                <a href="{{ route('managers.index_CWS') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>contract </span>
                </a>
            </li>







     

          
        
            




            
            




           
        


            


                        <div class="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg></div>
                    </div>
                </div>
            </div>

</div>