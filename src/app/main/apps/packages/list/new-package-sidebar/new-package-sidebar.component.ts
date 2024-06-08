import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserService } from 'app/auth/service';
import { CreateUserDto, RoleDto, UserServiceProxy } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { CreatePackagetDto, PackagesService } from '../../packages.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndustryService } from 'app/main/apps/industry/industry.service';

@Component({
  selector: 'app-new-package-sidebar',
  templateUrl: './new-package-sidebar.component.html'
})
export class NewPackageSidebarComponent implements OnInit {

  package = new CreatePackagetDto();
  
  public submitted = false;
  rows: any;

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();


  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }
  

  constructor(
    private _coreSidebarService: CoreSidebarService, 
    public _packageService: PackagesService,
    private _toastrService: ToastrService,
    private modalService: NgbModal,
    private _industryService : IndustryService) {}


  submit(form) {
    if (form.valid) {   
        console.log(this.package)
        if(this.package.id>0)
        {
          this._packageService.update(this.package).subscribe(
            (response: any) => {
              this._toastrService.success("Package Updated Succesfully!", "Package Updated", {
                positionClass: 'toast-top-left',
                toastClass: 'toast ngx-toastr',
                closeButton: true
              });
              this.sendData();          
            },
            error => {
              this._toastrService.error(error.message, 'Package Error', {
                positionClass: 'toast-top-left',
                toastClass: 'toast ngx-toastr',
                closeButton: true
              });
            }
          );
        }
        else{
          this._packageService.create(this.package).subscribe(
            data => {
              this._toastrService.success("Package Saved Succesfully!", "Package Saved", {
                positionClass: 'toast-top-left',
                toastClass: 'toast ngx-toastr',
                closeButton: true
              });
              this.sendData();          
            },
            error => {
              this._toastrService.error(error.message, 'Package Error', {
                positionClass: 'toast-top-left',
                toastClass: 'toast ngx-toastr',
                closeButton: true
              });
            }
          );     
        }
 
    }        
  }

  close() {
    this.modalService.dismissAll();    
  }

  ngOnInit(): void 
  {
     this.fetchIndustries();  
    
    if(this.inputObj!=null)
    {
      this.package.isActive=this.inputObj.isActive;
      this.package.packageName=this.inputObj.packageName;
      this.package.fee=this.inputObj.fee;
      this.package.industryId=this.inputObj.industryId
      this.package.otsetupFee=this.inputObj.otsetupFee;
      this.package.includedSystemUsers=this.inputObj.includedSystemUsers;
      this.package.includedTechnicians=this.inputObj.includedTechnicians;
      this.package.pricePerTech=this.inputObj.pricePerTech;
      this.package.pricePerSysUser=this.inputObj.pricePerSysUser;

      this.package.id=this.inputObj.id;
    } 
  }

  


  fetchIndustries(): void {
    this._industryService.getIndustries().subscribe(
      (data: any) => {
        this.rows = data.result.items;
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  } 
}
