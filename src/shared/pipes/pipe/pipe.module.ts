import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../time-format.pipe';



@NgModule({
  declarations: [
    TimeFormatPipe // Declare the pipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeFormatPipe // Export the pipe
  ]
})
export class PipeModule { }
