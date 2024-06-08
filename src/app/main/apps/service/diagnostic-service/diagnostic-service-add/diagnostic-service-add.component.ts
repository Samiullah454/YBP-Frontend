import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CatelogServicesService } from '../../Catelog-services.service';
@Component({
  selector: 'app-diagnostic-service-add',
  templateUrl: './diagnostic-service-add.component.html',
  styleUrls: ['./diagnostic-service-add.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DiagnosticServiceAddComponent implements OnInit {

  @Input() serviceToEdit: any; // Input to receive existing DiagnosticService data for edit mode
  newservice: any = {};
  Types: any[] = [
    
  ]; // Object to hold new DiagnosticService data

  constructor(private _CatelogService: CatelogServicesService, public activeModal: NgbActiveModal,    private _toastrService: ToastrService,) {}

  ngOnInit() {
    this.fetchDiagnosticServicesTypes();
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
      this._CatelogService.updateDiagnosticService(this.newservice).subscribe(
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
      this._CatelogService.addDiagnosticService(this.newservice).subscribe(
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
  fetchDiagnosticServicesTypes(): void {
    debugger
    this._CatelogService.getAllDiagnosticServicesTypes().subscribe(
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
