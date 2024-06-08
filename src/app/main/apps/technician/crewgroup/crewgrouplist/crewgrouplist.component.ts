import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ShiftService } from '../../../shift/shift.service';
import { TechnicianService } from '../../technician.service';
import { CrewgroupaddComponent } from '../crewgroupadd/crewgroupadd.component';
import { TechnicianDetailsComponent } from '../../../shift/technician-details/technician-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crewgrouplist',
  templateUrl: './crewgrouplist.component.html',
  styleUrls: ['./crewgrouplist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CrewgrouplistComponent implements OnInit {
  CallerComponent: string;
  public selectedOption = 10;
  public searchValue = '';
  public rows: any[]=[];
  public ColumnMode = ColumnMode;
  sectionBlockUI: any;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private modalService: NgbModal,
    private _technicianService:TechnicianService,
    private _toastrService: ToastrService,
    private _shiftService:ShiftService,
    private route: ActivatedRoute
  ) { }
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit(): void {
    debugger
    this.route.url.subscribe(segments => {
      if (segments.length > 0) {
        this.CallerComponent = segments[0].path;
        console.log('Service Area String:', this.CallerComponent);
        // Use this string as needed
      }});
      if(this.CallerComponent ==="crewgroup"){
        this.GetCrewGroups();
      }
      else if (this.CallerComponent ==="servicearea"){
        this.GetServiceAreas();
      }
      else {
        this.GetTechnicianTypes();
      }

  }
  openAddCrewGroupModal(callerParameter?: string, crewgroup?: any) {
    const modalRef = this.modalService.open(CrewgroupaddComponent);
    modalRef.componentInstance.callerParameter = callerParameter;
    modalRef.componentInstance.crewgroupToEdit = crewgroup;
  
    modalRef.result.then(
      (result) => {
        debugger
        console.log('Result', result);
        if (this.CallerComponent === "crewgroup") {
          this.GetCrewGroups();
        } else if (this.CallerComponent === "servicearea") {
          this.GetServiceAreas();
        } else {
          this.GetTechnicianTypes();
        }
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
        // Handle modal dismissal if needed
      }
    );
  }
  
  edit(row: any) {
    const callerParameter = this.CallerComponent; // Replace this with the string you want to pass
    this.openAddCrewGroupModal(callerParameter,row);
  }
  
  handleClick(row: any) {
    let parameter = '';
    if (this.CallerComponent === 'crewgroup') {
      parameter = 'crewgroup';
    } else if (this.CallerComponent === 'servicearea') {
      parameter = 'servicearea';
    } else if (this.CallerComponent === 'types') {
      parameter = 'types';
    }
  
    this.showTechnicianDetails(row, parameter);
  }
  
  GetCrewGroups()
{
 this._technicianService
 .getAllCrewGroups()
 .pipe(first())
 .subscribe(
   data => {
   
      this.rows=data.result.map(crewgroup => {
        // Count the number of technicians in the shift
        const technicianCount = crewgroup.technicians ? crewgroup.technicians.length : 0;
        
        // Update the technicianCount property of the shift
        return { ...crewgroup, technicianCount };
      });
      console.log(this.rows)
     // this.tempData=this.rows;
   },
   error => {
     
     this._toastrService.error(error.error.message, 'Loading Error', {
       positionClass: 'toast-top-right',
       toastClass: 'toast ngx-toastr',
       closeButton: true
     });
   }
 );
}
GetServiceAreas()
{
 this._technicianService
 .getAllServiceAreas()
 .pipe(first())
 .subscribe(
   data => {
   
      this.rows=data.result.items.map(crewgroup => {
        // Count the number of technicians in the shift
        const technicianCount = crewgroup.technicians ? crewgroup.technicians.length : 0;
        
        // Update the technicianCount property of the shift
        return { ...crewgroup, technicianCount };
      });
      console.log(this.rows)
     // this.tempData=this.rows;
   },
   error => {
     
     this._toastrService.error(error.error.message, 'Loading Error', {
       positionClass: 'toast-top-right',
       toastClass: 'toast ngx-toastr',
       closeButton: true
     });
   }
 );
}
GetTechnicianTypes()
{
  debugger
 this._technicianService
 .getAllTechnicianTypes()
 .pipe(first())
 .subscribe(
   data => {
   
      this.rows=data.result.items.map(crewgroup => {
        // Count the number of technicians in the shift
        const technicianCount = crewgroup.technicians ? crewgroup.technicians.length : 0;
        
        // Update the technicianCount property of the shift
        return { ...crewgroup, technicianCount };
      });
      console.log(this.rows)
     // this.tempData=this.rows;
   },
   error => {
     
     this._toastrService.error(error.error.message, 'Loading Error', {
       positionClass: 'toast-top-right',
       toastClass: 'toast ngx-toastr',
       closeButton: true
     });
   }
 );
}
showTechnicianDetails(row: any, caller: string): void {
  const modalRef = this.modalService.open(TechnicianDetailsComponent, {
    centered: true,
    size: 'xl'
  });
  modalRef.componentInstance.rowData = row;
  modalRef.componentInstance.caller = caller;

  modalRef.result.then((result) => {
    if (this.CallerComponent === 'crewgroup') {
    this.GetCrewGroups();
    } else if (this.CallerComponent === 'servicearea') {
     this.GetServiceAreas();
    } else if (this.CallerComponent === 'types') {
      this.GetTechnicianTypes();
    }  },
   (reason) => {
    // Handle the dismissal reason if needed
  });
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
       this.delete(id)
      }
    });
  }
  delete(id: any) {
if(this.CallerComponent ==="crewgroup"){
      this._technicianService.deleteCrewGroups(id).subscribe(
      (response: any) => {
        // Handle success response
        // Optionally, refresh the industry list after deletion
        this.GetCrewGroups();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting Crew Group:', error);
      }
    
      );
}
 else if (this.CallerComponent ==="servicearea"){
    this._technicianService.deleteServiceArea(id).subscribe(
      (response: any) => {
        // Handle success response
        // Optionally, refresh the industry list after deletion
        this.GetServiceAreas();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting Service Area:', error);
      }
    );}
    else{
    this._technicianService.deleteTechnicianTypes(id).subscribe(
      (response: any) => {
        // Handle success response
        // Optionally, refresh the industry list after deletion
        this.GetTechnicianTypes();
      },
      (error: any) => {
        // Handle error response
        console.error('Error deleting Service Area:', error);
      }
    );}
  }
}
