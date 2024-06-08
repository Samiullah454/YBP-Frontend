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
import { TemplatelistComponent } from './templatelist/templatelist.component';
import { NewTemplateSidebarComponent } from './templatelist/new-template-sidebar/new-template-sidebar.component';
import { TemplateService } from './template.service';

// routing
const routes: Routes = [
  {
    path: 'list',
    component: TemplatelistComponent,
    resolve: {
      uls: TemplateService
    },
    data: { animation: 'TemplatelistComponent' }
  },

];

@NgModule({
  declarations: [ TemplatelistComponent,NewTemplateSidebarComponent],
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
  providers: [TemplateService]
})
export class TemplateModule {}
