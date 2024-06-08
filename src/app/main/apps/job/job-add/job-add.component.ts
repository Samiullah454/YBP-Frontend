import { Component, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../job.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../customer/customer.service';
import { TechnicianService } from '../../technician/technician.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CatelogServicesService } from '../../service/Catelog-services.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class JobAddComponent implements OnInit {

  @Input() JobToEdit: any; // Input to receive existing JobService data for edit mode
  newJob: any = {};
  Customers: any[] = []; // Object to hold new JobService data
  JobTypes: any []=[];
  selectedItems: any[] = [];
  technicianassigned : any[]=[];
  technicianupdated :any []=[];
  crewgroups: any [] =[];
  filterbyservice: boolean =false;
  @Input() technicians: any [] = [];
  filteredTechnicians: any[];
  selectedCrewGroupId: any;
  public ColumnMode = ColumnMode;
  technicianIds :any [] =[];
  daysOfWeek: any[] = [
    { number: 1, shortName: 'Mun' },
    { number: 2, shortName: 'Tue' },
    { number: 3, shortName: 'Wed' },
    { number: 4, shortName: 'Thu' },
    { number: 5, shortName: 'Fri' },
    { number: 6, shortName: 'Sat' },
    { number: 7, shortName: 'Sun' }
  ];
  servicetype: any[] = [
    { id: 0, name: " Diagnostic" },
    { id: 1, name: "Repair" },
    { id: 2, name: "Warranty" }
  ]
  diagnosticservice
  services: any[] = []
  selectedServiceType: number;
  selectedCustomer: any;
  // Assuming services is an array of integers
  selectedServices: number[] = [];
 @Input() options = [ ];

  constructor(private _jobService: JobService,
    private _customerService:CustomerService, 
    public activeModal: NgbActiveModal, 
    private _technicianService:TechnicianService,
       private _toastrService: ToastrService,
       private _CatelogService:CatelogServicesService) {
   
}
@ViewChild(DatatableComponent) table: DatatableComponent;
  ngOnInit() {
    this.fetchchecklist();
    this.fetchCustomers();
    this.fetchJobTYPES();
    this.fetchCrewGroups();
    
    console.log(this.Customers)
    console.log("CheckList" , this.options)
    if (this.JobToEdit) {
      this.newJob = { ...this.JobToEdit };
    console.log(this.newJob)
    this.filterTechnicians(this.newJob.crewGroupId);
    }
    
    if (this.newJob && Array.isArray(this.newJob.jobChecklist)) {
    this.newJob.jobChecklist.forEach(item => {
      const checklistId = item.checklistId;
      const selectedOptionIndex = this.options.findIndex(option => option.id === checklistId);

      if (selectedOptionIndex !== -1) {

        this.checklist.push(this.options[selectedOptionIndex].id)
        console.log("Selected Items",this.checklist)
       
      }
    });
  }
  this.filteredTechnicians = this.technicians; 
  if (this.newJob.crewGroupId) {
    
    this.filterTechnicians(this.newJob.crewGroupId);
}
this.selectedServiceType =this.newJob.jobService[0]?.service,
this.selectedServices = this.newJob.jobService.map(service => service.serviceId) || [],
console.log("Services",this.selectedServices)
this.onServiceChange(3,this.selectedServiceType);
this.newJob.scheduledDateTime = this.formatDateToISO(this.newJob.scheduledDateTime);

setTimeout
(() =>{ this.updateCustomerDetails();          },5000
      );
  }

  
  private convertTimeToMinutes(time: string): number {
    // Replace non-numeric characters and split the string
    const [hours, minutes] = time.replace(/[^\d:]/g, '').split(':').map(Number);
    return hours * 60 + minutes;
  }
  calculateDuration(startTime: string, endTime: string): string {
    const durationInHours = this.calculateDurationInHours(startTime, endTime);
    return `${durationInHours} hours`;
  }
  
  private calculateDurationInHours(startTime: string, endTime: string): number {
    const start = this.convertTimeToMinutes(startTime);
    let end = this.convertTimeToMinutes(endTime);
  
    // Adjust end time if it is on the next day
    if (end < start) {
      end += 24 * 60; // Assuming a 24-hour day
    }
  
    const totalMinutes = end - start;
    const totalHours = totalMinutes / 60;
  
    return totalHours;
  }
  

  formatDateToISO(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  onScheduledDateChange(newDate: string) {
    
    console.log("Date",newDate)
    // Format the date when it changes
    this.newJob.scheduledDateTime = this.formatDateToISO(newDate);
  }
  ServiceChange(selectedItems: any[]) {
    // Check if all services are unselected
    if (selectedItems.length === 0) {
      this.selectedServices = null;
      this.filterbyservice=false;
      this.filterTechnicians(); // Set selectedServices to null
    }
  }
  onServiceChange(event?: any,servicetype?:any) {
    console.log(event)
    
    if (event === 0 || event === 1 || event === 2||event == null) {
      this.selectedServices = null;
      this.filterbyservice=false;
      this.filterTechnicians();
    }
    const serviceId =event;
    if (serviceId === 0 || servicetype ===0 ) {
      this.fetchDiagnosticServices();
    } else if (serviceId === 1  || servicetype ===1) {
      this.fetchRepairServices();
    } else if (serviceId === 2 || servicetype ===2) {
      this.fetchWarrantyServices();
    }
  }
  fetchDiagnosticServices(): void {

    this._CatelogService.getAllDiagnosticServices().subscribe(
      (data: any) => {
        this.services = data.result.items
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  }
  fetchRepairServices(): void {

    this._CatelogService.getAllRepairServices().subscribe(
      (data: any) => {
        this.services = data.result.items
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  }
  fetchWarrantyServices(): void {

    this._CatelogService.getAllWarrantyClaimServices().subscribe(
      (data: any) => {
        this.services = data.result.items
      },
      (error: any) => {
        console.error('Error fetching industries:', error);
      }
    );
  }
  updateTechnician(technicianId: string, isChecked: boolean) {
    ;
    const index = this.technicianassigned.indexOf(technicianId);

    if (isChecked && index === -1) {
        // Add the ID to the technicianupdated array if it's not already present
        this.technicianassigned.push(technicianId);
    } else if (!isChecked && index !== -1) {
        // Remove the ID from the technicianupdated array if it's present
        this.technicianassigned.splice(index, 1);
    }

    console.log("Selected Technicians", this.technicianassigned);
}

isTechnicianSelected(technicianId: number): boolean {
    const isSelected = this.technicianassigned.includes(technicianId);

    return isSelected;
}

filterTechnicians(id?: string) {
  debugger

  const selectedCrewGroupId = id ? +id : +this.newJob.crewGroupId;

  if (selectedCrewGroupId) {
      // Filter technicians based on the selected crew group
      this.filteredTechnicians = this.technicians.filter(technician => technician.crewGroupId === selectedCrewGroupId);
      this.technicianassigned = this.filteredTechnicians.map(technician => technician.id);
      console.log("Assigned Technicians", this.technicianassigned);
  } else if (this.newJob?.technicianJob?.length > 0) {
      // If crew group is null and there are entries in the technicianJob array, filter based on technicianJob
      const technicianIdsInJob = this.newJob.technicianJob.map(techJob => techJob.technicianId);
      this.filteredTechnicians = this.technicians.filter(technician => technicianIdsInJob.includes(technician.id));
      this.technicianassigned = technicianIdsInJob;
      console.log("Assigned Technicians", this.technicianassigned);
  } else {
      // If no crew group is selected and no entries in technicianJob, show all technicians
      this.filteredTechnicians = this.technicians;
  }
  if (this.selectedServices && this.selectedServices.length > 0&& this.filterbyservice) {
    this.filteredTechnicians = this.filteredTechnicians.filter(
      (technician) =>
        technician.technicianServices.some(
          (service) =>
          
            this.selectedServices.includes(service.serviceId) &&
            service.service === this.selectedServiceType // replace with the actual service type you are looking for
        )
    );
  }
  console.log(this.filterTechnicians)
}


onCrewRequiredChange() {
  if (!this.newJob.crewRequired) {
   
    // If crewRequired is unchecked, clear the selected crew group
    this.newJob.crewGroupId = null;
    this.filteredTechnicians =this.technicians;
  }
  else{
    this.filteredTechnicians = [];
  }

}

updateCustomerDetails() {

  // Find the selected customer based on newJob.customerId
  this.selectedCustomer = this.Customers.find(customer => customer.id === this.newJob.customerId);
  console.log(this.selectedCustomer)
}
  checklist: any[] = this.options.filter(option => this.selectedItems.includes(option.id));

onOptionsChange(event: any, selectedValue: any) {
  
  if (event.target.checked) {
    this.checklist.push(selectedValue);
    console.log(this.checklist);
  } else {
    const index = this.checklist.indexOf(selectedValue);
    if (index !== -1) {
      this.checklist.splice(index, 1);
    }
    console.log(this.checklist);
  }
  // Avoid calling closeModal here
}

  fetchchecklist():void{
    
    this._jobService.getAllChecklist().subscribe(
      (data: any) => {
        
        this.options = data.result.items
       console.log(this.options)
      },
      (error: any) => {
        console.error('Error fetching JobTypes:', error);
      }
    );
  }
  fetchCrewGroups():void{
    
    this._technicianService.getAllCrewGroups().subscribe(
      (data: any) => {
        
        this.crewgroups = data.result
        // if(data.result.crewRequired){
        //   this.extractTechnicians();
        // }
       
      },
      (error: any) => {
        console.error('Error fetching JobTypes:', error);
      }
    );
  }

  mapDaysToWeek(day: number): any[] {
    if (Number.isInteger(day)) {
      const foundDay = this.daysOfWeek.find(d => d.number === day);
  
      if (foundDay) {
        return foundDay.shortName;
      } else {
        // Handle the case where the day number is not found in the daysOfWeek array
        console.error("Day number not found:", day);
        return [];
      }
    } else {
      // Handle the case where 'day' is not a number
      console.error("'day' is not a number:", day);
      return [];
    }
  }
  
  
  saveJob() {
 
    console.log(this.newJob)
  console.log(this.selectedItems)
  this.newJob.technicianIds=[];
  if (!this.JobToEdit) {
    this.newJob.jobChecklist = [];
    this.newJob.technicianJob = [];
    this.newJob.jobService=[];
  }
  console.log(this.newJob);


 

  // Clear any existing values in idstoDel control
 
  const idsToRemove: number[] = [];
  const ids: number[] = [];
  // Iterate over existing technicianServices
  for (const technicianService of this.newJob.jobService) {
    const serviceId = technicianService.serviceId;
    const servicetype=technicianService.service;
    const id = technicianService.id; 
    // Check if serviceId is not in selectedServices
    if (!this.selectedServices.includes(serviceId)&&this.selectedServiceType!== servicetype) {
      idsToRemove.push(serviceId);
      ids.push(id)
    }
    this.newJob.jobServiceIds=ids
  }
 
  // Remove ids that are in technicianServices but not in selectedServices
  for (const idToRemove of idsToRemove) {
    const indexToRemove = this.newJob.jobService.findIndex(
      (technicianService) => technicianService.serviceId === idToRemove
    );

    if (indexToRemove !== -1) {
      this.newJob.jobService.splice(indexToRemove, 1);
    }
  }

  // Add new objects for ids in selectedServices but not in technicianServices
  for (const selectedService of this.selectedServices) {
    if (!this.newJob.jobService.some((ts) => ts.serviceId === selectedService)) {
      const technicianService = {
        id: 0,
        service: this.selectedServiceType,
        serviceId: selectedService,
        jobId: this.newJob.id, // Assuming you'll set this value dynamically
      };

      this.newJob.jobService.push(technicianService);
     
    }
  }
// Copy the existing jobChecklist to a new array
const existingChecklistIds = this.newJob.jobChecklist.map(item => item.checklistId);

// Check for removed checklist items

 const removedChecklistItems = this.newJob.jobChecklist.filter(item => !this.checklist.includes(item.checklistId));

 // Store the removed checklist item IDs in JobChecklistIds array
 this.newJob.jobChecklistIds = removedChecklistItems.map(item => item.id);
// Remove checklist items that are not selected anymore
this.newJob.jobChecklist = this.newJob.jobChecklist.filter(item => this.checklist.includes(item.checklistId));

// Check for new checklist items
const newChecklistIds = this.checklist.filter(id => !existingChecklistIds.includes(id));

// Add new checklist items to the jobChecklist array
this.newJob.jobChecklist = [
  ...this.newJob.jobChecklist,
  ...newChecklistIds.map(newId => ({ checklistId: newId, jobId: this.newJob.id }))
];

this.technicianIds = this.technicianIds.map(id => +id);

const existingTechnicianJobIds = this.newJob.technicianJob.map(item => item.technicianId);

// Check for removed technician job items
const removedTechnicianJobItems = this.newJob.technicianJob.filter(item => !this.technicianassigned.includes(item.technicianId));

// Store the removed technician job item IDs in TechnicianJobIds array
this.newJob.TechnicianJobIds = removedTechnicianJobItems.map(item => item.id);

// Remove technician job items that are not selected anymore
this.newJob.technicianJob = this.newJob.technicianJob.filter(item => this.technicianassigned.includes(item.technicianId));

// Check for new technician job items
const newTechnicianJobIds = this.technicianassigned.filter(id => !existingTechnicianJobIds.includes(id));

// Add new technician job items to the technicianJob array
this.newJob.technicianJob = [
  ...this.newJob.technicianJob,
  ...newTechnicianJobIds.map(newId => ({ technicianId: newId, jobId: this.newJob.id }))
];

console.log(this.newJob);

    if (this.JobToEdit) {
      // If in edit mode, update the existing JobService
      this._jobService.updateJob(this.newJob).subscribe(
        (response: any) => {
          this._toastrService.success("Job Service Updated Succesfully!", "Job Service Updated", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Job Service updated');
        },
        (error: any) => {
          this._toastrService.error("Error updating JobService",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error updating JobService:', error);
        }
      );
    } else {

     console.log(this.newJob)
      // If not in edit mode, add a new JobService
      this._jobService.addJob(this.newJob).subscribe(
        (response: any) => {
           console.log(this.newJob)
          this._toastrService.success("Job Service Saved Succesfully!", "Job Service Saved", {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          
          this.activeModal.close('Job Service Saved');

        },
        (error: any) => {
          this._toastrService.error("Error Saving Job Service",error, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          console.error('Error saving Job Service:', error);

        }
      );
    }
  }
  fetchJobTYPES(): void{
    this._jobService.getAllJobTypes().subscribe(
      (data: any) => {
        this.JobTypes = data.result.items
  
      },
      (error: any) => {
        console.error('Error fetching JobTypes:', error);
      }
    );
  }
  fetchCustomers(): void {
    
    this._customerService.getAllCustomer().subscribe(
      (data: any) => {
        this.Customers = data.result.items
  
      },
      (error: any) => {
        console.error('Error fetching Customers:', error);
      }
    );
  }
  closeModal() {
    this.activeModal.dismiss('Modal closed');
  }

}
