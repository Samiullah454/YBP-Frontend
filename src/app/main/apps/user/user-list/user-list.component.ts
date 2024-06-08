import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';

import { UserListService } from 'app/main/apps/user/user-list/user-list.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {

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
  public isAdmin = false;
  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public searchValue = '';
  public isAuthorize:boolean;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userListService: UserListService,
    private _toastrService: ToastrService,
    private _authservice:AuthenticationService,
    private router: Router,
    private modalService: NgbModal){
    this._unsubscribeAll = new Subject();
  }
  
  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.currentUser);
    if(this.userHasPermission("Pages.Users"))
    {
      this.isAuthorize=true;
      this.GetData();    
      if (currentUser.tenantId === "0" || currentUser.tenantId === null || currentUser.tenantId === "") 
      {
         this.isAdmin = true;
      }
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

  receiveData(data: string) 
  {
    this.GetData();
    this.modalService.dismissAll();
  }

  GetData()
  {
    this._userListService.getAllusers().pipe()
    .subscribe(
        data => {            
            this.rows = data;
          },
      error => {        
        this._toastrService.error(error.message, 'Login Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });        
      });
  }

  delete(row)
  {
    this._userListService.delete(row.id).pipe()
    .subscribe(
        data => {            
            this.GetData();
            this._toastrService.info("User Deleted Successfully", 'User Deleting', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
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

  modalOpenPrimary(modalPrimary,rolobj) 
  {
    this.UserLabel="Edit User";
    this.settingObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });  
  }

  modalAddUser(modalPrimary) 
  {
    
    this.UserLabel="Invite Team Member";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }  
}
