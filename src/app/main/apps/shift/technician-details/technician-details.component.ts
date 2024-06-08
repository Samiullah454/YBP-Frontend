import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TechnicianService } from '../../technician/technician.service';
import { ToastrService } from 'ngx-toastr';
import { ShiftService } from '../shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-technician-details',
  templateUrl: './technician-details.component.html',
  styleUrls: ['./technician-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TechnicianDetailsComponent implements OnInit {

  @Input() rowData: any;
  @Input() caller: string;
  // Use @Input if you want to make it more versatile
  public rows: any[]=[];
  callerType: string; // This is your existing callerType variable
  columnName: string; // This will hold the name of the column
  selectedTechnicians: number[] = []; // Store selected technician IDs
  availableTechnicians :any;
  filteredTechnicians:any;
  constructor(public activeModal: NgbActiveModal,  private _technicianService:TechnicianService,
    private _toastrService: ToastrService,private _shiftService:ShiftService ){

  }
  ngOnInit(): void {
    this.GetTechnicians();
    this.updateColumnName();
console.log(this.rowData)  }
  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }



  updateColumnName() {
    switch (this.caller) {
      case 'shift':
        this.columnName = 'Assign Shift';
        break;
      case 'crewgroup':
        this.columnName = 'Assign Crew Group';
        break;
      case 'types':
        this.columnName = 'Assign Technician Type';
        break;
      case 'servicearea':
        this.columnName = 'Assign Service Area';
        break;
      default:
        this.columnName = 'Assign';
        break;
    }
  }
  assignTechnicians() {
   console.log( this.rowData.id)
    // Handle selected technicians here (this.selectedTechnicians)
    console.log('Selected Technicians:', this.selectedTechnicians);
    let assignment = {
      Id: this.rowData.id,
      Caller:this.caller,
      TechniciansId: this.selectedTechnicians
  };

  console.log('Assignment:', assignment);
  this._technicianService.assignTechniciansToShift(assignment).subscribe    ( (response: any) => {
    this._toastrService.success("Technician Assigned Succesfully!", "Technician Assigned", {
      positionClass: 'toast-top-left',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
    
   this.activeModal.close('Technician Assigned');
  },
  (error: any) => {
    this._toastrService.success("Error Technician Assigned",error, {
      positionClass: 'toast-top-left',
      toastClass: 'toast ngx-toastr',
      closeButton: true
    });
    console.error('Error Technician Assigned', error);
  })   
  }
  GetTechnicians()
{


  this._technicianService.getAllTechnicians()
  .subscribe(
    data => {
      if(this.caller=='shift'){
        
       this.filteredTechnicians = data.result.items
       this.selectedTechnicians = data.result.items.filter(tech => tech.shiftId == this.rowData.id)
       .map(tech => tech.id);
    
    }
    else if (this.caller=='crewgroup') {
       this.filteredTechnicians = data.result.items
      this.selectedTechnicians = data.result.items.filter(tech => tech.crewGroupId == this.rowData.id)
      .map(tech => tech.id);
     
    }
    else if (this.caller=='servicearea') {
      this.filteredTechnicians = data.result.items
     this.selectedTechnicians = data.result.items.filter(tech => tech.serviceAreasId == this.rowData.id)
     .map(tech => tech.id);
    
   }  
     else if (this.caller=='types') {
    this.filteredTechnicians = data.result.items
   this.selectedTechnicians = data.result.items.filter(tech => tech.technicianTypeId == this.rowData.id)
   .map(tech => tech.id);
  
 }
    },
    error => {
      // Error handling remains the same
      this._toastrService.error(error.error.message, 'Loading Error', {
        positionClass: 'toast-top-right',
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
    }
  );

}
ConfirmTextOpen() {
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
    }
  });
}
// isTechnicianSelected(technicianId: number): boolean {
//   console.log('filteredTechnicians:', this.filteredTechnicians);
//   return this.filteredTechnicians?.shifts?.some(shift => shift.id === technicianId) ?? false;
// }
isTechnicianSelected(technicianId: number): boolean {
  return this.selectedTechnicians.includes(technicianId);
}

onTechnicianCheckboxChange(technicianId: number, isChecked: boolean): void {
  if (isChecked) {
      if (!this.selectedTechnicians.includes(technicianId)) {
          this.selectedTechnicians.push(technicianId);
         
      }
  } else {
      const index = this.selectedTechnicians.indexOf(technicianId);
      if (index !== -1) {
          this.selectedTechnicians.splice(index, 1);
          console.log(this.selectedTechnicians)
      }
  }
}

}

