import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CompWrapperModule } from '../../projects/comp-wrapper/src/lib/comp-wrapper.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MidComponent } from './mid/mid.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    MidComponent,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
    CompWrapperModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
