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
import { TechnicianTypeComponent } from './technician-type/technician-type.component';
import { AddTechnicianTypeComponent } from './technician-type/add-technician-type/add-technician-type.component';
import { TechnicianListComponent } from './technician-list/technician-list.component';
import { TechnicianViewComponent } from './technician-view/technician-view.component';
import { TechnicianAddComponent } from './technician-add/technician-add.component';
import { TimeFormatPipe } from '@shared/pipes/time-format.pipe';
import { PipeModule } from '@shared/pipes/pipe/pipe.module';
import { CrewgrouplistComponent } from './crewgroup/crewgrouplist/crewgrouplist.component';
import { CrewgroupaddComponent } from './crewgroup/crewgroupadd/crewgroupadd.component';

// routing
const routes: Routes = [
  {
    path: 'list',
    component: TechnicianListComponent
  },
  {
    path: 'add',
    component: TechnicianAddComponent,
    data: { animation: 'wizard' }
  },
  {
    path: 'view/:id',
    component: TechnicianViewComponent,
    data: { path: 'view/:id', animation: 'TechnicianViewComponent' }
  },
  {
    path: 'edit/:id',
    component: TechnicianAddComponent,
    data: { path: 'view/:id', animation: 'TechnicianAddComponent' }
  },
  {
    path: 'types',
    component: CrewgrouplistComponent
  },
  {
    path: 'crewgroup',
    component: CrewgrouplistComponent
  },
  {
    path: 'servicearea',
    component: CrewgrouplistComponent
  }

];

@NgModule({
  declarations: [
    TechnicianTypeComponent,
    AddTechnicianTypeComponent,
    TechnicianListComponent,
    TechnicianAddComponent,
    TechnicianViewComponent,
    CrewgrouplistComponent,
    CrewgroupaddComponent,


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
export class TechnicianModule { }
