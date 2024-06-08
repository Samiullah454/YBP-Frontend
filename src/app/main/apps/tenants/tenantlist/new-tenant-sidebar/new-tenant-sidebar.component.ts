import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ToastrService } from 'ngx-toastr';
import { TenantDto, TenantsService } from '../../tenants.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/auth/service';
import { HttpClient } from '@microsoft/signalr';
import { environment } from 'environments/environment';
import { first, map } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreConfigService } from '@core/services/config.service';




import { Router } from '@angular/router';
@Component({
  selector: 'app-new-tenant-sidebar',
  templateUrl: './new-tenant-sidebar.component.html'
})
export class NewTenantSideBarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();
  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }
  tenantobj = new TenantDto();
  packageitemsList:[];
  public selectedPackageId:number;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    public _tenantService: TenantsService,
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
        this.tenantobj.package=this.selectedPackageId.toString();
      this._tenantService.create(this.tenantobj).subscribe(
        data => {
          var msg="";
          if(this.tenantobj.id>0)
          {
             msg="Tenant Updated"
          }
          else 
          {
            msg="Tenant Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.sendData();          
        },
        error => {
          this._toastrService.error(error.message, 'Tenant Error', {
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
      this.tenantobj.id=this.inputObj.id;
      this.tenantobj.tenancyName=this.inputObj.tenancyName;
      this.tenantobj.name=this.inputObj.name;
      this.tenantobj.username=this.inputObj.username;
      this.tenantobj.company=this.inputObj.company;
      this.tenantobj.purpose=this.inputObj.purpose;
      this.tenantobj.package=this.inputObj.package;
      this.tenantobj.isActive=this.inputObj.isActive;
      this.tenantobj.payment_methode=this.inputObj.payment_methode;
      this.tenantobj.name_on_card=this.inputObj.name_on_card;
      this.tenantobj.cardnumber=this.inputObj.cardnumber;
      this.tenantobj.cvv=this.inputObj.cvv;
      this.tenantobj.mobileNumber=this.inputObj.mobileNumber;
      this.selectedPackageId=parseInt(this.tenantobj.package);

    } 
    debugger
    this.GetPackagesListFromHost();
  } 
  GetPackagesListFromHost()
  {
    this._tenantService.getPackagesListfromhost().pipe().subscribe(
        data => {
            this.packageitemsList=data
          },
      error => {
        
        this._toastrService.error(error.message, 'Get Package List Error', {
          positionClass: 'toast-top-left',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
        
      }
    );
  }
 
}
