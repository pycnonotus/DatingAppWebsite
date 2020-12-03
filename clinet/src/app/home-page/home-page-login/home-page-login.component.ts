import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home-page-login',
  templateUrl: './home-page-login.component.html',
  styleUrls: ['./home-page-login.component.css'],
})
export class HomePageLoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}
  model: { username: string; password: string };
  ngOnInit(): void {}

  login() {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.router.navigateByUrl('/matches');
    });
  }
}
