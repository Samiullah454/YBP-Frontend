import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';

@Component({
  selector: 'app-notificationlist',
  templateUrl: './notificationlist.component.html',
  styleUrls: ['./notificationlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationlistComponent implements OnInit {

  public UserLabel:string;  
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
    private _toastrService: ToastrService,
    private _notificationsService: NotificationsService,
    private modalService: NgbModal){
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) 
  {
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

  filterByRole(event)
  {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  filterByPlan(event) 
  {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  filterByStatus(event) 
  {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.rows = this.temp;
  }

  filterRows(roleFilter, planFilter, statusFilter): any[] 
  {
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

  ngOnInit(): void {
    this._notificationsService.onApiDataChange.subscribe(res => {
      
      this.rows = res;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  update(id)
  {
    this._notificationsService.update(id).pipe()
    .subscribe(
        data => {            
          this._notificationsService.onApiDataChange.subscribe(res => {
            this.rows = res;
          });
          },
      error => {        
        this._toastrService.error(error.message, 'User Deleting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

}
