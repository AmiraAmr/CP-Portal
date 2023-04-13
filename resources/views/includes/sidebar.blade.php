

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
                                <h3>Main</h3>
                            </li>
                  
                      
                            <li class="slide">
                                <a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)"><i class="side-menu__icon fe fe-slack"></i><span class="side-menu__label">Requests & Tasks</span><i class="angle fe fe-chevron-right"></i></a>
                                <ul class="slide-menu">
                         
                                    <li class="side-nav-item">
                <a href="{{ route('user.purchase_tablez') }}" class="side-nav-link">
                    <i class="uil uil-invoice"></i>
                    <span> Purchase order </span>
                </a>
            </li>

            <li class="side-nav-item">
                <a href="{{ route('index.task.Emp') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>task</span>
                </a>
            </li>
                   
        
            <li class="side-nav-item">
                <a href="{{ route('user.index_frq_inv') }}" class="side-nav-link">
                    <i class="uil uil-layer-group"></i>
                    <span> Rfq </span>
                </a>
            </li>
            <li class="side-nav-item">
                <a href="{{ route('user.index_employee_inv') }}" class="side-nav-link">
                    <i class="uil uil-users-alt"></i>
                    <span> Employee Request </span>
                </a>
            </li>
            <li class="side-nav-item">
                <a href="{{ route('user.index_site_inv') }}" class="side-nav-link">
                    <i class="uil uil-globe"></i>
                    <span> Site Request </span>
                </a>
            </li>
            <li class="side-nav-item">
                <a href="{{ route('user.index_petty_cash') }}" class="side-nav-link">
                    <i class="uil uil-money-bill"></i>
                    <span> Petty Cash </span>
                </a>
            </li>

   
            <li class="side-nav-item">
                <a href="{{ route('user.index_matrial_request') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span> Matrial Request </span>
                </a>
            </li>


            

            <li class="side-nav-item">
                <a href="{{ route('user.contractorindex') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>contractor</span>
                </a>
            </li>
            


            


                                </ul>
                            </li>
                      
                            @if( !empty(auth()->user()->projectmanager()) && auth()->user()->projectmanager)
                            
                            <li class="slide">
                                <a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)"><i class="side-menu__icon fe fe-slack"></i><span class="side-menu__label">project manager</span><i class="angle fe fe-chevron-right"></i></a>
                                <ul class="slide-menu">
     
     
                                
            <li class="side-nav-item">
                <a href="{{ route('user.index_CWS') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>subcontractor invoice </span>
                </a>
            </li>

            <li class="side-nav-item">
                <a href="{{ route('user.Archives') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>Archives </span>
                </a>
            </li>

            

                                @if( !empty(auth()->user()->projectmanager()) && auth()->user()->projectmanager)
            <li class="side-nav-item">
                <a href="{{ route('daily_report_index.user') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>team leader reports</span>
                </a>
            </li>
            @endif

            
            @if( !empty(auth()->user()->projectmanager()) && auth()->user()->projectmanager)
            <li class="side-nav-item">
                <a href="{{ route('projectManager.dc.index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>DCC</span>
                </a>
            </li>
            @endif

                     
            @if( !empty(auth()->user()->projectmanager()) && auth()->user()->projectmanager)
            <li class="side-nav-item">
                <a href="{{ route('projectmanager.timesheet') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>project TimeSheet</span>
                </a>
            </li>

            
            @endif
            <li class="side-nav-item">
                <a href="{{ route('projectmanager.projectstimesheetPage') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>project summary</span>
                </a>
            </li>


            <li class="side-nav-item">
                <a href="{{ route('projectmanager.index_laborer') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>laborer  </span>
                </a>
            </li>
           
            <li class="side-nav-item">
                <a href="{{ route('projectmanager.attendance_absence_manule') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>manule attendance </span>
                </a>
            </li>


        
            
                                </ul>
                            </li>
            @endif

                            
                            @if(auth()->user()->role && auth()->user()->role->name == 'Team Leader' || auth()->user()->role && auth()->user()->role->name == 'Projects Manger')
            <li class="side-nav-item">
                <a href="{{ route('daily_report_index.user') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>daily_report</span>
                </a>
            </li>
            @endif



            

            

            
            

            
            <li class="side-nav-item">
                <a href="{{ route('user.joboffer.index') }}" class="side-nav-link">
                <img src="/ICONS/handshake.png" class="img-thumbnail" alt="...">
                    <span>joboffer</span>
                </a>
            </li>


            <li class="side-nav-item">
                <a href="{{ route('user.service.index') }}" class="side-nav-link">
                <img src="/ICONS/customer.png" class="img-thumbnail" alt="...">
                    <span>services</span>
                </a>
            </li>

            <li class="side-nav-item">
                <a href="{{ route('user.contractorindex') }}" class="side-nav-link">
                <img src="/ICONS/workers.png" class="img-thumbnail" alt="...">
                    <span>contractor</span>
                </a>
            </li>


            
            <li class="side-nav-item">
                <a href="{{ route('pricing_supplierindex') }}" class="side-nav-link">
                <img src="/ICONS/tag.png" class="img-thumbnail" alt="...">
                    <span>pricing_supplier</span>
                </a>
            </li>
            <li class="side-nav-item">
                <a href="{{ route('user.suppliertable') }}" class="side-nav-link">
                <img src="/ICONS/supplier.png" class="img-thumbnail" alt="...">
                    <span>supplier</span>
                </a>
            </li>

     


            

            

            <li class="side-nav-item">
                <a href="{{ route('mytimesheet') }}" class="side-nav-link">
                <img src="/ICONS/calendar.png" class="img-thumbnail" alt="...">
                    <span>TimeSheet</span>
                </a>
            </li>
        
                  

            <li class="side-nav-item">
                <a href="{{ route('tender.index') }}" class="side-nav-link">
              
                    <span>tender</span>
                </a>
            </li>


            <li class="side-nav-item">
                <a href="{{ route('marketing.index.user') }}" class="side-nav-link">
         
                    <span>marketing</span>
                </a>
            </li>
                      
            
                        </ul>
                        <div class="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg></div>
                    </div>
                </div>
            </div>

</div>