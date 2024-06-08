import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleServiceProxy, CreateRoleDto, PermissionDto } from '@shared/service-proxies/service-proxies';
import { RoleService } from '../../role.service';


@Component({
  selector: 'app-new-role-sidebar',
  templateUrl: './new-role-sidebar.component.html'
})
export class NewRoleSidebarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();
  selectedPermissionnames:string[] = [];
  
  sendData() 
  {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }



  role = new CreateRoleDto();
  permissions: PermissionDto[] = [];
  public selectMultiSelected;

  constructor( 
    public _roleProxyService: RoleServiceProxy,
    public _roleService: RoleService,
    private _toastrService: ToastrService,
    private modalService: NgbModal) {}

  submit(form) {
    
    if (form.valid) {   
        
     
      this.role.grantedPermissions=this.selectedPermissionnames;
      this.role.displayName=this.role.name;
      this._roleService.create(this.role).subscribe(
        data => {
          var msg="";
          if(this.role.id>0)
          {
             msg="User Updated"
          }
          else 
          {
            msg="User Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.sendData();          
        },
        error => {
          this._toastrService.error(error.message, 'User Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );      
    }
  }

  close() 
  {
    this.modalService.dismissAll();    
  }
  
 groupedPermissions: { [key: string]: string[] } = {};
  ngOnInit(): void 
  {  
    
    this._roleService.getAllPermissions().subscribe((result) => {
      this.permissions = result.result.items;
      this.permissions.forEach(permission => {
        // Extract the module name by splitting the permission string
    const parts = permission.name.split('.');
   if (parts.length > 1) {
    const moduleName = parts[1]; // Assuming the module name is the second part
   if (!this.groupedPermissions[moduleName]) {
    this.groupedPermissions[moduleName] = [];
   }
   this.groupedPermissions[moduleName].push(permission.name);
}
});      
    });
    
    if(this.inputObj!=null)
    {
      this.role.name=this.inputObj.name;
      this.role.displayName=this.inputObj.name;
      this.role.id=this.inputObj.id;
      this._roleProxyService.getRoleForEdit(this.role.id).subscribe((out) => {
        this.selectedPermissionnames =out.grantedPermissionNames;      
      });
    } 

    
    debugger
   
  }
  groupedPermissionKeys() {
    return Object.keys(this.groupedPermissions);
  }
  onCheckboxChange(permission)
  {
      const indexToRemove = this.selectedPermissionnames.findIndex(obj => obj == permission);
      if (indexToRemove !== -1) {
        this.selectedPermissionnames.splice(indexToRemove, 1);
      }
      else 
      {
        this.selectedPermissionnames.push(permission);
      }
   

  }

  isChecked(permission: string): boolean {
    
    if(this.selectedPermissionnames)
    {
      return this.selectedPermissionnames.includes(permission);
    }
    else 
    {
      return false;
    }
    
  }

}
