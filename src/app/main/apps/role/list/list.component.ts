import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RoleService } from 'app/main/apps/role/role.service';
import { AuthenticationService } from 'app/auth/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  public rows;
  public settingObj:any;
  public SettingLabel:string;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _roleService: RoleService,
    private _toastrService: ToastrService,
    private _authservice:AuthenticationService,
    private router: Router,
    private modalService: NgbModal) {
      this._unsubscribeAll = new Subject();
     }

     public isAuthorize:boolean;
  
     ngOnInit(): void {
       if(this.userHasPermission("Pages.Roles"))
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

  GetData()
  {
    this._roleService.getRoles()
      .pipe().subscribe(
        data => {
          this.rows = data;
        },
        error => {        
          this._toastrService.error(error.message, 'Login Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });        
        }
      );
  }

  delete(row)
  {
    debugger
    this._roleService.delete(row.id).pipe()
    .subscribe(
        data => {            
            this.GetData();
            this._toastrService.success("Role Deleted Successfully", 'Role Deleting', {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
          },
      error => {        
        this._toastrService.error(error.message, 'Role Deleting Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
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

  
  
  modalOpenPrimary(modalPrimary,rolobj) {
    
    this.SettingLabel="Edit Role";
  
    this.settingObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'xl',
      windowClass: 'modal modal-primary'
    });
  
  }
  modalAddRole(modalPrimary) {
    
    this.SettingLabel="Add New Role";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'xl',
      windowClass: 'modal modal-primary'
    });
  }

}
