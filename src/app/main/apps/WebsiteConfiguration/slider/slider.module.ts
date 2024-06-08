import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderlistComponent } from './sliderlist/sliderlist.component';
import { SlideraddComponent } from './slideradd/slideradd.component';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from '@shared/pipes/pipe/pipe.module';

import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreCommonModule } from '@core/common.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  {
    path: 'add',
    component: SlideraddComponent
  }]
@NgModule({
  declarations: [
    SliderlistComponent,
    SlideraddComponent
  ],
  imports: [
    CommonModule, 
    FileUploadModule,
    PipeModule,
    SweetAlert2Module.forRoot(),

    NgbDropdownModule,
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
  ]
})
export class SliderModule { }
