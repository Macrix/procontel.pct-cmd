import { EndpointConnection, IDuplexConnection } from '@macrix/pct-cmd';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: EndpointConnection, useValue: new EndpointConnection('http://localhost:9000')},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
