import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AccountsService } from 'app/auth/service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';

import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { TechnicianService } from '../technician.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-technician-view',
  templateUrl: './technician-view.component.html',
  styleUrls: ['./technician-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TechnicianViewComponent implements  OnInit, OnDestroy {

  // public
  public contentHeader: object;
  public url = this.router.url;
  public lastValue;
  public data;
  public ColumnMode = ColumnMode;
  public techtypes : any []=[];
  public rows:any[]=[
    { id:1,type: 'Sedan',pickupcharges:2,waitcharges:12,milecharges:12,noshowfee:20,afterhoursfee:12},
    { id:2,type: 'SUV (Sports Utility Vehicle)',pickupcharges:2,waitcharges:12,milecharges:12,noshowfee:20,afterhoursfee:12},
    { id:3,type: 'Hatchback',pickupcharges:2,waitcharges:12,milecharges:12,noshowfee:20,afterhoursfee:12},
    { id:4,type: 'Coupe',pickupcharges:2,waitcharges:12,milecharges:12,noshowfee:20,afterhoursfee:12},
    { id:5,type: 'Convertible',pickupcharges:2,waitcharges:12,milecharges:12,noshowfee:20,afterhoursfee:12},
    { id:6,type: 'Minivan',pickupcharges:2,waitcharges:12,milecharges:12,noshowfee:20,afterhoursfee:12},
    
  ];
  public documents:any[]=[
    { id:1,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/pdf.svg'},
    { id:2,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/excel.svg'},
    { id:3,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/photo.svg'},
    { id:4,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/word.svg'},
    { id:5,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/pdf.svg'},
    { id:6,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/word.svg'},
    { id:7,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/excel.svg'},
    { id:8,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/pdf.svg'},
    { id:9,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/word.svg'},
    { id:10,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/pdf.svg'},
    { id:11,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/pdf.svg'},
    { id:12,name: 'Document Name',description:'Document Description',expiry:'08/01/2023',file:'assets/img/excel.svg',},
    
  ];
  public calllogs:any[]=[
    { id:1,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:2,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:3,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:4,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:5,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:6,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'47 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:7,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:8,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:9,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'49 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:10,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Not Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:11,from: 'Yasib',to:'Usama',type:'Incomming Call',datetime:'July 18,2023 8:28pm',duration:'45 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    { id:12,from: 'Yasib',to:'Usama',type:'Outgoing Call',datetime:'July 18,2023 8:28pm',duration:'5 mins',disposition:'Answered',audio:'assets/img/audio.svg',file:'assets/img/notes.svg'},
    
  ];
  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserViewService} _userViewService
   */
  constructor(private router: Router,private _technicianService:TechnicianService,private _toastrService: ToastrService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'View Technician',
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
            name: 'Technician',
            isLink: true,
            link: '/apps/patients/manage-patients'
          },
          {
            name: 'View Technician',
            isLink: false
          }
        ]
      }
    };
    this.LoadGenders();
    this.LoadPatient();
   
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  loading;
  credntials:any[];
  LoadPatient()
  {
  this.sectionBlockUI.start();
  this._technicianService
  .getTechnicianById(this.lastValue)
  .pipe(first())
  .subscribe(
    data => {
      debugger
       this.data=data.result;
       this.loading = false;
       this.sectionBlockUI.stop();
    },
    error => {
      
      this._toastrService.error(error.error.message, 'Loading Error', {
        positionClass: 'toast-top-right',
        toastClass: 'toast ngx-toastr',
        closeButton: true
      });
      this.loading = false;
      this.sectionBlockUI.stop();
    }
  );
 }
 onInput(event: InputEvent): void {
  debugger
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
genderList;
LoadGenders()
{
 
//  this._patientService
//  .GetGenders()
//  .pipe(first())
//  .subscribe(
//    data => {
//      debugger
//       this.genderList=data.data;
//      this.loading = false;
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

objectToFormData(obj: any): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      if (Array.isArray(value)) {
        let count=0;
        // If the value is an array, append each item separately
        for (const item of value) {
          debugger
          if(key=="patientInsurances")
          {
            for (const subkey in item)
            {
              if (item.hasOwnProperty(subkey)) {
                const subvalue = item[subkey];
                if(subkey!="insurance_card_front_image" && subkey!="insurance_card_back_image")
                {
                  if(subkey=="is_primary_insurance" || subkey=="insurance_same")
                  {
                    if(subvalue==true)
                    {
                      formData.append("insurances["+count+"]"+"["+subkey+"]", '1');
                    }
                    else 
                    {
                      formData.append("insurances["+count+"]"+"["+subkey+"]", '0');
                    }
                    
                  }
                  else if(subkey=="subscriber_date_of_birth")
                  {
                     if(subvalue)
                     {
                      formData.append("insurances["+count+"]"+"["+subkey+"]", subvalue);
                     }
                  }
                  else if(subkey=="subscriber_phone")
                  {
                     if(subvalue)
                     {
                      formData.append("insurances["+count+"]"+"["+subkey+"]", subvalue);
                     }
                  }
                  else 
                  {
                    formData.append("insurances["+count+"]"+"["+subkey+"]", subvalue);
                  }
                  
                }
               
                
              }
              
            }
            
          }
          count++;
        }
      } else {
        // If it's a single value, append it
        if(key=="user")
        {
          debugger
          formData.append("user_name", value.username);
          formData.append("user_email", value.email);  
        }
        else if(key=="is_auth")
        {
          if(value==true)
          {
            formData.append(key, '1');
          }
          else
          {
            formData.append(key, '0');
          }
        }

         else 
        {
          if(key!="photo_url" && value!=null)
          {
            formData.append(key, value);
          }
          
        }
        
      }
    }
  }

  return formData;
}
UpdatePatient()
{
 
//  this._patientService
//  .quickupdatePatient(this.objectToFormData(this.data),this.data.id)
//  .pipe(first())
//  .subscribe(
//    data => {
//      debugger
//      this._toastrService.success("Client Info Updated", 'Success', {
//       positionClass: 'toast-top-right',
//       toastClass: 'toast ngx-toastr',
//       closeButton: true
//     });
//    },
//    error => {
     
//      this._toastrService.error(error.error.message, 'Error', {
//        positionClass: 'toast-top-right',
//        toastClass: 'toast ngx-toastr',
//        closeButton: true
//      });
//      this.loading = false;
//    }
//  );
}
RemoveDoc(doc,index:number)
  {
   debugger
  //  if(this.data.id>0 && doc.id)
  //  {
  //    this.sectionBlockUI.start();
  //    this._patientService
  //    .DeleteDocument(this.data.id,doc.id)
  //    .pipe(first())
  //    .subscribe(
  //      data => {
  //        debugger
  //        this._toastrService.success('Document Deleted Successfully', 'Document Deleted!', {
  //          positionClass: 'toast-top-right',
  //          toastClass: 'toast ngx-toastr',
  //          closeButton: true
  //        });
  //        this.data.documents=this.data.documents.filter(item => item.id !== doc.id);
  //        this.sectionBlockUI.stop();
  //       },
  //      error => {
         
  //        this._toastrService.error(error.error.message, 'Loading Error', {
  //          positionClass: 'toast-top-right',
  //          toastClass: 'toast ngx-toastr',
  //          closeButton: true
  //        });
  //        this.sectionBlockUI.stop();
  //      }
  //    );
  //  }
  //  else 
  //  {
  //   this.data.documents=this.data.documents.filter(item => item.id !== doc.id);
  //  }
   
  }
  ConfirmTextOpenForDoc(doc) {
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
        let index=this.data.documents.findIndex(x=>x.id==doc.id);
         this.RemoveDoc(doc,index);
      }
    });
   }
   RemoveCard(card)
  {
   debugger
   if(this.data.id>0 && card?.id)
   {
    //  this.sectionBlockUI.start();
    //  this._patientService
    //  .DeleteCard(this.data.id,card?.id)
    //  .pipe(first())
    //  .subscribe(
    //    data => {
    //      debugger
    //      this._toastrService.success('Card Details Deleted Successfully', 'Card Deleted!', {
    //        positionClass: 'toast-top-right',
    //        toastClass: 'toast ngx-toastr',
    //        closeButton: true
    //      });
    //      this.data.payment_profiles=data?.payment_profiles.filter(x=>x.id==card.id);
    //      this.sectionBlockUI.stop();
    //     },
    //    error => {
         
    //      this._toastrService.error(error.error.message, 'Card Deletion Error', {
    //        positionClass: 'toast-top-right',
    //        toastClass: 'toast ngx-toastr',
    //        closeButton: true
    //      });
    //      this.sectionBlockUI.stop();
    //    }
    //  );
   }
   else 
   {
     this.data.payment_profiles=this.data.payment_profiles.filter(x=>x.id==card.id);
   }
   
  }
  RemoveInsurance(insurance)
  {
   debugger
   if(this.data.id>0 && insurance?.id)
   {
     this.sectionBlockUI.start();
    //  this._patientService
    //  .DeleteInsurance(this.data.id,insurance.id)
    //  .pipe(first())
    //  .subscribe(
    //    data => {
    //      debugger
    //      this._toastrService.success('Insurance Deleted Successfully', 'Insurance Deleted!', {
    //        positionClass: 'toast-top-right',
    //        toastClass: 'toast ngx-toastr',
    //        closeButton: true
    //      });
    //      this.data.patientInsurances=this.data.patientInsurances.filter(x=>x.id==insurance?.id)
    //      this.sectionBlockUI.stop();
    //     },
    //    error => {
         
    //      this._toastrService.error(error.error.message, 'Insurance Deletion Error', {
    //        positionClass: 'toast-top-right',
    //        toastClass: 'toast ngx-toastr',
    //        closeButton: true
    //      });
    //      this.sectionBlockUI.stop();
    //    }
    //  );
   }
   else 
   {
    this.data.patientInsurances=this.data.patientInsurances.filter(x=>x.id==insurance?.id)
   }
   
  }
   ConfirmTextOpenForCard(card) {
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
         this.RemoveCard(card);
      }
    });
   }
   ConfirmTextOpenForInsurance(insurance) {
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
         this.RemoveInsurance(insurance);
      }
    });
   }
 @BlockUI() sectionBlockUI: NgBlockUI;
}


