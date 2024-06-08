import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BandwidthsettingsService } from '../bandwidthsettings.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';


@Component({
  selector: 'app-settinglist',
  templateUrl: './settinglist.component.html',
  styleUrls: ['./settinglist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettinglistComponent implements OnInit {

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
  public packages:[];
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  receiveData(data: string) {
    this.LoadData();
    this.modalService.dismissAll();
  }

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
    private _coreConfigService: CoreConfigService,
    private _bandwidthListService: BandwidthsettingsService,
    private _toastrService: ToastrService,
    private _router: Router,
    private modalService: NgbModal,
    private _authservice:AuthenticationService,
    private router: Router
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

    const val = event.target.value.toLowerCase();

    

   
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this.LoadData();
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






  public isAuthorize:boolean;
  
  ngOnInit(): void {
    if(this.userHasPermission("Pages.Bandwidth"))
    {
      this.isAuthorize=true;
      
      this.LoadData();    
    }
    else 
    {
      this.isAuthorize=false;
      this.router.navigateByUrl("pages/miscellaneous/not-authorized");
    }
    
  }
 
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  delete(id)
  {
    this._bandwidthListService.delete(id).pipe()
    .subscribe(
        data => {
            
            this.LoadData();
            this._toastrService.info("Setting Deleted Successfully", 'Setting Deleted', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          },
      error => {
        
        this._toastrService.error(error.message, 'Band width Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }
  View(id)
  {
    
    this._bandwidthListService.View(id).pipe()
    .subscribe(
        data => {
             
             this.settingObj=data.result;
             this.toggleSidebar('new-setting-sidebar');
          },
      error => {
        
        this._toastrService.error(error.message, 'View Setting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }
  LoadData()
  {
    this._bandwidthListService.getBandwidthSettings().pipe()
    .subscribe(
        data => {
            
            this.rows = data;
          },
      error => {
        
        this._toastrService.error(error.message, 'setting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }
  public SettingLabel:string;
  
  modalOpenPrimary(modalPrimary,rolobj) {
    
    this.SettingLabel="Edit Setting";
  
    this.settingObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  
  }
  modalAddRole(modalPrimary) {
    this.SettingLabel="Add New Setting";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }

  userHasPermission(permission: string): boolean {
    
    var permissions=this._authservice.currentUserValue.permissions;
    return this._authservice.currentUserValue.permissions.includes(permission);
  }
  
}

