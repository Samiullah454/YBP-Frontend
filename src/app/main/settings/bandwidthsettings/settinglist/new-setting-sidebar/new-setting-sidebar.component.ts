import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserService } from 'app/auth/service';
import { CreateUserDto, RoleDto, UserServiceProxy } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { CreateSettingDto, BandwidthsettingsService } from '../../bandwidthsettings.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-new-setting-sidebar',
  templateUrl: './new-setting-sidebar.component.html'
})
export class NewSettingSidebarComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<string>();
  @Input() inputObj:any;
  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }
  setting = new CreateSettingDto();
  public selectMultiSelected;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService, 
    public _settingService: BandwidthsettingsService,
    private _toastrService: ToastrService,
    private modalService: NgbModal) {}
 
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      
      
      this._settingService.create(this.setting).subscribe(
        data => {
          var msg="";
          if(this.setting.Id>0)
          {
             msg="Setting Updated"
          }
          else 
          {
            msg="Setting Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.sendData();
          
        },
        error => {
          this._toastrService.error(error.message, 'Bandwidth Setting Error', {
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
 public bwusername:string;
  ngOnInit(): void {
    
    if(this.inputObj!=null)
    {
      this.setting.BWUserName=this.inputObj.bwUserName;
      this.setting.BWAccoundId=this.inputObj.bwAccoundId;
      this.setting.BWApplicationId=this.inputObj.bwApplicationId;
      this.setting.BWPassword=this.inputObj.bwPassword;
      this.setting.Id=this.inputObj.id;
    }
    
    
  }
  
}
