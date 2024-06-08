import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreMenuService } from '@core/components/core-menu/core-menu.service';


@Component({
  selector: '[core-menu]',
  templateUrl: './core-menu.component.html',
  styleUrls: ['./core-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreMenuComponent implements OnInit {
  currentUser: any;

  @Input()
  layout = 'vertical';

  @Input()
  menu: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {CoreMenuService} _coreMenuService
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _coreMenuService: CoreMenuService) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    
    // Set the menu either from the input or from the service
    this.menu = this.menu || this._coreMenuService.getCurrentMenu();
    // Subscribe to the current menu changes
    this._coreMenuService.onMenuChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.currentUser = this._coreMenuService.currentUser;

      // Load menu
      this.menu = this._coreMenuService.getCurrentMenu();
      const currentHost = window.location.host;
    const parts=currentHost.split('.');
    const tenant=parts.length>1?parts[0].trim():"";
    const finaltenant=tenant=="www" || tenant=="chatroster"?"":tenant;
    if(finaltenant=="" || finaltenant.toLocaleLowerCase()=="superadmin")
    {
          if(this.currentUser.tenantId==null || this.currentUser.tenantId=="0")
           this.menu=this.menu[0].children.filter(x=>x.isforTenant==false);
          else 
          {
            this.menu=this.menu[0].children.filter(x=>x.isforTenant==true);
          }
    }
    else 
    {
      this.menu=this.menu[0].children.filter(x=>x.isforTenant==true);
    }
      this._changeDetectorRef.markForCheck();
    });
  }
  userHasPermission(permission: string): boolean {
    
    var permissions=this.currentUser.permissions;
    return this.currentUser.permissions.includes(permission);
  }
}
