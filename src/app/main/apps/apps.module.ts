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

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

import { TeamsComponent } from './teams/teams.component';
import { TemplateModule } from './template/template.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';


// routing
const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
  },  
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'role',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'packages',
    loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule)
  },
  {
    path: 'template',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'tenants',
    loadChildren: () => import('./tenants/tenants.module').then(m => m.TenantsModule)
  },
  {
    path: 'permissions',
    loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule)
  },
  {
    path: 'industry',
    loadChildren: () => import('./industry/industry.module').then(m => m.IndustryModule)
  },
  {
    path: 'technician',
    loadChildren: () => import('./technician/technician.module').then(m => m.TechnicianModule)
  },
  {
    path: 'shift',
    loadChildren: () => import('./shift/shift.module').then(m => m.ShiftModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then(m => m.ServiceModule)
  },
  {
    path: 'parts',
    loadChildren: () => import('./parts/parts.module').then(m => m.PartsModule)
  }
  ,
  {
    path: 'servicecontracts',
    loadChildren: () => import('./service-contract/service-contract.module').then(m => m.ServiceContractModule)
  }
  ,
  {
    path:'job',
    loadChildren:() => import('./job/job.module').then(m =>m.JobModule)
  },
  {
    path: 'slider',
    loadChildren: () => import('./WebsiteConfiguration/slider/slider.module').then(m => m.SliderModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./WebsiteConfiguration/service/service.module').then(m => m.ServiceModule)
  },
  
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  },
];

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

@NgModule({
  declarations: [
    TeamsComponent,
  ],
  imports:[
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
    PermissionsModule,
    ProfileSettingsModule,
    TemplateModule
  ],
  providers: []
})
export class AppsModule {}
