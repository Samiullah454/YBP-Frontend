import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserService } from 'app/auth/service';
import { RoleDto, UserServiceProxy } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserDto } from '@shared/service-proxies/service-proxies';
import { UserListService } from '../user-list.service';


@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();
  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }
  user = new CreateUserDto();
  roles: RoleDto[] = [];
  public selectMultiSelected;

  constructor(
    private _coreSidebarService: CoreSidebarService, 
    public _userService: UserService,
    public _userProxyService: UserListService,
    private _toastrService: ToastrService,
    private modalService: NgbModal) {}

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  submit(form) {
    if (form.valid) {       
      const roles:string[]=[];
      roles.push(this.selectMultiSelected.normalizedName);
      // this.user.roleNames=this.selectMultiSelected.normalizedName;
      this.user.roleNames=roles;
      this._userProxyService.create(this.user).subscribe(
        data => {
          var msg="";
          if(this.user.id>0)
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
  
  close() {
    this.modalService.dismissAll();    
  }

  ngOnInit(): void {    
    this.user.isActive=true;
    this._userService.getRoles().subscribe((result) => {
      this.roles = result.result.items;
    });
    
    if(this.inputObj!=null)
    {
      this.user.id=this.inputObj.id;
      this.user.name=this.inputObj.name;
      this.user.userName=this.inputObj.userName;
      this.user.surname=this.inputObj.surname;
      this.user.emailAddress=this.inputObj.emailAddress;
      this.user.isActive=this.inputObj.isActive;
    } 
  }
  
}
