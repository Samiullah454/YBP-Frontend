import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ShiftService } from 'app/main/apps/shift/shift.service';
import Swal from 'sweetalert2';
import { DiagnosticServiceAddComponent } from '../diagnostic-service-add/diagnostic-service-add.component';
import { CatelogServicesService } from '../../Catelog-services.service';


@Component({
  selector: 'app-diagnostic-service-list',
  templateUrl: './diagnostic-service-list.component.html',
  styleUrls: ['./diagnostic-service-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiagnosticServiceListComponent implements OnInit {
  public selectedOption = 10;
  public searchValue = '';
  public rows: any[]=[];
  Types: any[] = [];
  public ColumnMode = ColumnMode;
  TypeMap: { [key: number]: string } = {};

  constructor(private _CatelogService:CatelogServicesService,private modalService: NgbModal) { }
  @ViewChild(DatatableComponent) table: DatatableComponent;

  ngOnInit(): void {
    this.fetchDiagnosticServicesTypes();
    this.fetchDiagnosticServices();
  
  }
 
 
  
  // Method to get the shift name based on the number

  edit(row: any) {

    this.openAddServiceModal(row);
  }
  openAddServiceModal(Shift?: any) {
    const modalRef = this.modalService.open(DiagnosticServiceAddComponent);
    modalRef.componentInstance.serviceToEdit = Shift; 

    modalRef.result.then((result) => {
      debugger;
      console.log('Modal closed with result:', result);
      this.fetchDiagnosticServices();
    }, (reason) => {
      console.log('Modal dismissed with reason:', reason);
    });
  }
  fetchDiagnosticServicesTypes(): void {
    
    this._CatelogService.getAllDiagnosticServicesTypes().subscribe(
      (data: any) => {
        this.Types = data.result.items
   console.log(this.Types)
      },
      (error: any) => {
        console.error('Error fetching Types:', error);
      }
    );
  }
  fetchDiagnosticServices(): void {
    
    this._CatelogService.getAllDiagnosticServices().subscribe(
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
    this._CatelogService.DeleteDiagnosticService(id).subscribe(
      (response: any) => {
        // Handle success response
        console.log('Industry deleted:', response);
        // Optionally, refresh the industry list after deletion
        this.fetchDiagnosticServices();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting industry:', error);
      }
    );
  }

}
