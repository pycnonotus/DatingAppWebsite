import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageUnregisterdComponent } from './home-page/home-page-unregisterd/home-page-unregisterd.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomePageUnregisterdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
