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
import { PackagesService } from './packages.service';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { NewPackageSidebarComponent } from './list/new-package-sidebar/new-package-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add',
    component: AddComponent
  }
  // {
  //   path: 'user-view/:id',
  //   component: UserViewComponent,
  //   resolve: {
  //     data: UserViewService,
  //   },
  //   data: { path: 'view/:id', animation: 'UserViewComponent' }
  // },
  // {
  //   path: 'user-edit/:id',
  //   component: UserEditComponent,
  //   resolve: {
  //     ues: UserEditService
  //   },
  //   data: { animation: 'UserEditComponent' }
  // },
  // {
  //   path: 'user-view',
  //   redirectTo: '/apps/user/user-view/2' // Redirection
  // },
  // {
  //   path: 'user-edit',
  //   redirectTo: '/apps/user/user-edit/2' // Redirection
  // }
];
@NgModule({
  declarations: [AddComponent,ListComponent,NewPackageSidebarComponent],
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
  providers: [PackagesService]
})
export class PackagesModule { }
