import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftService } from 'app/main/apps/shift/shift.service';
import { ToastrService } from 'ngx-toastr';
import { CatelogServicesService } from '../../Catelog-services.service';
@Component({
  selector: 'app-warranty-service-add',
  templateUrl: './warranty-service-add.component.html',
  styleUrls: ['./warranty-service-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WarrantyServiceAddComponent implements OnInit {

  @Input() serviceToEdit: any; // Input to receive existing DiagnosticService data for edit mode
  newservice: any = {};
  Types: any[] = []; // Object to hold new DiagnosticService data
  associatedService: any[]=[
    {id:0,name:'Diagnostic '},
    {id:1,name:'Repair '}
  ];
  selectedServiceId: any ;
  associatedServicelist: { id: number, serviceName: string} []=[]
  constructor(private _CatelogService: CatelogServicesService, public activeModal: NgbActiveModal,    private _toastrService: ToastrService,) {}

  ngOnInit() {
    this.fetchWarrantyClaimServicesTypes();
 
    if (this.serviceToEdit) {
      this.newservice = { ...this.serviceToEdit };
    console.log(this.newservice)
      // Convert WarrantyClaimServiceDays from numbers to day booleans, if necessary
    }
    debugger
    if(this.newservice.associatedService === 0){
      this.selectedServiceId =  this.newservice.diagnosticServiceId;
     }
     else if(this.newservice.associatedService === 1) {
      this.selectedServiceId = this.newservice.repairServiceId;
     }
     console.log("Selected Id",this.selectedServiceId)
     if(this.newservice.associatedService === 0){
      this.getAllDiagnosticServices();
     }
     else if(this.newservice.associatedService === 1) {
      this.getAllRepairServices();
     }
   
  }
  onchange(id:string){
    debugger
    if(id==="0"){
      this.getAllDiagnosticServices();
    }
    else{
      this.getAllRepairServices();

    }
  }
  getAllDiagnosticServices(){

    this._CatelogService.getAllDiagnosticServices().subscribe(
      (data: any) => {
        this.associatedServicelist = data.result.items
  
      },
      (error: any) => {
        console.error('Error fetching Associated Services:', error);
      } 
    );
  }
  getAllRepairServices() {

    this._CatelogService.getAllRepairServices().subscribe(
    (data: any) => {
      this.associatedServicelist = data.result.items

    },
    (error: any) => {
      console.error('Error fetching Types:', error);
    }
  );
  }

  
 
  saveService() {
    debugger
    console.log(this.newservice)
    console.log(this.selectedServiceId)
    if (this.newservice.associatedService === '0') {

      // If Diagnostic service type is selected
       this.newservice.diagnosticServiceId=this.selectedServiceId ;
  } else if (this.newservice.associatedService === '1') {
      // If Repair service type is selected
      this.newservice.repairServiceId=  this.selectedServiceId ;
  }
  console.log(this.newservice)
    if (this.serviceToEdit) {
      // If in edit mode, update the existing DiagnosticService
      this._CatelogService.updateWarrantyClaimService(this.newservice).subscribe(
        (response: any) => {
          this._toastrService.success("WarrantyClaim Service Updated Succesfully!", "WarrantyClaim Service Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('WarrantyClaim Service updated');
        },
        (error: any) => {
          this._toastrService.error("Error updating WarrantyClaimService",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating WarrantyClaimService:', error);
        }
      );
    } else {

      // If not in edit mode, add a new WarrantyClaimService
      this._CatelogService.addWarrantyClaimService(this.newservice).subscribe(
        (response: any) => {
           console.log(this.newservice)
          this._toastrService.success("WarrantyClaim Service Saved Succesfully!", "WarrantyClaim Service Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('WarrantyClaim Service Saved');

        },
        (error: any) => {
          this._toastrService.error("Error Saving WarrantyClaim Service",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving WarrantyClaim Service:', error);

        }
      );
    }
  }
  fetchWarrantyClaimServicesTypes(): void {
    debugger
    this._CatelogService.getAllWarrantyClaimTypeServicesTypes().subscribe(
      (data: any) => {
        this.Types = data.result.items
  
      },
      (error: any) => {
        console.error('Error fetching Types:', error);
      }
    );
  }
  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }

}
