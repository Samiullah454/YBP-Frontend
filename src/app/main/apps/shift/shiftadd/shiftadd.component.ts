import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ShiftService } from '../shift.service';

@Component({
  selector: 'app-shiftadd',
  templateUrl: './shiftadd.component.html',
  styleUrls: ['./shiftadd.component.scss']
})
export class ShiftaddComponent implements OnInit {
  @Input() shiftToEdit: any; // Input to receive existing Shift data for edit mode
  newShift: any = {}; // Object to hold new Shift data
  private dayOfWeekMap: { [key: string]: number } = {

    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6, 
    sunday: 7,

  };
  constructor(private _shiftService: ShiftService, public activeModal: NgbActiveModal,    private _toastrService: ToastrService,) {}

  ngOnInit() {
    if (this.shiftToEdit) {
      this.newShift = { ...this.shiftToEdit };
  
      // Convert ShiftDays from numbers to day booleans, if necessary
      if (Array.isArray(this.newShift.shiftDays)) {
        const daysBooleanMap = {
          sunday: false, monday: false, tuesday: false, wednesday: false, 
          thursday: false, friday: false, saturday: false
        };
        this.newShift.shiftDays.forEach(dayNumber => {
          const dayName = Object.keys(this.dayOfWeekMap).find(key => this.dayOfWeekMap[key] === dayNumber);
          if (dayName) daysBooleanMap[dayName] = true;
        });
        this.newShift.shiftDays = daysBooleanMap;
      }
  
      console.log('Editing shift:', this.newShift);
    } else {
      // Initialize for a new entry
      this.newShift = {
        shiftDays: {
          sunday: false, monday: false, tuesday: false, wednesday: false, 
          thursday: false, friday: false, saturday: false
        }
        // ... other default values
      };
    }
  }
  
  private convertShiftDaysToNumbers(): number[] {
    const selectedNumbers: number[] = [];
    for (const day in this.newShift.shiftDays) {
      if (this.newShift.shiftDays[day]) {
        selectedNumbers.push(this.dayOfWeekMap[day]);
      }
    }
    return selectedNumbers;
  }
  saveShift() {
    debugger
    const selectedDaysNumbers = this.convertShiftDaysToNumbers();

    // Prepare the data for the API
    const shiftDataForApi = {
      ...this.newShift,
      shiftDays: selectedDaysNumbers
    };
    console.log(shiftDataForApi)
    if (this.shiftToEdit) {
      // If in edit mode, update the existing Shift
      this._shiftService.updateShift(shiftDataForApi).subscribe(
        (response: any) => {
          this._toastrService.success("Shift Updated Succesfully!", "Shift Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Shift updated');
        },
        (error: any) => {
          this._toastrService.error("Error updating Shift",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating Shift:', error);
        }
      );
    } else {

      // If not in edit mode, add a new Shift
      this._shiftService.addShift(shiftDataForApi).subscribe(
        (response: any) => {
           console.log(this.newShift)
          this._toastrService.success("Shift Saved Succesfully!", "Shift Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Shift Saved');

        },
        (error: any) => {
          this._toastrService.error("Error Saving Shift",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving Shift:', error);

        }
      );
    }
  }

  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }
}
