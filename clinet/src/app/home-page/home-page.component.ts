import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public $account = this.accountService.currentUser$;
  constructor(
    private accountService: AccountService,
  ) {}
  registerMod = false;
  ngOnInit(): void {}
}
