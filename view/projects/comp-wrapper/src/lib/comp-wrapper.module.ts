import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompWrapperComponent } from './comp-wrapper.component';
import { DevidedComponent } from './devided/devided.component';
import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [
    CompWrapperComponent,
    DevidedComponent,
    WrapperComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CompWrapperComponent,
    WrapperComponent,
    DevidedComponent
  ],
})
export class CompWrapperModule { }
