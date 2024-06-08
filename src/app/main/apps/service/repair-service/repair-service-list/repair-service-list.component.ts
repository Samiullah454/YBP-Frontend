import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ShiftService } from 'app/main/apps/shift/shift.service';
import { ShiftaddComponent } from 'app/main/apps/shift/shiftadd/shiftadd.component';
import { TechnicianDetailsComponent } from 'app/main/apps/shift/technician-details/technician-details.component';
import Swal from 'sweetalert2';
import { RepairServiceAddComponent } from '../repair-service-add/repair-service-add.component';
import { CatelogServicesService } from '../../Catelog-services.service';


@Component({
  selector: 'app-repair-service-list',
  templateUrl: './repair-service-list.component.html',
  styleUrls: ['./repair-service-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RepairServiceListComponent implements OnInit {
  public selectedOption = 10;
  public searchValue = '';
  public rows: any[]=[];
  Types: any[] = [];
  public ColumnMode = ColumnMode;

  constructor(private _CatelogService:CatelogServicesService,private modalService: NgbModal) { }
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
    this.fetchRepairServicesTypes();
    this.fetchRepairServices();
  
  }
 
 
  
  // Method to get the shift name based on the number

  edit(row: any) {

    this.openAddServiceModal(row);
  }
  openAddServiceModal(Shift?: any) {
    const modalRef = this.modalService.open(RepairServiceAddComponent);
    modalRef.componentInstance.serviceToEdit = Shift; 

    modalRef.result.then((result) => {
      debugger
      this.fetchRepairServices();
    }, (reason) => {
    });
  }
  fetchRepairServicesTypes(): void {
    
    this._CatelogService.getAllRepairServicesTypes().subscribe(
      (data: any) => {
        this.Types = data.result.items
   console.log(this.Types)
      },
      (error: any) => {
        console.error('Error fetching Types:', error);
      }
    );
  }
  fetchRepairServices(): void {
    
    this._CatelogService.getAllRepairServices().subscribe(
      (data: any) => {
        this.rows = data.result.items
        
        console.log(this.Types)

        
        console.log(this.rows)
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  }
  getTypeName(number: number): string {
    const foundType = this.Types.find(type => type.id === number);

    return foundType ? foundType.name : 'Unknown';
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
        this.deleteService(id);
      }
    });
  }
  
  deleteService(id: any) {
    // Implement your logic to delete the industry
    // For example, call the delete method from your service passing the industry ID
    this._CatelogService.DeleteRepairService(id).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Industry deleted:', response);
        // Optionally, refresh the industry list after deletion
        this.fetchRepairServices();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting industry:', error);
      }
    );
  }
  


}
