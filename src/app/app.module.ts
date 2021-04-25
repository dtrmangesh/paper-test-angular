import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employeecomponent/EmployeeComponent';
import { DatePipe, KeyValuePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe, KeyValuePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
