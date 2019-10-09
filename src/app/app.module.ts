import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule } from '@angular/common/http';

import { ExameService } from './exame.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SlimLoadingBarModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ ExameService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
