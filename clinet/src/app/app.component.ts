import { Component, OnInit } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AppDateAdapter } from './helper/date-format';
import { User } from './model/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class AppComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setUser(user);
    }
  }
}
