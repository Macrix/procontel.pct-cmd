import { AuthorizationService } from './../core/services/authorization.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebpointService } from 'src/core/services/webpoint.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthorizationService, WebpointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
