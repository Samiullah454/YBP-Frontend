import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ShiftService } from '../../../shift/shift.service';
import { TechnicianDetailsComponent } from '../../../shift/technician-details/technician-details.component';
import { TechnicianService } from '../../../technician/technician.service';
import { TypesAddComponent } from '../types-add/types-add.component';
import { CatelogServicesService } from '../../Catelog-services.service';
import { PartService } from '../../../parts/part.service';
import { ServiceContractService } from 'app/main/apps/service-contract/service-contract.service';
import { JobService } from 'app/main/apps/job/job.service';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TypesListComponent implements OnInit {

  CallerComponent: string;
  public selectedOption = 10;
  public searchValue = '';
  public rows: any[]=[];
  public ColumnMode = ColumnMode;
  sectionBlockUI: any;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal,
    private _catelogService:CatelogServicesService,
    private _toastrService: ToastrService,
    private _partService:PartService,
    private _jobService:JobService,
    private _serviceContractService:ServiceContractService,
    private route: ActivatedRoute
  ) { }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
    debugger
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        this.CallerComponent = segments[0].path;
        console.log('CallerComponent:', this.CallerComponent);
        // Use this string as needed
      }});
        this.Gettypes();
      
  

  }
  openAddtypeModal(callerParameter?: string,type?: any,) {
    const modalRef = this.modalService.open(TypesAddComponent);
    modalRef.componentInstance.callerParameter = callerParameter;
    modalRef.componentInstance.typeToEdit = type;
    modalRef.result.then((result) => {
      debugger;
      console.log('Modal closed with result:', result);
      this.Gettypes();
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  
  }
  
  edit(row: any) {
    const callerParameter = this.CallerComponent; // Replace this with the string you want to pass
    this.openAddtypeModal(callerParameter,row);
  }
  

  Gettypes()
{
  debugger
  if(this.CallerComponent ==="diagnosticServiceType"){
    this._catelogService
    .getAllDiagnosticServicesTypes()
    .pipe(first())
    .subscribe(
      data => {
      
         this.rows=data.result.items
         console.log(this.rows)
        // this.tempData=this.rows;
      },
      error => {
        
        this._toastrService.error(error.error.message, 'Loading Error', {
          positionClass: 'toast-top-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
    );
    }
    else if (this.CallerComponent ==="repairServiceType"){
      this._catelogService
      .getAllRepairServicesTypes()
      .pipe(first())
      .subscribe(
        data => {
        
           this.rows=data.result.items
           console.log(this.rows)
          // this.tempData=this.rows;
        },
        error => {
          
          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );
    }
    else if (this.CallerComponent ==="warrantyClaimServiceType"){
      this._catelogService
      .getAllWarrantyClaimTypeServicesTypes()
      .pipe(first())
      .subscribe(
        data => {
        
           this.rows=data.result.items
           console.log(this.rows)
          // this.tempData=this.rows;
        },
        error => {
          
          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );
    }
    else if (this.CallerComponent ==="parttype"){
      this._partService
      .getAllPartsTypes()
      .pipe(first())
      .subscribe(
        data => {
        
           this.rows=data.result.items
           console.log(this.rows)
          // this.tempData=this.rows;
        },
        error => {
          
          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );
    }
    else if (this.CallerComponent ==="serviceContractType"){
      this._serviceContractService
      .getAllServiceContractsTypes()
      .pipe(first())
      .subscribe(
        data => {
        
           this.rows=data.result.items
           console.log(this.rows)
          // this.tempData=this.rows;
        },
        error => {
          
          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );
    }
    else if (this.CallerComponent ==="checklist"){
      this._jobService
      .getAllChecklist()
      .pipe(first())
      .subscribe(
        data => {
        
           this.rows=data.result.items
           console.log(this.rows)
          // this.tempData=this.rows;
        },
        error => {
          
          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );
    }
    else if (this.CallerComponent ==="jobtype"){
      this._jobService
      .getAllJobTypes()
      .pipe(first())
      .subscribe(
        data => {
        
           this.rows=data.result.items
           console.log(this.rows)
          // this.tempData=this.rows;
        },
        error => {
          
          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );
    }
}


  ConfirmTextOpen(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      if (result.value) {
       this.delete(id)
      }
    });
  }
  delete(id: any) {
if(this.CallerComponent ==="diagnosticServiceType"){
      this._catelogService.DeleteDiagnosticServicetype(id).subscribe(
      (response: any) => {
        // Handle success response
        // Optionally, refresh the industry list after deletion
        this.Gettypes();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting Diagnostic Service Type:', error);
      }
    
      );
}
else if (this.CallerComponent ==="repairServiceType"){
    this._catelogService.DeleteRepairServicetype(id).subscribe(
      (response: any) => {
        // Handle success response
        // Optionally, refresh the industry list after deletion
        this.Gettypes();

      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting Repair Service Type:', error);
      }
    );}
else if (this.CallerComponent ==="repairServiceType"){
      this._catelogService.DeleteRepairServicetype(id).subscribe(
        (response: any) => {
          // Handle success response
          // Optionally, refresh the industry list after deletion
          this.Gettypes();
  
        },
        (error: any) => {
          // Handle error response
          console.error('Error deleting Repair Service Type:', error);
        }
      );}
else if (this.CallerComponent ==="serviceContractType"){
      this._serviceContractService.DeleteServiceContracttype(id).subscribe(
        (response: any) => {
          // Handle success response
          // Optionally, refresh the industry list after deletion
          this.Gettypes();
  
        },
        (error: any) => {
          // Handle error response
          console.error('Error deleting Service Contract  Type:', error);
        }
      );}
else if (this.CallerComponent ==="checklist"){
        this._jobService.DeleteCheckList(id).subscribe(
          (response: any) => {
            // Handle success response
            // Optionally, refresh the industry list after deletion
            this.Gettypes();
    
          },
          (error: any) => {
            // Handle error response
            console.error('Error deleting Service Contract  Type:', error);
          }
      );}
else if (this.CallerComponent ==="jobtype"){
          this._jobService.DeleteJobtype(id).subscribe(
            (response: any) => {
              // Handle success response
              // Optionally, refresh the industry list after deletion
              this.Gettypes();
      
            },
            (error: any) => {
              // Handle error response
              console.error('Error deleting Service Contract  Type:', error);
            }
      );}      
else{
    this._partService.DeleteParttype(id).subscribe(
      (response: any) => {
        // Handle success response
        // Optionally, refresh the industry list after deletion
        this.Gettypes();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting Part Type:', error);
      }
    );}
  }
}
