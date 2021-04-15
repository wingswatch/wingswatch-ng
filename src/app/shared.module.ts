import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgSpinnerComponent } from './svg-spinner/svg-spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SvgSpinnerComponent
  ],
  exports: [
    SvgSpinnerComponent
  ]
})
export class SharedModule { }
