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

import { ContactListComponent } from './contact-list/contact-list.component';

import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { ContactListService } from 'app/main/apps/contacts/contact-list/contact-list.service'
import { NewContactSidebarComponent } from './contact-list/new-contact-sidebar/new-contact-sidebar.component';
import { AddGroupComponent } from './contact-groups/addGroup/addgroup.component';


const routes: Routes = [
  
  {
    path: 'list',
    component: ContactListComponent,
  },
  {
    path: 'contact-groups',
    component: ContactGroupsComponent
  }
];
@NgModule({
  declarations: [
    ContactListComponent,
    ContactGroupsComponent,
    NewContactSidebarComponent,
    AddGroupComponent
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
    CoreSidebarModule
  ],
  providers: [ContactListService]
})
export class ContactsModule { }
