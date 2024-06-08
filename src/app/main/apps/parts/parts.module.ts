import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartListComponent } from './part-list/part-list.component';
import { PartAddComponent } from './part-add/part-add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipeModule } from '@shared/pipes/pipe/pipe.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { TypesListComponent } from '../service/type/types-list/types-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: PartListComponent
  },
{
  path:'parttype/list',
  component:TypesListComponent
}]

@NgModule({
  declarations: [
    PartListComponent,
    PartAddComponent
  ],
  imports: [
    CommonModule, 
       
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
export class PartsModule { }
