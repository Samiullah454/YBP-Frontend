import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { TenantlistComponent } from './tenantlist/tenantlist.component';
import { TenantServiceProxy } from '@shared/service-proxies/service-proxies';
import { NewTenantSideBarComponent } from './tenantlist/new-tenant-sidebar/new-tenant-sidebar.component';
import { TenantsService } from './tenants.service';

// routing
const routes: Routes = [
  {
    path: 'tenant-list',
    component: TenantlistComponent,
    data: { animation: 'TenantlistComponent' }
  },

];

@NgModule({
  declarations: [ TenantlistComponent,NewTenantSideBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  providers: [TenantsService]
})
export class TenantsModule {}
