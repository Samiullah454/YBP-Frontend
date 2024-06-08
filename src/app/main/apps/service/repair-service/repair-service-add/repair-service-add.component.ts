import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftService } from 'app/main/apps/shift/shift.service';
import { ToastrService } from 'ngx-toastr';
import { CatelogServicesService } from '../../Catelog-services.service';

@Component({
  selector: 'app-repair-service-add',
  templateUrl: './repair-service-add.component.html',
  styleUrls: ['./repair-service-add.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RepairServiceAddComponent implements OnInit {

  @Input() serviceToEdit: any; // Input to receive existing RepairService data for edit mode
  newservice: any = {};
  Types: any[] = [
    
  ]; // Object to hold new RepairService data

  constructor(private _CatelogService: CatelogServicesService, public activeModal: NgbActiveModal,    private _toastrService: ToastrService,) {}

  ngOnInit() {
    this.fetchRepairServicesTypes();
    if (this.serviceToEdit) {
      this.newservice = { ...this.serviceToEdit };
    console.log(this.newservice)
      // Convert RepairServiceDays from numbers to day booleans, if necessary
    }
  }
  
 
  saveService() {
    console.log(this.newservice)
debugger
    if (this.serviceToEdit) {
      // If in edit mode, update the existing RepairService
      this._CatelogService.updateRepairService(this.newservice).subscribe(
        (response: any) => {
          this._toastrService.success("Repair Service Updated Succesfully!", "Repair Service Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('RepairService updated');
        },
        (error: any) => {
          this._toastrService.error("Error updating RepairService",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating RepairService:', error);
        }
      );
    } else {

      // If not in edit mode, add a new RepairService
      this._CatelogService.addRepairService(this.newservice).subscribe(
        (response: any) => {
           console.log(this.newservice)
          this._toastrService.success("Repair Service Saved Succesfully!", "Repair Service Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Repair Service Saved');

        },
        (error: any) => {
          this._toastrService.error("Error Saving Repair Service",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving Repair Service:', error);

        }
      );
    }
  }
  fetchRepairServicesTypes(): void {
    debugger
    this._CatelogService.getAllRepairServicesTypes().subscribe(
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
