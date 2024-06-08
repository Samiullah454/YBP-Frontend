import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PartService } from 'app/main/apps/parts/part.service';
import { ToastrService } from 'ngx-toastr';
import { CatelogServicesService } from '../../Catelog-services.service';
import { ServiceContractService } from 'app/main/apps/service-contract/service-contract.service';
import { JobService } from 'app/main/apps/job/job.service';

@Component({
  selector: 'app-types-add',
  templateUrl: './types-add.component.html',
  styleUrls: ['./types-add.component.scss']
})
export class TypesAddComponent implements OnInit {

  @Input() callerParameter: string | undefined; // Add callerParameter input

  @Input() typeToEdit: any;

  newtype: any = {};
  CallerComponent: string;

  constructor(
    public activeModal: NgbActiveModal,
    private _catelogService: CatelogServicesService,
    private _serviceContract: ServiceContractService,
    private _PartService: PartService,
    private _jobService:JobService,
    private _toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.typeToEdit) {
      this.newtype = { ...this.typeToEdit };
    }
    console.log("Caller", this.callerParameter);

  }
  savetype() {
    debugger
    console.log(this.typeToEdit)

    if (this.typeToEdit) {
      console.log("Update", this.typeToEdit)
      // If in edit mode, update the existing Diagnostic Service Type
      if (this.callerParameter === "diagnosticServiceType") {
        this._catelogService.updateDiagnosticServiceType(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("Diagnostic Service Type Updated Succesfully!", "Diagnostic Service Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Diagnostic Service Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Diagnostic Service Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Diagnostic Service Type:', error);
          }
        );
      }
      else if (this.callerParameter === "repairServiceType") {
        this._catelogService.updateRepairServiceType(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("Repair Service Type Updated Succesfully!", "Repair Service Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Repair Service Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Repair Service Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Repair Service Type:', error);
          }
        );

      }
      else if (this.callerParameter === "warrantyClaimServiceType") {
        this._catelogService.updateWarrantyClaimTypeServiceType(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("Repair Service Type Updated Succesfully!", "Repair Service Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Repair Service Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Repair Service Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Repair Service Type:', error);
          }
        );

      }
      else if (this.callerParameter === "serviceContractType") {
        this._serviceContract.updateServiceContractType(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("Service Contract Type Updated Succesfully!", "Service Contract Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Service Contract Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Service Contract Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Service Contract Type:', error);
          }
        );

      }
      else if (this.callerParameter === "checklist") {
        this._jobService.updateCheckList(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("CheckList Updated Succesfully!", "CheckList Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('CheckList updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating CheckList", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating CheckList:', error);
          }
        );

      }
      else if (this.callerParameter === "jobtype") {
        this._jobService.updateJobType(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("Job Type Updated Succesfully!", "Job Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Job Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Job Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Job Type:', error);
          }
        );

      }
      else {
        this._PartService.updatePartType(this.newtype).subscribe(
          (response: any) => {
            this._toastrService.success("Part Type Updated Succesfully!", "Part Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Part Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Part Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Part Type:', error);
          }
        );
      }
    }

    else {
      if (this.callerParameter === "diagnosticServiceType") {
        // If not in edit mode, add a new Diagnostic Service Type
        this._catelogService.addDiagnosticServiceType(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Diagnostic Service Type Saved Succesfully!", "Diagnostic Service Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Diagnostic Service Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Diagnostic Service Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Diagnostic Service Type:', error);

          }
        );
      }
      else if (this.callerParameter === "repairServiceType") {
        this._catelogService.addRepairServiceType(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Repair Service Type Saved Succesfully!", "Repair Service Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Repair Service Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Repair Service Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Repair Service Type:', error);

          }
        );
      }
      else if (this.callerParameter === "warrantyClaimServiceType") {
        this._catelogService.addWarrantyClaimTypeServiceType(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Repair Service Type Saved Succesfully!", "Repair Service Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Repair Service Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Repair Service Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Repair Service Type:', error);

          }
        );
      }
      else if (this.callerParameter === "serviceContractType") {
        this._serviceContract.addServiceContractType(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Service Contract Type Saved Succesfully!", "Service Contract Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Service Contract Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Service Contract Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Service Contract Type:', error);

          }
        );
      }
      else if (this.callerParameter === "checklist") {
        this._jobService.addCheckList(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Service Contract Type Saved Succesfully!", "Service Contract Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Service Contract Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Service Contract Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Service Contract Type:', error);

          }
        );
      } 
      else if (this.callerParameter === "jobtype") {
        this._jobService.addJobType(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Service Contract Type Saved Succesfully!", "Service Contract Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Service Contract Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Service Contract Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Service Contract Type:', error);

          }
        );
      }
      else {
        this._PartService.addPartType(this.newtype).subscribe(
          (response: any) => {
            console.log(this.newtype)
            this._toastrService.success("Part Type Saved Succesfully!", "Part Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Part Type Saved');

          },
          (error: any) => {
            this._toastrService.error("Error Saving Part Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Part Type:', error);

          }
        );
      }

    }
  }
  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }
}
