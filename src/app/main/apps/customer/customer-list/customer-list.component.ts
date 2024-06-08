
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { VehicleService } from 'app/auth/service/vehicle.service';
import { AccountsService } from 'app/auth/service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { ShiftService } from '../../shift/shift.service';
import { TechnicianService } from '../../technician/technician.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CustomerListComponent implements OnInit {

// Public
public contentHeader: object;
public sidebarToggleRef = false;
public rows;
public selectedOption = 10;
public ColumnMode = ColumnMode;
public temp = [];
public previousRoleFilter = '';
public previousPlanFilter = '';
public previousStatusFilter = '';
public  data :any;
public selectRole: any = [
  { name: 'All', value: '' },
  { name: 'Admin', value: 'Admin' },
  { name: 'Author', value: 'Author' },
  { name: 'Editor', value: 'Editor' },
  { name: 'Maintainer', value: 'Maintainer' },
  { name: 'Subscriber', value: 'Subscriber' }
];

public selectPlan: any = [
  { name: 'All', value: '' },
  { name: 'Basic', value: 'Basic' },
  { name: 'Company', value: 'Company' },
  { name: 'Enterprise', value: 'Enterprise' },
  { name: 'Team', value: 'Team' }
];

public selectStatus: any = [
  { name: 'All', value: '' },
  { name: 'Pending', value: 'Pending' },
  { name: 'Active', value: 'Active' },
  { name: 'Inactive', value: 'Inactive' }
];

public selectedRole = [];
public selectedPlan = [];
public selectedStatus = [];
public searchValue = '';

// Decorator
@ViewChild(DatatableComponent) table: DatatableComponent;

// Private
private tempData = [];
private _unsubscribeAll: Subject<any>;

/**
 * Constructor
 *
 * @param {CoreConfigService} _coreConfigService
 * 
 * @param {CoreSidebarService} _coreSidebarService
 */
constructor(
  private _coreSidebarService: CoreSidebarService,
  private modalService: NgbModal,
  private _customerService:CustomerService,
  private _toastrService: ToastrService,
  private _shiftService:ShiftService,
) {
  this._unsubscribeAll = new Subject();
}

// Public Methods
// -----------------------------------------------------------------------------------------------------

/**
 * filterUpdate
 *
 * @param event
 */
filterUpdate(event) {
  // Reset ng-select on search
  this.selectedRole = this.selectRole[0];
  this.selectedPlan = this.selectPlan[0];
  this.selectedStatus = this.selectStatus[0];
  this.rows=this.tempData;
  const val = event.target.value.toLowerCase();

  // Filter Our Data
  const temp = this.rows.filter(function (d) {
    return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // Update The Rows
  this.rows = temp;
  // Whenever The Filter Changes, Always Go Back To The First Page
  this.table.offset = 0;
}

/**
 * Toggle the sidebar
 *
 * @param name
 */
toggleSidebar(name): void {
  this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
}

/**
 * Filter By Roles
 *
 * @param event
 */
filterByRole(event) {
  const filter = event ? event.value : '';
  this.previousRoleFilter = filter;
  this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
  this.rows = this.temp;
}

/**
 * Filter By Plan
 *
 * @param event
 */
filterByPlan(event) {
  const filter = event ? event.value : '';
  this.previousPlanFilter = filter;
  this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
  this.rows = this.temp;
}

/**
 * Filter By Status
 *
 * @param event
 */
filterByStatus(event) {
  const filter = event ? event.value : '';
  this.previousStatusFilter = filter;
  this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
  this.rows = this.temp;
}

/**
 * Filter Rows
 *
 * @param roleFilter
 * @param planFilter
 * @param statusFilter
 */
filterRows(roleFilter, planFilter, statusFilter): any[] {
  // Reset search on select change
  this.searchValue = '';

  roleFilter = roleFilter.toLowerCase();
  planFilter = planFilter.toLowerCase();
  statusFilter = statusFilter.toLowerCase();

  return this.tempData.filter(row => {
    const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
    const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
    const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
    return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
  });
}

// Lifecycle Hooks
// -----------------------------------------------------------------------------------------------------
/**
 * On init
 */
ngOnInit(): void {
  this.contentHeader = {
    headerTitle: 'Customer',
    actionButton: true,
    breadcrumb: {
      type: '',
      links: [
        {
          name: 'Home',
          isLink: true,
          link: '/'
        },
        {
          name: 'Customers',
          isLink: true,
          link: '/'
        },
        {
          name: 'List',
          isLink: false
        }
      ]
    }
  };
  // Subscribe config change
  this.GetCustomers();
  
}

/**
 * On destroy
 */
ngOnDestroy(): void {
  // Unsubscribe from all subscriptions
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}

modalOpenPrimary(modalPrimary,rolobj) {
  this.data = {
    id: 2,
    fullName: 'Halsey Redmore',
    company: 'Skinder PVT LTD',
    role: 'Author',
    username: 'hredmore1',
    country: 'Albania',
    contact: '(472)607-9137',
    email: 'user@gmail.com',
    currentPlan: 'Team',
    status: 'Active',
    address: '345 west NY US',
    avatar: 'assets/images/avatars/Avatar.png'
  };
  this.modalService.open(modalPrimary, {
    centered: true,
    size: 'xl',
    windowClass: 'modal modal-primary'
  });

}
public calllogs:any[]=[
  { id:1,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:2,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:3,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:4,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:5,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:6,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'47 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:7,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:8,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:9,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'49 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:10,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:11,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  { id:12,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'5 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
  
];
public priorities = [{ name: 'normal' }, { name: 'high' }, { name: 'critical' }];

 
loading;
//Implementing End Points 
//GetVendors
GetCustomers()
{
  this.sectionBlockUI.start();

 this._customerService
 .getAllCustomer()
 .pipe(first())
 .subscribe(
   data => {
   
      this.rows=data.result.items;
      console.log(this.rows)
      this.tempData=this.rows;
      this.sectionBlockUI.stop();
   },
   error => {
     
     this._toastrService.error(error.error.message, 'Loading Error', {
       positionClass: 'toast-top-right',
       toastClass: 'toast ngx-toastr',
       closeButton: true
     });
     this.sectionBlockUI.stop();
   }
 );
}
fetchShifts(): void {
  this._shiftService.getAllShifts().subscribe(
    (data: any) => {
      this.rows = data.result.items;

      console.log(this.rows)
    },
    (error: any) => {
      console.error('Error fetching shifts:', error);
    }
  );
}

//DeleteAccount
DeleteAccount(id)
{
  this.sectionBlockUI.start();
 this._customerService
 .DeleteCustomer(id)
 .pipe(first())
 .subscribe(
   data => {
     debugger
     this.sectionBlockUI.stop();
     this.GetCustomers();
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Customer has been deleted.',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
   },
   error => {
     
     this._toastrService.error(error.error.message, 'Deletion Error', {
       positionClass: 'toast-top-right',
       toastClass: 'toast ngx-toastr',
       closeButton: true
     });
     this.sectionBlockUI.stop();
   }
 );
}
@BlockUI() sectionBlockUI: NgBlockUI;
ConfirmTextOpen(id) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#7367F0',
    cancelButtonColor: '#E42728',
    confirmButtonText: 'Yes, delete it!',
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger ml-1'
    }
  }).then((result) => {
    if (result.value) {
       this.DeleteAccount(id);
    }
  });
}
}
