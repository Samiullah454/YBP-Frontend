import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PermissionDto } from '@shared/service-proxies/service-proxies';
import { ToastrService } from 'ngx-toastr';
import { PermissionsService } from '../../permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-permission-sidebar',
  templateUrl: './new-permission-sidebar.component.html'
})
export class NewPermissionSidebarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();
  sendData() {
    
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }
  permission = new PermissionDto();
  public selectMultiSelected;

  constructor(
    public _permissionsService: PermissionsService,
    private _toastrService: ToastrService,
    private modalService: NgbModal) {}


  submit(form) {

    if (form.valid) {   
        
      this._permissionsService.create(this.permission).subscribe(
        data => {
          var msg="";
          if(this.permission.id>0)
          {
             msg="Permission Updated"
          }
          else 
          {
            msg="Permission Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.sendData();          
        },
        error => {
          this._toastrService.error(error.message, 'Permission Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );      
    }        
  }

  close() {
    this.modalService.dismissAll();    
  }

  ngOnInit(): void 
  {
       
    
    if(this.inputObj!=null)
    {
      this.permission.name=this.inputObj.name;
      this.permission.description=this.inputObj.description;
      this.permission.id=this.inputObj.id;
    } 
  }
  
}
