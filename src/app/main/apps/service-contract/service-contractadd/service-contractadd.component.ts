import { Component, Input, OnInit } from '@angular/core';
import { ServiceContractService } from '../service-contract.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-contractadd',
  templateUrl: './service-contractadd.component.html',
  styleUrls: ['./service-contractadd.component.scss']
})
export class ServiceContractaddComponent implements OnInit {

  @Input() serviceToEdit: any; // Input to receive existing DiagnosticService data for edit mode
  newservice: any = {};
  Types: any[] = [
    
  ]; // Object to hold new DiagnosticService data
  frequencies: any[]=[
    {id:0,name:'Weekly'},
    {id:1,name:'BiWeekly'},
    {id:2,name:'Monthly'},
    {id:3,name:'Quarterly'},
    {id:4,name:'BiAnually'},
    {id:5,name:'Annually'}



  ]
  constructor(private _serviceContract: ServiceContractService, public activeModal: NgbActiveModal,    private _toastrService: ToastrService,) {}

  ngOnInit() {
    this.fetchServiceContractTypes();
    if (this.serviceToEdit) {
      this.newservice = { ...this.serviceToEdit };
    console.log(this.newservice)
      // Convert DiagnosticServiceDays from numbers to day booleans, if necessary
    }
  }
  
 
  saveService() {
    console.log(this.newservice)
debugger
    if (this.serviceToEdit) {
      // If in edit mode, update the existing DiagnosticService
      this._serviceContract.updateServiceContract(this.newservice).subscribe(
        (response: any) => {
          this._toastrService.success("Diagnostic Service Updated Succesfully!", "Diagnostic Service Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('DiagnosticService updated');
        },
        (error: any) => {
          this._toastrService.error("Error updating DiagnosticService",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating DiagnosticService:', error);
        }
      );
    } else {

      // If not in edit mode, add a new DiagnosticService
      this._serviceContract.addServiceContract(this.newservice).subscribe(
        (response: any) => {
           console.log(this.newservice)
          this._toastrService.success("Diagnostic Service Saved Succesfully!", "Diagnostic Service Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Diagnostic Service Saved');

        },
        (error: any) => {
          this._toastrService.error("Error Saving Diagnostic Service",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving Diagnostic Service:', error);

        }
      );
    }
  }
  fetchServiceContractTypes(): void {
    debugger
    this._serviceContract.getAllServiceContractsTypes().subscribe(
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
