import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { UserListService } from 'app/main/apps/user/user-list/user-list.service';
import { ListComponent } from './list/list.component';
import { TenantsService } from 'app/main/apps/tenants/tenants.service'



const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    resolve: {
      uls: UserListService
    },
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
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
  providers: [UserListService, TenantsService]
})
export class ProfileSettingsModule { }
