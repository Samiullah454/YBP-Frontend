import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { first } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { debug } from "console";
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { CacheService } from "app/auth/service/cache.service";
import { environment } from "environments/environment";
import { ContactListService, CreateContactDto } from "../../contact-list/contact-list.service";

@Component({
  selector: "app-add-group",
  templateUrl: "./addgroup.component.html",
  styleUrls: ["./addgroup.component.scss"],
})
export class AddGroupComponent implements OnInit {
  @Input() Role: any;
  @Output() sendDataToParent: EventEmitter<any> = new EventEmitter<any>();

  tempData: any;
  RoleName: string;
  selectedPermissionIds: number[] = [];
  permissionschkList: chkobj[];

  public addRoleForm: UntypedFormGroup;
  public Saving: boolean = false;
  public LoadingData: boolean;
  public LoadedData: boolean = false;
  public SelectedContactDtoList: CreateContactDto[] = [];
  public currentHost = window.location.host;
  public parts = this.currentHost.split(".");
  public tenant = this.parts.length > 1 ? this.parts[0].trim() : "azlaan";
  public submitted = false;

  constructor(
    private _contactListService: ContactListService,
    private _toastrService: ToastrService,
    private cacheService: CacheService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  get f() {
    return this.addRoleForm.controls;
  }

  ngOnInit(): void {
    if (this.Role == undefined) {
      this.addRoleForm = this._formBuilder.group({
        rolename: ["", [Validators.required]],
      });
      this.LoadingData = true;
      this.RoleName = "";
      this._contactListService
        .getContactsList()
        .pipe(first())
        .subscribe(
          (data) => {
            this.tempData = data;
            this.LoadingData = false;
            this.LoadedData = true;
          },
          (error) => {
            this._toastrService.error(
              error.error.message,
              "Contact List Fetch Error",
              {
                positionClass: "toast-top-left",
                toastClass: "toast ngx-toastr",
                closeButton: true,
              }
            );
            this.LoadingData = false;
            this.LoadedData = true;
          }
        );
    } else {
      this.LoadingData = true;
      this.RoleName = this.Role.name;
      this.selectedPermissionIds = this.Role.permissions;
      this.addRoleForm = this._formBuilder.group({
        rolename: [this.RoleName, [Validators.required]],
      });
      this._contactListService
        .getContactsList()
        .pipe(first())
        .subscribe(
          (data) => {
            this.tempData = data;
            this.LoadingData = false;
            this.LoadedData = true;
          },
          (error) => {
            this._toastrService.error(
              error.error.message,
              "Contact List Fetch Error",
              {
                positionClass: "toast-top-left",
                toastClass: "toast ngx-toastr",
                closeButton: true,
              }
            );
            this.LoadingData = false;
            this.LoadedData = true;
          }
        );
    }
  }

  onSubmit() {
    debugger;
    this.Saving = true;
    this.submitted = true;
    const Value = this.f.rolename.value;

    if (this.addRoleForm.invalid) {
      this.Saving = false;
      return;
    }

    if (this.Role == undefined) {
      debugger
      this._contactListService
        .createGroup(this.f.rolename.value, this.SelectedContactDtoList)
        .pipe(first())
        .subscribe(
          (data) => {
            debugger
            this.AddRoletoCache(data);
            this.sendData();
            this.Saving = false;
            Swal.fire({
              title: "Role Saved!",
              text: "Role Saved Successfully",
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          (error) => {
            this.Saving = false;
            Swal.fire({
              title: "Role Saving error!",
              text: error.error.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        );
    } 
    else 
    {
      debugger
      this._contactListService
        .updateGroupContacts(this.Role.id, this.RoleName, this.SelectedContactDtoList)
        .pipe(first())
        .subscribe(
          (data) => {
            debugger
            this.sendData();
            this.Saving = false;
            Swal.fire({
              title: "Group Updated!",
              text: data.message,
              icon: "success",
              confirmButtonText: "OK",
            });
          },
          (error) => {
            this.Saving = false;
            Swal.fire({
              title: "Group Updated!",
              text: error.error.message,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        );
    }
  }

  onCheckboxChange(contact) {
    const indexToRemove = this.SelectedContactDtoList.findIndex(
      (obj) => obj == contact
    );
    if (indexToRemove !== -1) {
      this.SelectedContactDtoList.splice(indexToRemove, 1);
    } else {
      this.SelectedContactDtoList.push(contact);
    }
  }

  sendData(): void {
    this._contactListService
      .getGroupList()
      .pipe(first())
      .subscribe(
        (data) => {
          this.sendDataToParent.emit(data);
        },
        (error) => {
          this._toastrService.error(error.error.message, "Login Error", {
            positionClass: "toast-top-left",
            toastClass: "toast ngx-toastr",
            closeButton: true,
          });
        }
      );
  }

  isChecked(contact: CreateContactDto): boolean {
    return this.SelectedContactDtoList.includes(contact);
  }

  AddRoletoCache(newItem) {
    const cachedList = this.cacheService.get(
      `${environment.apiUrl}/v1/` + this.tenant + `/roles`
    );

    if (cachedList) {
      // Update the cache with the new list
      cachedList.data.push(newItem);
      this.cacheService.set(
        `${environment.apiUrl}/v1/` + this.tenant + `/roles`,
        cachedList
      );
    }
  }
}

interface Permission {
  id: number;
}

interface chkobj {
  id: number;
  name: string;
  checked: boolean;
}
