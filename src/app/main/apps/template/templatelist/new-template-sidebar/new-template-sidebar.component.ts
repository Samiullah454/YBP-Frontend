import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserService } from 'app/auth/service';
import { CreateUserDto, RoleDto, UserServiceProxy } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { CreateTemplateDto, TemplateService } from '../../template.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-template-sidebar',
  templateUrl: './new-template-sidebar.component.html'
})
export class NewTemplateSidebarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();
  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }
  template = new CreateTemplateDto();
  public selectMultiSelected;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    public _templateService: TemplateService,
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
        
      this._templateService.create(this.template).subscribe(
        data => {
          var msg="";
          if(this.template.Id>0)
          {
             msg="Template Updated"
          }
          else 
          {
            msg="Template Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.sendData();          
        },
        error => {
          this._toastrService.error(error.message, 'Template Error', {
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
    
    if(this.inputObj!=null)
    {
      this.template.name=this.inputObj.name;
      this.template.description=this.inputObj.description;
      this.template.Id=this.inputObj.id;
    } 
  }  
}
