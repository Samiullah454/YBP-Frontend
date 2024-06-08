import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

//import { driverTypeModel } from 'app/auth/models/Driver/driverTypeModel';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from 'app/auth/service';


@Component({
  selector: 'app-add-technician-type',
  templateUrl: './add-technician-type.component.html',
  styleUrls: ['./add-technician-type.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AddTechnicianTypeComponent implements OnInit {
  @Output() sendDataToCategoriesList: EventEmitter<any> = new EventEmitter<any>();
  tempData: any;
  public CategoryForm: FormGroup;
  public Saving:boolean=false;
  public LoadingData:boolean;
  public LoadedData:boolean=false;
  @Input() driverType: any;
  public currentHost = window.location.host;
  public parts=this.currentHost.split('.');
  public tenant=this.parts.length>1?this.parts[0].trim():"azlaan";
  public submitted = false;

  constructor(private _toastrService: ToastrService,private _formBuilder: UntypedFormBuilder,private _accountService:AccountsService,private modalService: NgbModal) { }
  get f() {
    return this.CategoryForm.controls;
  }
  ngOnInit(): void {
    debugger
    if(this.driverType==undefined)
    {
      this.CategoryForm = this._formBuilder.group({
        name: ['', [Validators.required]],
      });
      this.LoadingData=true;
    }
    else 
    {
      
      this.LoadingData=true;
      this.CategoryForm = this._formBuilder.group({
        name: [this.driverType.name, [Validators.required]],
      });
     
    }
    
    
  
  }
  onSubmit()
  {
    
    this.Saving=true;
    this.submitted = true;
    if (this.CategoryForm.invalid) {
      this.Saving=false;
      return;
    }
    this.BindObj();
    this.AddUpdateDriverType();
  }
  BindObj()
  {
    let drivertypeId=0;
    if(this.driverType!=undefined && this.driverType.id!=undefined)
    {
        drivertypeId=this.driverType.id;
    }
     //this.driverType=new driverTypeModel();
     this.driverType.id=drivertypeId;
     this.driverType.name=this.f.name.value;
  }
  sendData(): void {
    
    // this._accountService
    // .GetAllAccountTypes()
    // .pipe(first())
    // .subscribe(
    //   data => {
    //     this.sendDataToCategoriesList.emit(data);
    //     this.Saving=false;
    //     this.closeModel();
    //   },
    //   error => {
        
    //     this._toastrService.error(error.error.message, 'Loading Types Error', {
    //       positionClass: 'toast-top-right',
    //       toastClass: 'toast ngx-toastr',
    //       closeButton: true
    //     });
        
    //   }
    // );
    
  }
  
  AddUpdateDriverType()
   {
    // this.Saving=true;
    // if(this.driverType.id>0)
    // {
    //   this._accountService
    //   .UpdateAccountTypes(this.objectToFormData(this.driverType),this.driverType.id)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this._toastrService.success("Account Type Updated Successfully!", 'Account Type', {
    //         positionClass: 'toast-top-right',
    //         toastClass: 'toast ngx-toastr',
    //         closeButton: true
    //       });
         
    //       this.sendData();
          
    //     },
    //     error => {
          
    //       this._toastrService.error(error.error.message, 'Account Type', {
    //         positionClass: 'toast-top-right',
    //         toastClass: 'toast ngx-toastr',
    //         closeButton: true
    //       });
    //       this.Saving=false;
    //     }
    //   );
    // }
    // else 
    // {
    //   this._accountService
    //   .AddAccountType(this.objectToFormData(this.driverType))
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this._toastrService.success("Account Type Saved Successfully!", 'Account Type', {
    //         positionClass: 'toast-top-right',
    //         toastClass: 'toast ngx-toastr',
    //         closeButton: true
    //       });
         
    //       this.sendData();
          
    //     },
    //     error => {
          
    //       this._toastrService.error(error.error.message, 'Account Type', {
    //         positionClass: 'toast-top-right',
    //         toastClass: 'toast ngx-toastr',
    //         closeButton: true
    //       });
    //       this.Saving=false;
    //     }
    //   );
    // }
   }
   closeModel()
   {
     this.modalService.dismissAll();
   }

   objectToFormData(obj: any): FormData {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  }

}
