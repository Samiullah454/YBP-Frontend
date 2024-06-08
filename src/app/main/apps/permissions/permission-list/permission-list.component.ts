import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { PermissionsService } from '../permissions.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PermissionListComponent implements OnInit {

  receivedData: string;
  public rows;
  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  public temp = [];
  public SettingLabel:string;
  public settingObj:any;

  
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
    private _permissionsService: PermissionsService,
    private _toastrService: ToastrService,
    private _router: Router,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void 
  {  
    this.GetData();
  }
 
  ngOnDestroy(): void 
  {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  GetData()
  {
    this._permissionsService.getPermissions().pipe()
    .subscribe(
        data => {            
            this.rows = data;
          },
      error => {        
        this._toastrService.error(error.message, 'Permissions List Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }

  delete(id)
  {
    
    this._permissionsService.delete(id).pipe()
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
  
  modalOpenPrimary(modalPrimary,rolobj) 
  {
    
    this.SettingLabel="Edit Permission";
  
    this.settingObj=rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }

  modalAddRole(modalPrimary) 
  {
    this.SettingLabel="Add New Permission";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: 'lg',
      windowClass: 'modal modal-primary'
    });
  }
}
