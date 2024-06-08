import { NumberInput } from '@angular/cdk/coercion';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { accountContactModel } from 'app/auth/models/Accounts/accountContactModel';
//mport { accountDocumentModel } from 'app/auth/models/Accounts/accountDocumentModel';
import { accountModel } from 'app/auth/models/Accounts/accountModel';
//import { PatientDocumentModel } from 'app/auth/models/Patient/PatientDocumentModel';
//import { AccountsService } from 'app/auth/service';
//import { RateService } from 'app/auth/service/rateService';
import Stepper from 'bs-stepper';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TechnicianService } from '../technician.service';
import { ShiftService } from '../../shift/shift.service';
import { ShiftaddComponent } from '../../shift/shiftadd/shiftadd.component';
import { data } from 'autoprefixer';
import { error } from 'console';
import { ThemeService } from 'ng2-charts';
import { CatelogServicesService } from '../../service/Catelog-services.service';
import { id } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-technician-add',
  templateUrl: './technician-add.component.html',
  styleUrls: ['./technician-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TechnicianAddComponent implements OnInit {
  @ViewChild('fileuploader') fileuploader: ElementRef;
  @ViewChild('information') information: ElementRef;
  @ViewChild('billing') billing: ElementRef;
  @ViewChild('contacts') contacts: ElementRef;
  @ViewChild('rates') rates: ElementRef;
  @ViewChild('portals') portals: ElementRef;
  @ViewChild('documents') documents: ElementRef;
  @ViewChild('notes') notes: ElementRef;
  @ViewChild('LeavePageModel', { static: true }) LeavePageModel: ElementRef;
  @ViewChild('logouploader') logouploader: ElementRef;
  private _unsubscribeAll: Subject<any>;
  public technicianForm: FormGroup;
  public url = this.router.url;
  public lastValue;
  public accountObj: any;
  showIncentiveOptions = false;
  selectedCompensationType = '';
  selectedIncentiveType = '';
  incentiveValue = 0;
  compensationValue = 0;
  selectedShift: any = null;
  diagnostcservices: any[] = [];

  servicetype: any[] = [
    { id: 0, name: " Diagnostic" },
    { id: 1, name: "Repair" },
    { id: 2, name: "Warranty" }
  ]
  services: any[] = []
  updateCompensationType(type: string) {
    this.selectedCompensationType = type;
    this.compensationValue = 0;
    this.technicianForm.get('compensationType').setValue(type === 'hourly' ? 0 : 1);
  }
  updateIncentiveType(type: string) {
    this.selectedIncentiveType = type;
    this.incentiveValue = 0; // Resetting incentiveValue

    let valueToSet: number;

    switch (type) {
      case 'No':
        valueToSet = 0;
        break;
      case 'perhour':
        valueToSet = 1;
        break;
      case 'perjob':
        valueToSet = 2;
        break;
      case 'perpercentage':
        valueToSet = 3;
        break;
      default:
        valueToSet = -1; // Set a default value or handle an unknown type
        break;
    }

    // Assuming this.technicianForm.get('incentiveType') is a FormControl
    this.technicianForm.get('incentiveType').setValue(valueToSet);
  }



  // Inside your component.ts file
  TechnicianTypesList: any[] = [

  ];
  ShiftsList: any[] = [];
  crewgrouplist: any[] = [];
  ServiceAreaList = [
  ];
  getServiceAreas() {
    this._technicianService.getAllServiceAreas().subscribe
      (data => {
        this.ServiceAreaList = data.result.items
        console.log(this.ServiceAreaList)
      }),
      error => {

        this._toastrService.error(error.error.message, 'Loading Error', {
          positionClass: 'toast-top-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
  }
  getTechnicianTypes() {
    this._technicianService.getAllTechnicianTypes().subscribe
      (data => {
        this.TechnicianTypesList = data.result.items
      }),
      error => {

        this._toastrService.error(error.error.message, 'Loading Error', {
          positionClass: 'toast-top-right',
          toastClass: 'toast ngx-toastr',
          closeButton: true
        });
      }
  }
  // public
  public contentHeader: object;
  public rows: any[] = [
    { id: 1, type: 'Sedan', pickupcharges: 2, waitcharges: 12, milecharges: 12, noshowfee: 20, afterhoursfee: 12 },
    { id: 2, type: 'SUV (Sports Utility Vehicle)', pickupcharges: 2, waitcharges: 12, milecharges: 12, noshowfee: 20, afterhoursfee: 12 },
    { id: 3, type: 'Hatchback', pickupcharges: 2, waitcharges: 12, milecharges: 12, noshowfee: 20, afterhoursfee: 12 },
    { id: 4, type: 'Coupe', pickupcharges: 2, waitcharges: 12, milecharges: 12, noshowfee: 20, afterhoursfee: 12 },
    { id: 5, type: 'Convertible', pickupcharges: 2, waitcharges: 12, milecharges: 12, noshowfee: 20, afterhoursfee: 12 },
    { id: 6, type: 'Minivan', pickupcharges: 2, waitcharges: 12, milecharges: 12, noshowfee: 20, afterhoursfee: 12 },

  ];

  public progressBarHeight = 7; // Default height



  public isReload = false;


  public levelofpriority = [
    { id: 'P1', name: 'P1' },
    { id: 'P2', name: 'P2' },
    { id: 'P3', name: 'P3' },
  ];

  /**
   * Emitted Events
   *
   * @param $event
   */
  emittedEvents($event) {
    console.log('Action : ', $event);
  }



  public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  // private

  private verticalWizardStepper: Stepper;


  private bsStepper;



  /**
   * Vertical Wizard Stepper Next
   */
  verticalWizardNext() {
    this.verticalWizardStepper.next();
  }
  /**
   * Vertical Wizard Stepper Previous
   */
  verticalWizardPrevious() {
    this.verticalWizardStepper.previous();
  }
  get f() {

    return this.technicianForm.controls;

  }
  /**
   * On Submit
   */
  createNewShift(): void {
    debugger
    console.log("Add Shift ")
    // Rest of your logic...
  }
  openAddShfitModal(Shift?: any) {

    const modalRef = this.modalService.open(ShiftaddComponent);
    modalRef.componentInstance.shiftToEdit = Shift;

    modalRef.result.then((result) => {
      this.fetchShifts();
    }, (reason) => {
    });
  }
  onShiftSelect(event: any) {
    console.log(event.id)
    // Assuming the event contains the ID of the selected shift
    this.selectedShift = this.ShiftsList.find(shift => shift.id === event.id);
    console.log(this.selectedShift)
  }
  onServiceChange(event?: any) {
    console.log(event)
    debugger
    if (event === 0 || event === 1 || event === 2) {
      this.technicianForm.get('selectedServices').setValue(null);
    }
    const serviceId = this.technicianForm.get('serviceType').value;
    if (serviceId === 0 ) {
      this.fetchDiagnosticServices();
    } else if (serviceId === 1 ) {
      this.fetchRepairServices();
    } else if (serviceId === 2 ) {
      this.fetchWarrantyServices();
    }
  }


  getservice(serviceId: number) {
    // Implement your logic to fetch data based on the selected serviceId
    // This method will be called when the selection in the ng-select changes
    console.log(`Selected Service ID: ${serviceId}`);
  }
  submitted;
  onSubmit() {
    debugger;
    console.log(this.technicianForm.value);
    this.savingData = true;
    this.submitted = true;

    const serviceType = this.technicianForm.value.serviceType;
    const selectedServices = this.technicianForm.value.selectedServices;

    const idstoDelControl = this.technicianForm.get('idstoDel');

    // Clear any existing values in idstoDel control
    idstoDelControl?.setValue([]);
    const idsToRemove: number[] = [];
    const ids: number[] = [];
    let service:number =null;
    // Iterate over existing technicianServices
    for (const technicianService of this.technicianForm.value.technicianServices) {
      const serviceId = technicianService.serviceId;
       service=technicianService.service;
      const id = technicianService.id; 
      // Check if serviceId is not in selectedServices
      if (!selectedServices.includes(serviceId)||serviceType!== service) {
        idsToRemove.push(serviceId);
        ids.push(id)
      }
      idstoDelControl.setValue( ids)
    }
   
    // Remove ids that are in technicianServices but not in selectedServices
    for (const idToRemove of idsToRemove) {
      const indexToRemove = this.technicianForm.value.technicianServices.findIndex(
        (technicianService) => technicianService.serviceId === idToRemove
      );

      if (indexToRemove !== -1) {
        this.technicianForm.value.technicianServices.splice(indexToRemove, 1);
      }
    }

    // Add new objects for ids in selectedServices but not in technicianServices
    for (const selectedService of selectedServices) {
      if (!this.technicianForm.value.technicianServices.some((ts) => ts.serviceId === selectedService)&&serviceType!== service) {
        const technicianService = {
          id: 0,
          service: serviceType,
          serviceId: selectedService,
          technicianId: this.technicianForm.value.id, // Assuming you'll set this value dynamically
        };

        this.technicianForm.value.technicianServices.push(technicianService);
       
      }
    }

    console.log('Data', this.technicianForm.value);

    if (this.technicianForm.invalid) {
      this.savingData = false;
      // this.NavigateToInvalidControl();
      return;
    }

    // this.convertFormToformData();
    if (this.technicianForm.value.id > 0) {
      this.UpdateTechnician();
    } else {
      this.AddTechnician();
    }
  }

  constructor(private _coreConfigService: CoreConfigService,

    private _route: ActivatedRoute,
    private _router: Router,
    private divtobeclicked: ElementRef,
    private renderer: Renderer2,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _technicianService: TechnicianService,
    private _shiftService: ShiftService,
    private _CatelogService: CatelogServicesService,
    //private _accountService:AccountsService,
    //private _rateservice:RateService,
    private _toastrService: ToastrService, private router: Router,) {
    this._route.params.subscribe(params => {
      const itemId = +params['id'];
      if (itemId > 0) {

        this.getDataById(itemId);
      }// Fetch the ID from the route

    });
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  getDataById(technicianId: number) {
    this._technicianService.getTechnicianById(technicianId).subscribe(data => {
      debugger
      console.log(data.result)
      let compensationTypeString = '';
      if (data.result.compensationType === 0) {
        compensationTypeString = 'hourly';
      } else if (data.result.compensationType === 1) {
        compensationTypeString = 'salary';
      }
      let incentiveTypeString = '';
      if (data.result.incentiveType === 0) {
        incentiveTypeString = 'No';
      }
      else if (data.result.incentiveType === 1) {
        incentiveTypeString = 'perjob';
      }
      else if (data.result.incentiveType === 2) {
        incentiveTypeString = 'perhour';
      }
      else if (data.result.incentiveType === 3) {
        incentiveTypeString = 'perpercentage';
      }

      this.technicianForm.patchValue({
        id: data.result.id,
        photo_url: data.result.photo_url,
        technicianName: data.result.technicianName,
        technicianTypeId: data.result.technicianTypeId,
        address: data.result.address,
        contactNumber: data.result.contactNumber,
        alt_ContactNumber: data.result.alt_ContactNumber,
        email: data.result.email,

        emr_ContactName: data.result.emr_ContactName,
        emr_ContactRelationship: data.result.emr_ContactRelationship,
        emr_ContactPhone: data.result.emr_ContactPhone,

        employmentType: data.result.employmentType,

        compensationType: compensationTypeString,
        hourlyRate: data.result.hourlyRate,
        salary: data.result.salary,

        incentiveType: incentiveTypeString,
        inc_perjob: data.result.inc_perjob,
        inc_perHourJob: data.result.inc_perHourJob,
        inc_percentageJob: data.result.inc_percentageJob,
        serviceAreasId: data.result.serviceAreasId,
        driverLicense: data.result.driverLicense,
        crewGroupId: data.result.crewGroupId,
        ssn: data.result.ssn,
        dob: data.result.dob ? this.formatDateToISO(data.result.dob) : null,
        shiftId: data.result.shiftId,
        serviceType: data.result.technicianServices[0]?.service,
        selectedServices: data.result.technicianServices.map(service => service.serviceId) || [],
        idstoDel:data.result.idsToDel,
       technicianServices: [],

      });
      const technicianServicesArray = this.technicianForm.get('technicianServices') as FormArray;

      for (const service of data.result.technicianServices) {
        const technicianService = this._formBuilder.group({
          id: service.id,
          service: service.service,
          serviceId: service.serviceId,
          technicianId: service.technicianId,
          // Add other properties if needed
        });

        technicianServicesArray.push(technicianService);
      }
      console.log("Data", this.technicianForm.value)
    });
  }
  formatDateToISO(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {
    this.fetchShifts();
    this.getcrewgroups();
    this.getServiceAreas();
    this.getTechnicianTypes();
    this.technicianForm = this._formBuilder.group({
      id: [0],
      photo_url: [''],
      technicianName: ['', Validators.required], // Technician Name
      technicianTypeId: ['', Validators.required], // Technician Type
      address: ['', Validators.required], // Physical Address
      contactNumber: ['', Validators.required], // Contact Number
      alt_ContactNumber: [''], // Alternate Contact Number
      email: ['', [Validators.required, Validators.email]], // Email

      // In Case of Emergency
      emr_ContactName: ['', Validators.required], // Emergency Contact Name
      emr_ContactRelationship: ['', Validators.required], // Emergency Relationship
      emr_ContactPhone: [''], // Emergency Contact Number

      // Employment Information
      employmentType: ['', Validators.required], // Employment Type

      // Compensation
      compensationType: ['', Validators.required], // Compensation Type (Hourly or Salary)
      hourlyRate: [''], // Hourly Rate
      salary: [''], // Salary

      // Incentive
      incentiveType: [''], // Default to 'no'
      inc_perjob: [''],
      inc_perHourJob: [''],
      inc_percentageJob: [''],

      // Other Information
      driverLicense: [''], // Driver License Number
      ssn: [''], // Social Security Number
      dob: [''], // Date of Birth
      serviceAreasId: [''], // Service Area
      shiftId: [''],
      crewGroupId: [''],
      serviceType: [null, Validators.required],

      // Multiple Selected Services (Dropdown)
      selectedServices: [],
      idstoDel: [null],
      // Technician Services
      technicianServices: this._formBuilder.array([])
    });
    console.log('Services Array:', this.services);
    this.accountObj = new accountModel();
    this.contentHeader = {
      headerTitle: 'Technician',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Technicians',
            isLink: true,
            link: '/apps/Technician/list'
          },
          {
            name: 'Add',
            isLink: false
          }
        ]
      }
    };
    this.verticalWizardStepper = new Stepper(document.querySelector('#stepper2'), {
      linear: false,
      animation: true
    });
    document.body.style.overflow = 'hidden';
    this.bsStepper = document.querySelectorAll('.bs-stepper');
    this.GetLocations();
    this.Loadstates();
    this.PopulateDropDowns("AccountStatus");
    this.PopulateDropDowns("AccountPriorityLevels");
    this.PopulateDropDowns("AccountBillingMethods");
    this.PopulateDropDowns("AccountModeOfPayments");
    this.PopulateDropDowns("AccountBillingTermDays");
    this.PopulateDropDowns("AccountBillTo");
    this.LoadAccountTypes();
    this.LoadRateTemplates();

    //this.LoadFormDataFromObj();
    // if(this.lastValue>0)
    // {
    //   this.LoadAccount();
    // }
    // else 
    // {
    //    this.addContact();
    //    this.addDocument();
    // }

  }




  // Add a method to get services for the dropdown
  getServices() {
    return this.services;
  }

  // Method to add a technician service to the form array


  // Getter for the technicianServices form array
  get technicianServices() {
    return this.technicianForm.get('technicianServices') as FormArray;
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
  getcrewgroups(): void {
    this._technicianService.getAllCrewGroups().subscribe(
      (data: any) => {
        this.crewgrouplist = data.result
      },
      (error: any) => {
        console.error('Error fetching CrewGroups:', error);

      }
    )
  }
  fetchShifts(): void {
    debugger
    this._shiftService.getAllShifts().subscribe(
      (data: any) => {
        this.ShiftsList = data.result.items;
        console.log(this.ShiftsList);
      },
      (error: any) => {
        console.error('Error fetching shifts:', error);
      }
    );
  }
  LocationTracker(divid: string) {

    this._router.navigate(['/apps/account/add'], { fragment: divid });

    // ['/route2'], { fragment: 'div2' })
  }

  NavigateToinformation(): void {
    this.information.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 5.5; // Update the height
    //this.CheckBasicInfoFilled();
  }
  NavigateToBilling(): void {
    this.billing.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 11; // Update the height
    //this.CheckBasicInfoFilled();
  }
  NavigateToContact(): void {
    this.contacts.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 16.5; // Update the height
    //this.CheckBasicInfoFilled();
  }
  NavigateTorates(): void {
    this.rates.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 22; // Update the height
    //this.CheckBasicInfoFilled();
  }
  NavigateToportals(): void {
    this.portals.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 27.5; // Update the height
    //this.CheckBasicInfoFilled();

  }
  NavigateTodocuments(): void {
    this.documents.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 32; // Update the height
    //this.CheckBasicInfoFilled();

  }
  NavigateTonotes(): void {
    this.notes.nativeElement.scrollIntoView({ behavior: 'smooth' });
    this.progressBarHeight = 37.5; // Update the height
    //this.CheckBasicInfoFilled();

  }

  checkFocusOnDiv(divElement): void {

    const ActiveDiv = divElement.nativeElement;
    const element = this.divtobeclicked.nativeElement.querySelector(divElement);
    if (element) {
      const activeElement = this.divtobeclicked.nativeElement.querySelector('.active');
      if (activeElement) {
        activeElement.classList.remove('active'); // Replace 'active' with your class name to remove
      }
      this.renderer.addClass(element, 'active');
      if (divElement == '#s-information') {
        this.progressBarHeight = 5.50;
      }
      else if (divElement == '#s-billing') {
        this.progressBarHeight = 11;
      }
      else if (divElement == '#s-contacts') {
        this.progressBarHeight = 16.5;
      }
      else if (divElement == '#s-rates') {
        this.progressBarHeight = 22;
      }
      else if (divElement == '#s-portals') {
        this.progressBarHeight = 27.5;
      }
      else if (divElement == '#s-documents') {
        this.progressBarHeight = 32;
      }
      else if (divElement == '#s-notes') {
        this.progressBarHeight = 37.5;
      }
      // this.CheckBasicInfoFilled();
      // console.log(">>>>>>>>>>>>>>>>>",activeElement, ">>>>>>>>>>>>", this)

    }
  }

  modalRoleList(modalPrimary) {

    this.modalService.open(modalPrimary, {
      centered: true,
      size: 'sm',
      windowClass: 'modal modal-primary'
    });

  }

  // canDeactivate(): boolean {
  //   this.modalRoleList(this.LeavePageModel);
  //   return true;
  // }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // document.body.style.overflow = 'auto'
    //  this.modalRoleList(this.LeavePageModel);
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }


  loading;
  Locations: any;
  driverTypes: any;
  VehicleDocuments: any[] = [];
  public AccountStatuses;
  public billingtermsdays;
  public billingMethods;
  public paymentmethods;

  GetLocations() {

    //  this.loading =true;

    // console.log("hhyy")
    //  this._accountService
    //  .GetAllLocations()
    //  .pipe(first())
    //  .subscribe(
    //    data => {
    //      debugger
    //       this.Locations=data.data;
    //       this.loading = false;
    //    },
    //    error => {

    //      this._toastrService.error(error.error.message, 'Loading Error', {
    //        positionClass: 'toast-top-right',
    //        toastClass: 'toast ngx-toastr',
    //        closeButton: true
    //      });
    //      this.loading = false;
    //    }
    //  );
  }
  emptype;
  PopulateDropDowns(key) {
    this.emptype = [
      { name: 'W2Employee', id: 0 },
      { name: 'Contractor1099', id: 1 }
    ];

    //  debugger
    //  this._accountService
    //  .GetListForDropDown(key)
    //  .pipe(first())
    //  .subscribe(
    //    data => {
    //      debugger
    //      if(key=="AccountStatus")
    //      {
    //       this.AccountStatuses=data.data;
    //      }
    //      else if (key== "AccountPriorityLevels")
    //      {
    //       this.levelofpriority=data.data;
    //      }
    //      else if (key== "AccountBillingMethods")
    //      {
    //       this.billingMethods=data.data;
    //      }
    //      else if (key== "AccountModeOfPayments")
    //      {
    //       this.paymentmethods=data.data;
    //      }
    //      else if (key== "AccountBillingTermDays")
    //      {
    //       this.billingtermsdays=data.data;
    //      }
    //      else if (key== "AccountBillTo")
    //      {
    //       this.BillingToList=data.data;
    //      }
    //    },
    //    error => {

    //      this._toastrService.error(error.error.message, 'Loading Error', {
    //        positionClass: 'toast-top-right',
    //        toastClass: 'toast ngx-toastr',
    //        closeButton: true
    //      });

    //    }
    //  );
  }

  formData = new FormData();

  skipRate: boolean = false;
  Skipratefornow() {
    this.skipRate = true;
  }
  //   convertFormToformData()
  //   {
  //     this.formData = new FormData();
  //     debugger
  //     for (const controlName of Object.keys(this.technicianForm.controls)) {
  //       var control = this.technicianForm.get(controlName);

  //       if(controlName=="contacts")
  //       {
  //         var index=0;
  //         this.contactArray.controls.forEach((controlGroup: FormGroup) => {
  //           if(controlGroup.get('id')?.value)
  //           {
  //             this.formData.append('contacts['+index+']'+'[id]', controlGroup.get('id').value);
  //           }
  //           this.formData.append('contacts['+index+']'+'[first_name]', controlGroup.get('first_name').value);
  //           this.formData.append('contacts['+index+']'+'[last_name]', controlGroup.get('last_name').value);
  //           if(controlGroup.get('phone_no').value.length>14)
  //           {
  //             this.formData.append('contacts['+index+']'+'[phone_no]',controlGroup.get('phone_no').value.slice(0,-1));    
  //           }
  //           else 
  //           {
  //             this.formData.append('contacts['+index+']'+'[phone_no]',controlGroup.get('phone_no').value);

  //           }

  //           this.formData.append('contacts['+index+']'+'[email]', controlGroup.get('email').value);
  //           if(controlGroup.get('secondary_phone_no')?.value?.length>14)
  //           {
  //             this.formData.append('contacts['+index+']'+'[secondary_phone_no]',controlGroup.get('secondary_phone_no').value.slice(0,-1));    
  //           }
  //           else 
  //           {
  //             if(controlGroup.get('secondary_phone_no').value)
  //             {
  //               this.formData.append('contacts['+index+']'+'[secondary_phone_no]',controlGroup.get('secondary_phone_no').value);
  //             }


  //           }
  //           index=index+1;

  //         });
  //       }
  //       else if(controlName=="users")
  //       {
  //         var index=0;
  //         this.userArray.controls.forEach((controlGroup: FormGroup) => {
  //           this.formData.append('user[username]', controlGroup.get('username').value);
  //           this.formData.append('user[email]', controlGroup.get('email').value);
  //           if(controlGroup.get('password').value)
  //           this.formData.append('user[password]', controlGroup.get('password').value);
  //           index=index+1;
  //         });
  //       }
  //       else if(controlName=="documents")
  //       {
  //         var index=0;
  //         this.documentArray.controls.forEach((controlGroup: FormGroup) => {
  //           if(controlGroup.get('id')?.value)
  //           {
  //             this.formData.append('documents['+index+']'+'[id]', controlGroup.get('id').value);
  //           }
  //           this.formData.append('documents'+'['+index+']' +'[title]', controlGroup.get('title').value);
  //           if(!controlGroup.get('file').value?.path)
  //           {
  //             this.formData.append('documents'+'['+index+']' +'[files][]', controlGroup.get('file').value);
  //           }
  //           if(controlGroup.get('description')?.value)
  //           {
  //             this.formData.append('documents'+'['+index+']' +'[description]', controlGroup.get('description').value);
  //           }

  //           index=index+1;

  //         });
  //       }
  //       else if(controlName=="phone_no")
  //       {
  //         var keyvalue=control.value;
  //         if(control?.value.length>14)
  //         {
  //           this.formData.append(controlName,(control.value.slice(0,-1)));    
  //         }
  //         else 
  //         {
  //           this.formData.append(controlName,(control.value));

  //         }

  //       }
  //       else if(controlName=="secondary_phone_no")
  //       {
  //         var keyvalue=control.value;
  //         if(control?.value?.length>14)
  //         {
  //           this.formData.append(controlName,(control.value.slice(0,-1)));    
  //         }
  //         else 
  //         {
  //           if(control.value)
  //           {
  //             this.formData.append(controlName,control.value);
  //           }


  //         }

  //       }
  //       else if(controlName=="has_emergency_contact")
  //         {
  //           if(control.value==true)
  //           {
  //             this.formData.append(controlName,'1');  
  //           }
  //           else
  //           {
  //             this.formData.append(controlName,'0');  
  //           }

  //       }
  //       else if(controlName=="is_portal")
  //         {
  //           var keyvalue=control.value;
  //           if(control.value==true)
  //           {
  //             this.formData.append(controlName,'1');  
  //           }
  //           else
  //           {
  //             this.formData.append(controlName,'0');  
  //           }

  //       }
  //       else if(controlName=="billingInfos")
  //       {
  //         debugger
  //         var index=0;
  //         this.billingInfoarray.controls.forEach((controlGroup: FormGroup) => {
  //           this.formData.append('billing_method', controlGroup.get('billing_method').value);
  //           this.formData.append('mode_of_payment', controlGroup.get('mode_of_payment').value);
  //           this.formData.append('billing_term_days', controlGroup.get('billing_term_days').value);
  //           index=index+1;

  //         });


  //       }
  //       else if(controlName=="photo_url")
  //       {
  //         if(control.value)
  //         {
  //           if(control.value.name)
  //           {
  //             this.formData.append(controlName, control.value);
  //           }

  //         }

  //       }
  //       else if(controlName=="rate_template_id")
  //       {
  //         if(control.value)
  //         {
  //           this.formData.append(controlName, control.value);
  //         }

  //       }
  //       else 
  //       {

  //         this.formData.append(controlName, control.value);
  //       }

  //     }
  //  }
  savingData;
  AddTechnician() {
    this.savingData = true;
    debugger
    this._technicianService
      .addTechnicians(this.technicianForm.value)
      .pipe(first())
      .subscribe(
        data => {
          debugger
          this._toastrService.success("Account Saved Successfully", 'Saving Account', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.savingData = false;
          this._router.navigateByUrl("apps/technician/list");
        },
        error => {

          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.savingData = false;
        }
      );
  }
  UpdateTechnician() {


    this.savingData = true;
    debugger
    this._technicianService
      .updateTechnicians(this.technicianForm.value)
      .pipe(first())
      .subscribe(
        data => {
          debugger
          if (this.technicianForm.value.id > 0) {
            this._toastrService.success("Account Updated Successfully", 'Account Updated', {
              positionClass: 'toast-top-right',
              toastClass: 'toast ngx-toastr',
              closeButton: true
            });


          }
          this.savingData = false;
          this._router.navigateByUrl("apps/technician/list");
        },
        error => {

          this._toastrService.error(error.error.message, 'Loading Error', {
            positionClass: 'toast-top-right',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.savingData = false;
        }
      );
  }
  //   LoadFormDataFromObj()
  //   {

  //   this.accountForm = this._formBuilder.group({
  //     photo_url: [this.accountObj.photo_url],
  //     account_type: [this.accountObj.account_type,Validators.required],
  //     office_location_id: [this.accountObj.office_location_id,Validators.required],
  //     priority_level: [this.accountObj.priority_level,Validators.required],
  //     name: [this.accountObj.name,Validators.required],
  //     billing_address: [this.accountObj.billing_address,Validators.required],
  //     room_suite: [this.accountObj.room_suite,Validators.required],
  //     email: [this.accountObj.email,Validators.required],
  //     phone_no: [this.accountObj.phone_no,Validators.required],
  //     secondary_phone_no: [this.accountObj.secondary_phone_no],
  //     state: [this.accountObj.state,Validators.required],
  //     city: [this.accountObj.city,Validators.required],
  //     zip_code: [this.accountObj.zip_code,Validators.required],
  //     status: [this.accountObj.status,Validators.required],
  //     bill_to: [this.accountObj.bill_to,Validators.required],
  //     notes: [this.accountObj.notes==null?"":this.accountObj.notes],
  //     rate_template_id: [this.accountObj.rate_template_id],
  //     is_portal: [this.accountObj.is_portal],
  //     contacts: this._formBuilder.array([]),
  //     users:this._formBuilder.array([]),
  //     documents:this._formBuilder.array([]),
  //     billingInfos:this._formBuilder.array([]),
  //   });

  //   if(this.accountObj.contacts!=null)
  //   {
  //     for (let i = 0; i < this.accountObj.contacts.length; i++) {
  //       this.addContactwithvalue(this.accountObj.contacts[i]);
  //      }
  //   }
  //   else 
  //   {
  //      this.addContact();
  //   }
  //   if(this.accountObj.user!=null)
  //   {
  //     debugger
  //     this.addUserwithvalue(this.accountObj.user);
  //   }
  //   if(this.accountObj.documents.length>0)
  //   {
  //    for (let i = 0; i < this.accountObj.documents.length; i++) {
  //      this.addDocumentWithVal(this.accountObj.documents[i]);
  //     }
  //   }
  //   if(this.accountObj.bill_to=="account")
  //   {
  //     debugger
  //       this.addBillingWithValue(this.accountObj)
  //  }
  //   }
  LoadAccount() {
    debugger
    this.sectionBlockUI.start();
    setTimeout(() => {
      this.sectionBlockUI.stop();
      console.log('BlockUI automatically stopped after 60 seconds.');
    }, 30000);
    // this._accountService
    // .GetAccountById(this.lastValue)
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     debugger
    //     this.accountObj=data.data;
    //     this.LoadFormDataFromObj();
    //     this.sectionBlockUI.stop();
    //   },
    //   error => {

    //     this._toastrService.error(error.error.message, 'Loading Error', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
    //     this.sectionBlockUI.stop();
    //  }
    //);
  }
  cities;
  loadingcities;
  isCityDisabled = true;
  LoadCities(stateId) {
    this.loadingcities = true;
    // this._accountService
    // .GetCities(stateId)
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     debugger
    //      this.cities=data.data;
    //      this.loadingcities=false;
    //      this.isCityDisabled=false;
    //   },
    //   error => {

    //     this._toastrService.error(error.error.message, 'Loading Error', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
    //     this.loadingcities=false;
    //   }
    // );
  }
  states;
  Loadstates() {

    // this._accountService
    // .GetStates()
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     debugger
    //      this.states=data.data;
    //      this.loading = false;
    //   },
    //   error => {

    //     this._toastrService.error(error.error.message, 'Loading Error', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
    //     this.loading = false;
    //   }
    // );
  }

  AccountTypesList;
  LoadAccountTypes() {

    // this._accountService
    // .GetAccountTypes()
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     debugger
    //      this.AccountTypesList=data.data;
    //   },
    //   error => {

    //     this._toastrService.error(error.error.message, 'Loading Error', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
    //   }
    // );
  }

  RateTemplates;
  LoadRateTemplates() {

    // this._accountService
    // .LoadRateTemplates()
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     debugger
    //      this.RateTemplates=data.data;
    //      this.TempRateList=this.RateTemplates;
    //      this.LoadTemplates('flat');
    //   },
    //   error => {

    //     this._toastrService.error(error.error.message, 'Loading Error', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
    //   }
    // );
  }
  TempRateList;
  LoadTemplates(type) {
    debugger
    this.TempRateList = this.RateTemplates.filter(x => x.rate_type == type);
  }
  rateTemplateObject
  //  LoadTemplateDetail()
  //  {
  //   if(this.f.rate_template_id.value)
  //   {
  //     this.sectionBlockUI.start();
  //     // debugger
  //     // this._rateservice
  //     // .GetrateTemplateById(this.f.rate_template_id.value)
  //     // .pipe(first())
  //     // .subscribe(
  //     //   data => {
  //     //     debugger

  //     //     this.rateTemplateObject=data.data;
  //     //     this.sectionBlockUI.stop();
  //     //   },
  //     //   error => {

  //     //     this._toastrService.error(error.error.message, 'Loading Error', {
  //     //       positionClass: 'toast-top-right',
  //     //       toastClass: 'toast ngx-toastr',
  //     //       closeButton: true
  //     //     });
  //     //     this.sectionBlockUI.stop();
  //     //   }
  //     // );
  //   }

  //  }

  //  EditTemplate()
  //  {
  //      let templateId=this.accountForm.get('rate_template_id').value;
  //      this._router.navigateByUrl("apps/rates/edit/"+templateId);

  //  }
  public selectedState: any;
  //  onStateChange()
  //  {
  //   debugger

  //     if(this.accountForm.get('state').value)
  //     {
  //       var stateId=this.states.filter(x=>x.name==this.accountForm.get('state').value)[0].id;
  //       this.LoadCities(stateId);
  //     }

  //  }

  BacktoList() {

  }

  ClickUpload() {
    this.fileuploader.nativeElement.click();
  }

  //Implementation with reactive forms v1.


  //Dynamic Contacts.
  //Contacts Related 
  // get contactArray() {
  //   return this.accountForm.get('contacts') as FormArray;
  // }
  // get userArray() {
  //   return this.accountForm.get('users') as FormArray;
  // }
  // get documentArray() {
  //   return this.accountForm.get('documents') as FormArray;
  // }
  // get billingInfoarray() {
  //   return this.accountForm.get('billingInfos') as FormArray;
  // }
  //  OnBillToChange()
  //  {
  //      debugger
  //      if(this.f.bill_to.value=="account")
  //      {
  //          this.addBilling();
  //      }
  //      else
  //      {
  //        this.removeBilling(0);
  //      }
  //  }
  //  addBilling()
  //  {
  //   this.billingInfoarray.push(this._formBuilder.group({
  //     billing_method: [,[Validators.required]],
  //     mode_of_payment: [,[Validators.required]],
  //     billing_term_days: [,[Validators.required]],
  //   }));
  //  }
  //  removeBilling(index)
  //  {
  //   this.billingInfoarray.removeAt(index);
  //  }
  //  addBillingWithValue(billing)
  //  {
  //   this.billingInfoarray.push(this._formBuilder.group({
  //     billing_method: [billing.billing_method,[Validators.required]],
  //     mode_of_payment: [billing.mode_of_payment,[Validators.required]],
  //     billing_term_days: [billing.billing_term_days,[Validators.required]],
  //   }));
  //  }

  RemoveContact(contact, index: number) {
    debugger
    if (this.accountObj.id > 0 && contact.value?.id) {
      this.sectionBlockUI.start();
      // this._accountService
      // .DeleteContact(this.accountObj.id,contact.value?.id)
      // .pipe(first())
      // .subscribe(
      //   data => {
      //     debugger
      //     this._toastrService.success('Contact Deleted Successfully', 'Contact Deleted!', {
      //       positionClass: 'toast-top-right',
      //       toastClass: 'toast ngx-toastr',
      //       closeButton: true
      //     });
      //     this.contactArray.removeAt(index);
      //     this.sectionBlockUI.stop();
      //    },
      //   error => {

      //     this._toastrService.error(error.error.message, 'Loading Error', {
      //       positionClass: 'toast-top-right',
      //       toastClass: 'toast ngx-toastr',
      //       closeButton: true
      //     });
      //     this.sectionBlockUI.stop();
      //   }
      // );
    }
    else {
      //this.contactArray.removeAt(index);
    }

  }
  //  addContact() {
  //   this.contactArray.push(this._formBuilder.group({
  //     first_name: ['',[Validators.required]],
  //     last_name: ['',[Validators.required]],
  //     phone_no: ['',[Validators.required]],
  //     secondary_phone_no: [''],
  //     email: ['',Validators.email],
  //   }));
  // }
  // addContactwithvalue(contact:any) {
  //   this.contactArray.push(this._formBuilder.group({
  //     id: [contact.id],
  //     first_name: [contact.first_name,[Validators.required]],
  //     last_name: [contact.last_name,[Validators.required]],
  //     phone_no: [contact.phone_no,Validators.required],
  //     secondary_phone_no: [contact.secondary_phone_no],
  //     email: [contact.email,Validators.email],
  //   }));
  // }

  onInput(event: InputEvent): void {

    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedValue = this.formatPhoneNumber(value);
    input.value = formattedValue;
  }

  formatPhoneNumber(phoneNumber: string): string {

    if (phoneNumber.length >= 10) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
    return phoneNumber;
  }
  // removeUser(index:number)
  // {
  //   this.userArray.removeAt(index);
  // }
  // onChkUserChange(event: any): void 
  // {
  //     debugger
  //     var chkValue=this.accountForm.get("is_portal").value;
  //     if(chkValue==true)
  //     {
  //       if(this.userArray.length==0)
  //       {
  //         this.addUser();
  //       }

  //     }
  //     else 
  //     {
  //       this.removeUser(0);
  //     }
  // }
  // addUser() {
  //   this.userArray.push(this._formBuilder.group({
  //     username: ['',Validators.required],
  //     email: ['',[Validators.required,Validators.email]],
  //     password: ['',Validators.required],
  //   }));
  // }
  // addUserwithvalue(user:any) {
  //   if(this.accountForm.get("is_portal").value==1)
  //   {
  //     this.userArray.push(this._formBuilder.group({
  //       username: [user.name,Validators.required],
  //       email: [user.email,[Validators.required,Validators.email]],
  //       password: [user.password],
  //     }));
  //   }

  // }
  // addDocument() {
  //   this.documentArray.push(this._formBuilder.group({
  //     title: ['',Validators.required],
  //     file: [null,Validators.required],
  //     description: [''],
  //   }));
  // }

  RemoveDoc(doc, index: number) {
    debugger
    if (this.accountObj.id > 0 && doc.value?.id) {
      this.sectionBlockUI.start();
      //  this._accountService
      //  .DeleteDocument(this.accountObj.id,doc.value?.id)
      //  .pipe(first())
      //  .subscribe(
      //    data => {
      //      debugger
      //      this._toastrService.success('Contact Deleted Successfully', 'Contact Deleted!', {
      //        positionClass: 'toast-top-right',
      //        toastClass: 'toast ngx-toastr',
      //        closeButton: true
      //      });
      //      this.documentArray.removeAt(index);
      //      this.sectionBlockUI.stop();
      //     },
      //    error => {

      //      this._toastrService.error(error.error.message, 'Loading Error', {
      //        positionClass: 'toast-top-right',
      //        toastClass: 'toast ngx-toastr',
      //        closeButton: true
      //      });
      //      this.sectionBlockUI.stop();
      //    }
      //  );
    }
    else {
      //this.documentArray.removeAt(index);
    }

  }
  // addDocumentWithVal(doc:any) {
  //   debugger
  //   this.documentArray.push(this._formBuilder.group({
  //     id: [doc.id,Validators.required],
  //     title: [doc.title,Validators.required],
  //     file: [doc.files[0]],
  //     description: [doc.description],
  //   }));
  // }
  selectedFiles: File[] = [];

  // onFileSelected(event: any,index:number) {
  //  debugger
  //  const files: FileList = event.target.files;
  //  for (let i = 0; i < files.length; i++) {
  //      this.selectedFiles.push(files[i]);
  //  }
  //  var control = this.documentArray.at(index) as FormControl;

  //  // Assign the selected file to the FormControl
  //  control.get('file').setValue(this.selectedFiles[0]);
  // }


  // removeFile(index:number) {
  // debugger
  // var control = this.documentArray.at(index) as FormControl;
  // // Assign the selected file to the FormControl
  // control.get('file').setValue(null);
  // this._toastrService.success("File Removed", 'File Removed', {
  //   positionClass: 'toast-top-right',
  //   toastClass: 'toast ngx-toastr',
  //   closeButton: true
  // });

  // }
  @BlockUI() sectionBlockUI: NgBlockUI;
  BasicInfoFilled: boolean = false;
  BillingInfoFilled = false;
  ContactsInfoFilled: boolean = false;
  RatesInfoFilled: boolean = false;
  PortalInfoFilled: boolean = false;
  DocsInfoFilled: boolean = false;
  NotesInfoFilled: boolean = false;


  BasicFormControl: any = [];
  ContactsFormControl: any = [];
  RatesFormControl: any = [];
  NotesFormControl: any = [];
  BillingFormControl: any = [];

  // CheckBasicInfoFilled()
  // {
  //  this.BasicFormControl=[];
  //  this.ContactsFormControl=[];
  //  this.RatesFormControl=[];
  //  this.NotesFormControl=[];
  // for (const controlName of Object.keys(this.accountForm.controls)) 
  // {
  //    var control = this.accountForm.get(controlName);
  //    if(controlName=="office_location_id" || controlName=="priority_level" || controlName=="name" || 
  //      controlName=="billing_address"  || controlName=="room_suite" || controlName=="phone_no" || controlName=="state"
  //   || controlName=="city" || controlName=="zip_code" || controlName=="billing_term_days" || controlName=="billing_method" 
  //   || controlName=="payment_method" || controlName=="status" || controlName=="status" || controlName=="email"
  //    )
  //    {

  //      if (!this.BasicFormControl.includes(controlName)) {
  //        this.BasicFormControl.push(control);
  //      } else {
  //        this.BasicFormControl.remove(control);
  //      }
  //      const hasValue = this.BasicFormControl.every(control => {
  //        return control.value !== null && control.value !== undefined && control.value !== '';
  //      });

  //      if(hasValue)
  //      {
  //          this.BasicInfoFilled=true;
  //      }
  //      else {
  //        this.BasicInfoFilled=false;
  //      }
  //    }
  //    else if(controlName=="contacts")
  //    {

  //      const formGroup = this.accountForm.get('contacts') as FormGroup;
  //      const allControlsHaveValues = Object.keys(formGroup.controls).every(controlName => {
  //        const control = formGroup.get(controlName);
  //        return control.valid; // Check if the control is valid (has a value)
  //      });

  //      if(allControlsHaveValues)
  //      {
  //          this.ContactsInfoFilled=true;
  //      }
  //      else {
  //        this.ContactsInfoFilled=false;
  //      }

  //    }
  //    else if(controlName=="documents")
  //    {

  //      const formGroup = this.accountForm.get('documents') as FormGroup;
  //      const allControlsHaveValues = Object.keys(formGroup.controls).every(controlName => {
  //        const control = formGroup.get(controlName);
  //        return control.valid; // Check if the control is valid (has a value)
  //      });

  //      if(allControlsHaveValues)
  //      {
  //          this.DocsInfoFilled=true;
  //      }
  //      else {
  //        this.DocsInfoFilled=false;
  //      }

  //    }
  //    else if(controlName=="users")
  //    {

  //      const formGroup = this.accountForm.get('users') as FormGroup;
  //      const allControlsHaveValues = Object.keys(formGroup.controls).every(controlName => {
  //        const control = formGroup.get(controlName);
  //        return control.valid; // Check if the control is valid (has a value)
  //      });

  //      if(allControlsHaveValues)
  //      {
  //          this.PortalInfoFilled=true;
  //      }
  //      else {
  //        this.PortalInfoFilled=false;
  //      }

  //    }
  //   else if(controlName=="notes")
  //    {
  //     if (!this.NotesFormControl.includes(controlName)) {
  //       this.NotesFormControl.push(control);
  //     } else {
  //       this.NotesFormControl.remove(control);
  //     }
  //      this.NotesFormControl.push(control);
  //        const hasValue = this.NotesFormControl.every(control => {
  //          return control.value !== null && control.value !== undefined && control.value !== '';
  //        });

  //        if(hasValue)
  //        {
  //            this.NotesInfoFilled=true;
  //        }
  //        else {
  //          this.NotesInfoFilled=false;
  //        }
  //    }
  //    else if(controlName=="rate_template_id")
  //    {
  //     if (!this.RatesFormControl.includes(controlName)) {
  //       this.RatesFormControl.push(control);
  //     } else {
  //       this.RatesFormControl.remove(control);
  //     }
  //      this.RatesFormControl.push(control);
  //        const hasValue = this.RatesFormControl.every(control => {
  //          return control.value !== null && control.value !== undefined && control.value !== '';
  //        });

  //        if(hasValue)
  //        {
  //            this.RatesInfoFilled=true;
  //        }
  //        else {
  //          this.RatesInfoFilled=false;
  //        }
  //    }
  //    else if(controlName=="bill_to" || controlName=="billingInfos")
  //    {

  //     const formGroup = this.accountForm.get('billingInfos') as FormGroup;
  //     const allControlsHaveValues = Object.keys(formGroup.controls).every(controlName => {
  //       const control = formGroup.get(controlName);
  //       return control.valid; // Check if the control is valid (has a value)
  //     });

  //     if (!this.BillingFormControl.includes(controlName)) {
  //       this.BillingFormControl.push(control);
  //     } else {
  //       this.BillingFormControl.remove(control);
  //     }
  //      this.BillingFormControl.push(control);
  //        const hasValue = this.BillingFormControl.every(control => {
  //          return control.value !== null && control.value !== undefined && control.value !== '';
  //        });

  //        if(hasValue && allControlsHaveValues)
  //        {
  //            this.BillingInfoFilled=true;
  //        }
  //        else {
  //          this.BillingInfoFilled=false;
  //        }
  //    }
  //  }

  // }
  // private NavigateToInvalidControl(){
  //   debugger
  //   const formControls = this.accountForm.controls;
  //   const firstInvalidControlName = Object.keys(formControls).find(
  //     controlName => formControls[controlName].invalid
  //   );

  //   if (firstInvalidControlName) {
  //     const element = document.getElementById(firstInvalidControlName);
  //     if (element) {
  //       if(firstInvalidControlName=="account_type" || firstInvalidControlName=="office_location_id" ||
  //        firstInvalidControlName=="level_priority" || firstInvalidControlName=="state" || firstInvalidControlName=="city" || firstInvalidControlName=="status")
  //       {
  //         this.NavigateToinformation();
  //       }
  //       else 
  //       {
  //         if(firstInvalidControlName=="bill_to")
  //         {
  //           this.NavigateToBilling();
  //         }
  //         else 
  //         {
  //           element.focus();
  //         }

  //       }

  //     }
  //     else 
  //     {
  //       if(firstInvalidControlName=="billingInfos" || firstInvalidControlName=="bill_to")
  //       {
  //           this.NavigateToBilling();
  //       }
  //       if(firstInvalidControlName=="users"){
  //         this.NavigateToportals();
  //       }
  //       if(firstInvalidControlName=="contacts"){
  //         this.NavigateToContact();
  //       }
  //       if(firstInvalidControlName=="documents"){
  //         this.NavigateTodocuments();
  //       }
  //     }
  //    } else {
  //      // All controls are valid, proceed with form submission logic
  //    }
  // }


  ConfirmTextOpenForContact(contact, id) {
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
        this.RemoveContact(contact, id);
      }
    });
  }
  ConfirmTextOpenForDoc(doc, id) {
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
        this.RemoveDoc(doc, id);
      }
    });
  }
  // ConfirmTextOpenForFile(id) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#7367F0',
  //     cancelButtonColor: '#E42728',
  //     confirmButtonText: 'Yes, delete it!',
  //     customClass: {
  //       confirmButton: 'btn btn-primary',
  //       cancelButton: 'btn btn-danger ml-1'
  //     }
  //   }).then((result) => {
  //     if (result.value) {
  //        this.removeFile(id);
  //     }
  //   });
  // }
  selectedLogo;
  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.technicianForm.get('photo_url').setValue(file);
      // Display the selected image
      this.readAndDisplayImage(file);
    }

  }
  OpenLogoUploader() {
    this.logouploader.nativeElement.click();
  }
  readAndDisplayImage(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedLogo = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}
