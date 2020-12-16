import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../model/member';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, accountService: AccountService) {}

  public geteAllMemgers() {
    const url = this.baseUrl + 'member';
    return this.http.get(url + '?minAge=18&maxAge=250');
  }
  public likeMember(username: string, like: boolean) {
    const url = this.baseUrl + 'member';
    return this.http.post(url, {
      username,
      like,
    });
  }

  public getMatches() {
    const url = this.baseUrl + 'member/match';
        return this.http.get(url);

  }

}
