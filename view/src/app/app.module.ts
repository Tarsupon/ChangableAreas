import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InjectDirective } from './devided/inject.directive';
import { MidComponent } from './mid/mid.component';
import { ChildComponent } from './child/child.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { DevidedComponent } from './devided/devided.component';

@NgModule({
  declarations: [
    AppComponent,
    MidComponent,
    ChildComponent,
    WrapperComponent,
    DevidedComponent,
    InjectDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [DevidedComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
