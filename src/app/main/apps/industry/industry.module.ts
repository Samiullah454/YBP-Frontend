import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndustrylistComponent } from './industrylist/industrylist.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddIndustryComponent } from './addindustry/addindustry.component';


const routes: Routes = [
  {
    path: 'list',
    component: IndustrylistComponent
  }]
@NgModule({
  declarations: [
    IndustrylistComponent,
    AddIndustryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxDatatableModule

  ]
})
export class IndustryModule { }
