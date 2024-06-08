import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { ServiceaddComponent } from './serviceadd/serviceadd.component';


import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {  NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';

const routes: Routes = [
  {
    path: 'list',
    component: ServicelistComponent,
  },
  {
    path: 'add',
    component: ServiceaddComponent,
  },{
    path: 'edit/:id',
    component: ServiceaddComponent,
  }
];
@NgModule({
  declarations: [
    ServicelistComponent,
    ServiceaddComponent
  ],
  imports: [
    CommonModule,CommonModule,
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
  providers: [
    
    
NgbActiveModal,
    
 
// Other providers
  ]
})
export class ServiceModule { }
