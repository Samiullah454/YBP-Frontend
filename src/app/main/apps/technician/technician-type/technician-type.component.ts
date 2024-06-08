import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
//import { driverTypeModel } from 'app/auth/models/Driver/driverTypeModel';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
//import { RateService } from 'app/auth/service/rateService';
import { AccountsService } from 'app/auth/service';


@Component({
  selector: 'app-technician-type',
  templateUrl: './technician-type.component.html',
  styleUrls: ['./technician-type.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TechnicianTypeComponent implements OnInit {

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

public searchValue = '';
//typeToEdit :driverTypeModel;
// Decorator
@ViewChild(DatatableComponent) table: DatatableComponent;

// Private
private tempData = [];
private _unsubscribeAll: Subject<any>;
constructor(
  private _coreSidebarService: CoreSidebarService,
  private modalService: NgbModal,
  private _accountService:AccountsService,
  private _toastrService: ToastrService,
  private cdr: ChangeDetectorRef
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
  
   debugger
  const val = event.target.value.toLowerCase();

  // Filter Our Data
  const temp = this.rows.filter(function (d) {
    return d.name.toLowerCase().indexOf(val) !== -1 || !val;
  });
  if(val!="")
  {
    this.rows = temp;
  }
  else {
    this.rows = this.tempData ;
  }
    
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


filterByRole(event) {
  const filter = event ? event.value : '';
  this.previousRoleFilter = filter;
  this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
  this.rows = this.temp;
}


filterByPlan(event) {
  const filter = event ? event.value : '';
  this.previousPlanFilter = filter;
  this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
  this.rows = this.temp;
}


filterByStatus(event) {
  const filter = event ? event.value : '';
  this.previousStatusFilter = filter;
  this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
  this.rows = this.temp;
}


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
    headerTitle: 'Account Types',
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
          name: 'Accounts',
          isLink: true,
          link: '/apps/account/list'
        },
        {
          name: 'Account Types',
          isLink: false
        }
      ]
    }
  };
  this.GetAllAcountTypes();
}

/**
 * On destroy
 */
ngOnDestroy(): void {
  // Unsubscribe from all subscriptions
  this._unsubscribeAll.next();
  this._unsubscribeAll.complete();
}

openedittypeModel(modalPrimary,typobj) {
  debugger
  //this.typeToEdit=typobj;
  this.modalService.open(modalPrimary, {
    backdrop: false,
    centered: true,
    size: '',
    windowClass: 'modal modal-primary'
  });

}
openaddtypemodel(modalPrimary) {
  debugger
  this.modalService.open(modalPrimary, {
    backdrop: false,
    centered: true,
    size: '',
    windowClass: 'modal modal-primary'
  });
}

 loading:boolean;

GetAllAcountTypes()
{
  // this.sectionBlockUI.start();
  // debugger
  // this._accountService
  // .GetAllAccountTypes()
  // .pipe(first())
  // .subscribe(
  //   data => {
  //     debugger
      
  //     this.rows=data.data;
  //     this.tempData=this.rows;
  //     this.sectionBlockUI.stop();
  //   },
  //   error => {
      
  //     this._toastrService.error(error.error.message, 'Loading Error', {
  //       positionClass: 'toast-top-right',
  //       toastClass: 'toast ngx-toastr',
  //       closeButton: true
  //     });
  //     this.sectionBlockUI.stop();
  //   }
  // );
}

 //DeleteDriverType
 DeleteAccountType(id)
 {
  // this.sectionBlockUI.start();
  // this._accountService
  // .DeleteAccountType(id)
  // .pipe(first())
  // .subscribe(
  //   data => {
  //     debugger
  //     this.sectionBlockUI.stop();
      
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Deleted!',
  //       text: 'Account Type has been deleted.',
  //       customClass: {
  //         confirmButton: 'btn btn-success'
  //       }
  //     });
  //     this.GetAllAcountTypes();
  //   },
  //   error => {
      
  //     this._toastrService.error(error.error.message, 'Deletion Error', {
  //       positionClass: 'toast-top-right',
  //       toastClass: 'toast ngx-toastr',
  //       closeButton: true
  //     });
  //     this.sectionBlockUI.stop();
  //   }
  // );
 }

 onDataReceivedfromChild(data: any): void {
  debugger
  this.rows = data.data;
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
       this.DeleteAccountType(id);
    }
  });
}
}
