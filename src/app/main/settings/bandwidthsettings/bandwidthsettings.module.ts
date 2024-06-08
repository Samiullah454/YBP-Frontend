import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettinglistComponent } from './settinglist/settinglist.component';
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
import { NewSettingSidebarComponent } from './settinglist/new-setting-sidebar/new-setting-sidebar.component';
import { BandwidthsettingsService } from './bandwidthsettings.service';


// routing
const routes: Routes = [
  {
    path: 'setting-list',
    component: SettinglistComponent,
    data: { animation: 'SettinglistComponent' }
  },
];
@NgModule({
  declarations: [ SettinglistComponent,NewSettingSidebarComponent],
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
  providers: [BandwidthsettingsService]
})
export class BandwidthsettingsModule { }
