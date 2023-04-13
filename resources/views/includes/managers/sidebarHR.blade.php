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
                                <h3>HR</h3>
                            </li>
                            
                  
    


                            <li class="slide">
                                <a class="side-menu__item" data-bs-toggle="slide" href="javascript:void(0)"><i class="side-menu__icon fe fe-slack"></i><span class="side-menu__label">HR</span><i class="angle fe fe-chevron-right"></i></a>
                                <ul class="slide-menu">
              
        
                                <li class="side-nav-item">
                <a href="{{ route('laborer.index') }}" class="side-nav-link">
                    <i class="uil uil-money-bill"></i>
                    <span> time sheet </span>
                </a>
            </li>
            
     
            <li class="side-nav-item">
                <a href="{{ route('user.usertable') }}" class="side-nav-link">
                    <i class="uil uil-user"></i>
                    <span> Users </span>
                </a>
            </li>
           



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
                <a href="{{ route('salary_index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>salaries</span>
                </a>
            </li>


            


         
            <li class="side-nav-item">
                <a href="{{ route('project.index') }}" class="side-nav-link">
                    <i class="uil-briefcase"></i>
                    <span> Projects </span>
                </a>
            </li>
    
                 

            
                 
                        </ul>
                        
      



            

     

            <li class="side-nav-item">
                <a href="{{ route('manager.joboffer.index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>joboffer </span>
                </a>
            </li>

            <li class="side-nav-item">
                <a href="{{ route('manager.service.index') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>services </span>
                </a>
            </li>


            

            
            
            <li class="side-nav-item">
                <a href="{{ route('attendance_Manule') }}" class="side-nav-link">
                    <i class="uil uil-file-edit-alt"></i>
                    <span>Manule attendance </span>
                </a>
            </li>


       
 
           
        


            


                        <div class="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"/></svg></div>
                    </div>
                </div>
            </div>

</div>