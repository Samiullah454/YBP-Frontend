import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TechnicianService } from '../../technician.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crewgroupadd',
  templateUrl: './crewgroupadd.component.html',
  styleUrls: ['./crewgroupadd.component.scss']
})
export class CrewgroupaddComponent implements OnInit {
  @Input() callerParameter: string | undefined; // Add callerParameter input

  @Input() crewgroupToEdit: any;

  newcrewgroup: any = {};
  CallerComponent: string;

  constructor(
    public activeModal: NgbActiveModal,
    private _technicianService: TechnicianService,
    private _toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    if (this.crewgroupToEdit) {
      this.newcrewgroup = { ...this.crewgroupToEdit };
    }
    console.log("Caller", this.callerParameter);

  }
  saveCrewGroup() {
    debugger
    console.log(this.crewgroupToEdit)
    
    if (this.crewgroupToEdit) {
      console.log("Update", this.crewgroupToEdit)
      // If in edit mode, update the existing Shift
      if (this.callerParameter === "crewgroup") {
        this._technicianService.updateCrewGroups(this.newcrewgroup).subscribe(
          (response: any) => {
            this._toastrService.success("Crew Group Updated Succesfully!", "Crew Group Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });

            this.activeModal.close('Crew Group updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Crew Group", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Crew Group:', error);
          }
        );
      }
      else if (this.callerParameter ==="servicearea"){
        debugger
        this._technicianService.updateServiceArea(this.newcrewgroup).subscribe(
          (response: any) => {
            this._toastrService.success("Serive Area Updated Succesfully!", "Serive Area Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
    
            this.activeModal.close('Serive Area updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Serive Area", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Serive Area:', error);
          }
        );
  
        }
      else{
        this._technicianService.updateTechnicianTypes(this.newcrewgroup).subscribe(
          (response: any) => {
            this._toastrService.success("Technician Type Updated Succesfully!", "Technician Type Updated", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
    
            this.activeModal.close('Technician Type updated');
          },
          (error: any) => {
            this._toastrService.error("Error updating Technician Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error updating Technician Type:', error);
          }
        );
      }
    }
  
    else {
      if (this.callerParameter === "crewgroup") {
      // If not in edit mode, add a new Shift
      this._technicianService.addCrewGroups(this.newcrewgroup).subscribe(
        (response: any) => {
          console.log(this.newcrewgroup)
          this._toastrService.success("Shift Saved Succesfully!", "Shift Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });

          this.activeModal.close('Shift Saved');

        },
        (error: any) => {
          this._toastrService.error("Error Saving Shift", error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving Shift:', error);

        }
      );
      }
      else if (this.callerParameter ==="servicearea"){
        this._technicianService.addServiceArea(this.newcrewgroup).subscribe(
          (response: any) => {
            console.log(this.newcrewgroup)
            this._toastrService.success("Service Area Saved Succesfully!", "Service Area Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
  
            this.activeModal.close('Service Area Saved');
  
          },
          (error: any) => {
            this._toastrService.error("Error Saving Service Area", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Service Area:', error);
  
          }
        );
      }
      else {
        this._technicianService.addTechnicianTypes(this.newcrewgroup).subscribe(
          (response: any) => {
            console.log(this.newcrewgroup)
            this._toastrService.success("Technician Type Saved Succesfully!", "Technician Type Saved", {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
  
            this.activeModal.close('Technician Type Saved');
  
          },
          (error: any) => {
            this._toastrService.error("Error Saving Technician Type", error, {
              positionClass: 'toast-top-left',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });
            console.error('Error saving Technician Type:', error);
  
          }
        );
      }
 
    }
  }
  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }
}
