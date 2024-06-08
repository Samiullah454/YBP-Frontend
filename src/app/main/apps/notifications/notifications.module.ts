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
import { NotificationlistComponent } from './notificationlist/notificationlist.component';
import { AddnotificationComponent } from './addnotification/addnotification.component';
import { NotificationsService } from 'app/layout/components/navbar/navbar-notification/notifications.service';

// routing
const routes: Routes = [
  {
    path: 'notificationslist',
    component: NotificationlistComponent,
    data: { animation: 'NotificationlistComponent' }
  },

];

@NgModule({
  declarations: [ NotificationlistComponent, AddnotificationComponent],
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
  providers: [NotificationsService]
})
export class NotificationsModule {}
