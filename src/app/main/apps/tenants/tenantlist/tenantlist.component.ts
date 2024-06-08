
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TenantsService } from '../tenants.service';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tenantlist',
  templateUrl: './tenantlist.component.html',
  styleUrls: ['./tenantlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TenantlistComponent implements OnInit {

  
  receivedData: string;
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  public targettenantObj:any;

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
  receiveData(data: string) {
    this.GetData();
    this.modalService.dismissAll();
  }

  constructor(
    private _tenantService: TenantsService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _toastrService: ToastrService,
    private modalService: NgbModal,
    private _authservice:AuthenticationService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();
  }

 
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

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

  public isAuthorize:boolean;
  
  ngOnInit(): void {
    if(this.userHasPermission("Pages.Tenants"))
    {
      this.isAuthorize=true;
      
      this.GetData();    
    }
    else 
    {
      this.isAuthorize=false;
      this.router.navigateByUrl("pages/miscellaneous/not-authorized");
    }
  }

  userHasPermission(permission: string): boolean {
    var permissions=this._authservice.currentUserValue.permissions;
    return this._authservice.currentUserValue.permissions.includes(permission);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  GetData()
  {
    this._tenantService.getTenantList().pipe()
    .subscribe(
        data => {
            this.rows = data;
          },
      error => {
        
        this._toastrService.error(error.message, 'Tenant List Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }

  delete(id)
  {
    this._tenantService.delete(id).pipe()
    .subscribe(
        data => {
            this.GetData();
            this._toastrService.success("Tenant Deleted", 'Tenant Deleting', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          },
      error => {
        this._toastrService.error(error.message, 'Tenant Deleting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }
 
  public SettingLabel:string;
  
  modalOpenPrimary(modalPrimary,rolobj) {
    this.SettingLabel="Edit Tenant";
    this.targettenantObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }

  modalAddRole(modalPrimary) {
    this.SettingLabel="Add New Tenant";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }
  
}

