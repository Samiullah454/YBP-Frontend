import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { UserService } from 'app/auth/service';
import { CreateUserDto, RoleDto, UserServiceProxy } from 'app/main/pages/authentication/onborading-s1/boilerservice';
import { ToastrService } from 'ngx-toastr';
import { ContactListService, CreateContactDto } from '../contact-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-contact-sidebar',
  templateUrl: './new-contact-sidebar.component.html'
})
export class NewContactSidebarComponent implements OnInit {

  @Input() inputObj:any;
  @Output() dataEvent = new EventEmitter<string>();
  
  contact = new CreateContactDto();
  public selectMultiSelected;

  constructor(
    private _coreSidebarService: CoreSidebarService, 
    public _contactService: ContactListService,
    private _toastrService: ToastrService,
    private modalService: NgbModal) {}

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  sendData() {
    const dataToSend = 'Data from child component';
    this.dataEvent.emit(dataToSend);
  }

  submit(form) {
    if (form.valid) {
      debugger
      this.contact.mobileNumber = this.contact.mobileNumber.replace(/\D/g, '')
      if(!this.contact.mobileNumber.startsWith("+1"))
      {
        this.contact.mobileNumber = '+1'+this.contact.mobileNumber;
      }
      this.contact.fullName=this.contact.firstName+" "+this.contact.lastName;
      this.contact.avatar="assets/images/avatars/2.png";
      this.contact.status="online";
      this.contact.createdAt = new Date().toDateString();
      this.contact.about=this.contact.fullName+ " is a Contact list member."
      this._contactService.create(this.contact).subscribe(
        data => {
          var msg="";
          if(this.contact.id>0)
          {
             msg="Contact Updated"
          }
          else 
          {
            msg="Contact Saved";
          }
          this._toastrService.success(msg+" Succesfully!", msg, {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
          this.sendData();          
        },
        error => {
          this._toastrService.error(error.message, 'Contact Error', {
            positionClass: 'toast-top-left',
            toastClass: 'toast ngx-toastr',
            closeButton: true
          });
        }
      );      
    }    
  }

  close() {
    this.modalService.dismissAll();    
  }

  ngOnInit(): void {
    if(this.inputObj!=null)
    {
      this.contact.id=this.inputObj.id;
      this.contact.firstName=this.inputObj.firstName;
      this.contact.lastName=this.inputObj.lastName;
      this.contact.mobileNumber= this.formatPhoneNumber(this.inputObj.mobileNumber);
      this.contact.source=this.inputObj.source;
      this.contact.fullName=this.inputObj.fullName;

      this.contact.email=this.inputObj.email;
      this.contact.title=this.inputObj.title;
      this.contact.middleName=this.inputObj.middleName;
      this.contact.suffix=this.inputObj.suffix;
      this.contact.billingAddressLine1=this.inputObj.billingAddressLine1;
      this.contact.billingAddressLine2=this.inputObj.billingAddressLine2;
      this.contact.billingAddressCity=this.inputObj.billingAddressCity;
      this.contact.billingAddressState=this.inputObj.billingAddressState;
      this.contact.billingAddressPostalCode=this.inputObj.billingAddressPostalCode;
      this.contact.shippingAddressLine1=this.inputObj.shippingAddressLine1;
      this.contact.shippingAddressLine2=this.inputObj.shippingAddressLine2;
      this.contact.shippingAddressCity=this.inputObj.shippingAddressCity;
      this.contact.shippingAddressState=this.inputObj.shippingAddressState;
      this.contact.shippingAddressPostalCode=this.inputObj.shippingAddressPostalCode;
      this.contact.company=this.inputObj.company;
      this.contact.website=this.inputObj.website;
      this.contact.companyEmail=this.inputObj.companyEmail;
      this.contact.createdAt=this.inputObj.createdAt;


      this.contact.role=this.inputObj.role;
      this.contact.about=this.inputObj.about;
      this.contact.avatar=this.inputObj.avatar;
      this.contact.status=this.inputObj.status;
    } 

  }

  limitInputLength(event: Event) {

    let phoneNumber = (event.target as HTMLInputElement).value.replace(/\D/g, '');

    if (phoneNumber.length > 10){
      phoneNumber = phoneNumber.slice(0, 10);     
    }
    if (phoneNumber.length <= 3) {
      phoneNumber = phoneNumber.replace(/^(\d{0,3})/, '($1)');      
    }
    else if (phoneNumber.length <= 6) {
      phoneNumber = phoneNumber.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    }
    else if (phoneNumber.length <= 10) {
      phoneNumber = phoneNumber.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }

    this.contact.mobileNumber = phoneNumber;
    (event.target as HTMLInputElement).value = phoneNumber;
  }

  formatPhoneNumber(phoneNumber: string): string {
    if (!phoneNumber || isNaN(Number(phoneNumber))) {
      return phoneNumber;
    }

    let cleaned = phoneNumber.replace(/\D/g, '');
    if(cleaned.startsWith("1"))
    {
      cleaned = cleaned.substring(1);
    }
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    return phoneNumber;
  }
  
}
