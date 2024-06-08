
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { BandwidthsettingsModule } from './bandwidthsettings/bandwidthsettings.module';
import { RouterModule, Routes } from '@angular/router';


// routing
const routes: Routes = [
  
  {
    path: 'bandwidth',
    loadChildren: () => import('./bandwidthsettings/bandwidthsettings.module').then(m => m.BandwidthsettingsModule)
  },
];
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    Ng2FlatpickrModule,
    BandwidthsettingsModule,
    RouterModule.forChild(routes)
  ],

  providers: []
})
export class SettingsModule {}
