import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftService } from 'app/main/apps/shift/shift.service';
import { ToastrService } from 'ngx-toastr';
import { PartService } from '../part.service';
@Component({
  selector: 'app-part-add',
  templateUrl: './part-add.component.html',
  styleUrls: ['./part-add.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class PartAddComponent implements OnInit {


  @Input() partToEdit
    : any; // Input to receive existing Shift data for edit mode
  newpart
    : any = {};
  Types: any[] = [
  ]; 
  SecAdvType:any[]=[
    { id: 0, name: "Full Price" },
    { id: 1, name: "Percentage" },
  ]
  WaType:any[]=[
    { id: 0, name: "Days" },
    { id: 1, name: "Months" },
  ]
  TaType:any[]=[
    { id: 0, name: "Days" },
    { id: 1, name: "Months" },
  ]
  MarkUpType:any[]=[
    { id: 0, name: "Percentage" },
    { id: 1, name: "Amount in $" },
  ]
  constructor(private _partService:PartService, public activeModal: NgbActiveModal, private _toastrService: ToastrService,) { }

  ngOnInit() {
    this.fetchPartTypes();
    if (this.partToEdit ) {
      this.newpart = { ...this.partToEdit
      };
      console.log(this.newpart)
      // Convert ShiftDays from numbers to day booleans, if necessary
    }
  }


  savepart() {
    debugger

    console.log()
    if (this.partToEdit
    ) {
      // If in edit mode, update the existing Shift
      this._partService.updatePart(this.newpart
      ).subscribe(
        (response: any) => {
          this._toastrService.success("Shift Updated Succesfully!", "Shift Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });

          this.activeModal.close('Shift updated');
        },
        (error: any) => {
          this._toastrService.error("Error updating Shift", error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating Shift:', error);
        }
      );
    } else {

      // If not in edit mode, add a new Shift
      this._partService.addPart(this.newpart
      ).subscribe(
        (response: any) => {
          console.log(this.newpart
          )
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
  }
  fetchPartTypes(): void {
    debugger
    this._partService.getAllPartsTypes().subscribe(
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
