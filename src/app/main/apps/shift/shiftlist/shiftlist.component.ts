import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ShiftService } from '../shift.service';
import { ShiftaddComponent } from '../shiftadd/shiftadd.component';
import { TechnicianDetailsComponent } from '../technician-details/technician-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shiftlist',
  templateUrl: './shiftlist.component.html',
  styleUrls: ['./shiftlist.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ShiftlistComponent implements OnInit {
  public selectedOption = 10;
  public searchValue = '';
  public rows: any[]=[];
  public ColumnMode = ColumnMode;

  constructor(private _shiftService:ShiftService,private modalService: NgbModal) { }
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
    this.fetchShifts();
  }
  shiftTypes = [
    'AfterHours',
    'Emergency',
    'HolidayShift',
    'Normal'
  ];
  showTechnicianDetails(row: any, caller: string): void {
    const modalRef = this.modalService.open(TechnicianDetailsComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.rowData = row;
    modalRef.componentInstance.caller = caller;

    modalRef.result.then((result) => {
      this.fetchShifts();
    }, (reason) => {
      // Handle the dismissal reason if needed
    });
  }
  
  // Method to get the shift name based on the number
  getShiftName(number: number): string {
    return this.shiftTypes[number] || 'Unknown'; // Default to 'Unknown' if the number doesn't match any shift type
  }
  edit(row: any) {

    this.openAddShfitModal(row);
  }
  openAddShfitModal(Shift?: any) {
    const modalRef = this.modalService.open(ShiftaddComponent);
    modalRef.componentInstance.shiftToEdit = Shift; 

    modalRef.result.then((result) => {
      this.fetchShifts();
    }, (reason) => {
    });
  }
  fetchShifts(): void {
    this._shiftService.getAllShifts().subscribe(
      (data: any) => {
        this.rows = data.result.items.map(shift => {
          // Count the number of technicians in the shift
          const technicianCount = shift.technicians ? shift.technicians.length : 0;
          
          // Update the technicianCount property of the shift
          return { ...shift, technicianCount };
        });
  
        console.log(this.rows)
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
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
         this.deleteshift(id);
      }
    });
  }
  deleteshift(id: any) {
    // Implement your logic to delete the industry
    // For example, call the delete method from your service passing the industry ID
    this._shiftService.DeleteShiftt(id).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Industry deleted:', response);
        // Optionally, refresh the industry list after deletion
        this.fetchShifts();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting industry:', error);
      }
    );
  }

}
