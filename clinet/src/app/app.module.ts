import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomePageUnregisterdComponent } from './home-page/home-page-unregisterd/home-page-unregisterd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountFillMissingInfoComponent } from './account-fill-missing-info/account-fill-missing-info.component';
import { DateInputComponent } from './shared/form/date-input/date-input.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HomePageLoginComponent } from './home-page/home-page-login/home-page-login.component';

import { MatIconModule } from '@angular/material/icon';
import { MainComponent } from './main/main.component';
import { FindMatchComponent } from './find-match/find-match.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavComponent } from './main/nav/nav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MemberCardComponent } from './find-match/member-card/member-card.component';
import { MatStepperModule } from '@angular/material/stepper';

import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HomePageUnregisterdComponent,
    AccountFillMissingInfoComponent,
    DateInputComponent,
    HomePageLoginComponent,
    MainComponent,
    FindMatchComponent,
    NavComponent,
    MemberCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
