import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ContactListService } from 'app/main/apps/contacts/contact-list/contact-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListComponent implements OnInit {

  receivedData: string;
  public SettingLabel:string;
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  public settingObj:any;

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

  @ViewChild(DatatableComponent) table: DatatableComponent;

  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _contactListService: ContactListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _toastrService: ToastrService,
    private modalService: NgbModal,
    private _authservice:AuthenticationService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) {
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.LoadData();
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

  receiveData(data: string) {    
    this.LoadData();
    this.modalService.dismissAll();
  }


  ngOnInit(): void {
   this.LoadData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  delete(id)
  {
    this._contactListService.delete(id).pipe()
    .subscribe(
        data => {            
            this.LoadData();
            this._toastrService.info("Contact Successfully Deleted", 'Contact Deleted', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          },
      error => {
        this._toastrService.error(error.message, 'Contact Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      }
    );
  }
  
  LoadData()
  {
    this._contactListService.getContactsList().pipe()
    .subscribe(
        data => {            
            this.rows = data;
          },
      error => {        
        this._toastrService.error(error.message, 'Contact Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      }
    );
  }

  userHasPermission(permission: string): boolean {    
    var permissions=this._authservice.currentUserValue.permissions;
    return this._authservice.currentUserValue.permissions.includes(permission);
  }

  formatPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber || isNaN(Number(phoneNumber))) {
      return phoneNumber;
    }

    let cleaned = phoneNumber.replace(/\D/g, '');
    if(cleaned.startsWith("1"))
    {
      cleaned = cleaned.substring(1);
    }
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return phoneNumber;
  }
  
  modalOpenPrimary(modalPrimary,rolobj) {
    this.SettingLabel="Edit Contact";  
    this.settingObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });  
  }

  modalAddRole(modalPrimary) {
    this.SettingLabel="Add New Contact";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }
}

