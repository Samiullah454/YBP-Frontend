import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { Subject } from "rxjs";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { first, takeUntil } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { environment } from "environments/environment";
import { CacheService } from "app/auth/service/cache.service";
import { ContactListService } from "../contact-list/contact-list.service";
import { AuthenticationService } from "app/auth/service";

@Component({
  selector: "app-contact-groups",
  templateUrl: "./contact-groups.component.html",
  styleUrls: ["./contact-groups.component.scss"],
})
export class ContactGroupsComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  LoadingData: boolean = true;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  public tempData = [];
  public userData = [];
  public rows;
  public currentHost = window.location.host;
  public parts = this.currentHost.split(".");
  public tenant = this.parts.length > 1 ? this.parts[0].trim() : "azlaan";
  public RoleAddEdit: string;
  public DeletingRole: boolean = false;
  public role;

  constructor(
    private _userContactService: ContactListService,
    private _coreConfigService: CoreConfigService,
    private modalService: NgbModal,
    private _toastrService: ToastrService,
    private cacheService: CacheService,
    private _authservice: AuthenticationService
  ) {
    this._unsubscribeAll = new Subject();
  }

  onDataReceived(data: any): void {
    this.tempData = data;
  }

  ngOnInit(): void {
    this._userContactService
      .getGroupList()
      .pipe(first())
      .subscribe(
        (data) => {
          this.tempData = data;
          this.LoadingData = false;
        },
        (error) => {
          Swal.fire({
            title: "User Data!",
            text: error.error.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      );
  }

  userHasPermission(permission: string): boolean {
    var permissions = this._authservice.currentUserValue.permissions;
    return this._authservice.currentUserValue.permissions.includes(permission);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  modalOpenPrimary(modalPrimary, rolobj) {
    this.RoleAddEdit = "Edit Group";
    this.role = rolobj;
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: "lg",
      windowClass: "modal modal-primary",
    });
  }

  modalAddRole(modalPrimary) {
    this.RoleAddEdit = "Add New Group";
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: "lg",
      windowClass: "modal modal-primary",
    });
  }

  modalRoleList(modalPrimary) {
    this.modalService.open(modalPrimary, {
      backdrop: 'static',
      centered: true,
      size: "lg",
      windowClass: "modal modal-primary",
    });
  }

  DeleteRole(role) {
    this.LoadingData = true;
    this._userContactService
      .deleteGroup(role.id)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.RemoveRolefromCache(role);
          Swal.fire({
            title: "Role Deleted!",
            text: "Role Deleted Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          this._userContactService
            .getGroupList()
            .pipe(first())
            .subscribe(
              (data) => {
                this.tempData = data;
                this.LoadingData = false;
              },
              (error) => {
                this._toastrService.error(error.error.message, "Role Error", {
                  positionClass: "toast-top-left",
                  toastClass: "toast ngx-toastr",
                  closeButton: true,
                });
                this.LoadingData = false;
              }
            );
        },
        (error) => {
          Swal.fire({
            title: "Group Deletion Failed!",
            text: error.error.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          this.LoadingData = false;
        }
      );
  }

  RemoveRolefromCache(newItem) {
    const cachedList = this.cacheService.get(
      `${environment.apiUrl}/v1/` + this.tenant + `/roles`
    );
    if (cachedList) {
      const indexToRemove = cachedList.data.findIndex(
        (obj) => obj.id == newItem.id
      );
      if (indexToRemove !== -1) {
        cachedList.data.splice(indexToRemove, 1);
      }
      this.cacheService.set(
        `${environment.apiUrl}/v1/` + this.tenant + `/roles`,
        cachedList
      );
    }
  }
}
