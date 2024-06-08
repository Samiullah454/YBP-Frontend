
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { CoreCardModule } from "../../../../@core/components/core-card/core-card.module";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { TimeFormatPipe } from '@shared/pipes/time-format.pipe';
import { PipeModule } from '@shared/pipes/pipe/pipe.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';


// routing
const routes: Routes = [
  {
    path: 'list',
    component:CustomerListComponent
  },
  
  {
    path: 'add',
    component: CustomerAddComponent,
    data: { animation: 'wizard' }
  },
  {
    path: 'edit/:id',
    component: CustomerAddComponent,
   // data: { path: 'view/:id', animation: 'CustomerAddComponent' }
  },
];

@NgModule({
  declarations: [
    


  
    CustomerListComponent,
              CustomerAddComponent
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
    CoreSidebarModule,
    CardSnippetModule,
    ContentHeaderModule,
    CoreCardModule,
    NgbDropdownModule,
    SweetAlert2Module.forRoot(),
    PipeModule
  ]
})
export class CustomerModule { }
