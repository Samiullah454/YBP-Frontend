import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

import { PackagesService } from '../packages.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
import { IndustryService } from '../../industry/industry.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  receivedData: string;
  // Public
  public sidebarToggleRef = false;
  public rows: any[]=[];
  public industries :any []=[];
    public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  public settingObj:any;
  public SettingLabel:string;

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

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
 
  
  receiveData(data: string) {
    this.GetData();
    this.modalService.dismissAll();
  }

  constructor(
    private _packageListService: PackagesService,
    private _toastrService: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private _authservice:AuthenticationService,
    private _industryService : IndustryService
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedPlan = this.selectPlan[0];
    this.selectedStatus = this.selectStatus[0];
    const val = event.target.value.toLowerCase();
    this.table.offset = 0;
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
    this.fetchIndustries();
    if(this.userHasPermission("Pages.Package"))
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
  ngOnDestroy(): void 
  {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  GetData()
  {
    this._packageListService.getpackages().pipe()
    .subscribe(
        data => {            
            this.rows = data;
          },
      error => {        
        this._toastrService.error(error.message, 'Package List Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      }
    );
  }

  delete(row : any)
  {
console.log(row.id)
    this._packageListService.delete(row.id).pipe()
    .subscribe(
        data => {            
            this.GetData();
            this._toastrService.success("Package Deleted", 'Package Deleting', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          },
      error => {        
        this._toastrService.error(error.message, 'Package Deleting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }

  AddPackage()
  {
    this.router.navigateByUrl("apps/packages/add");
  }


  
  modalOpenPrimary(modalPrimary,rolobj) {
    
    this.SettingLabel="Edit Package";  
    this.settingObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });  
  }

  modalAddRole(modalPrimary) {
    this.SettingLabel="Add New Package";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }
  fetchIndustries(): void {
    this._industryService.getIndustries().subscribe(
      (data: any) => {
        this.industries = data.result.items;
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  } 
  getIndustryNameById(industryId: string): string {
    const foundIndustry = this.industries.find((industry) => industry.id === industryId);
    return foundIndustry ? foundIndustry.industryName : 'N/A';
  }
}
