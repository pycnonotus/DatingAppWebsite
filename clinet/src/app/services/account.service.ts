import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private userToken;

  constructor(private http: HttpClient) {}
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  async register(registerForm: { username: string; password: string }) {
    console.log(registerForm);

    const url = this.baseUrl + 'account/register';
    return await this.http.post(url, registerForm).subscribe(
      (response: User) => {
        console.log('res sabba');
        console.log(response, 'servies');
        const us: User = { token: 'ssss', roles: [] };
        this.currentUserSource.next(response);
      },
      (error) => {
        console.log(error, 'servies');
        this.currentUserSource.error(error);
      }
    );
    // tslint:disable-next-line:typedef
  }
  private getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1])); // token is Bearer <jwt>
  }

  public login(user: { username: string; password: string }) {
    const url = this.baseUrl + 'account/login';
    this.http.post(url, user).subscribe((res: User) => {
      this.currentUserSource.next(res);
    });
  }

  private setUser(user: User): void {
    if (user != null) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    }

    localStorage.setItem('user', JSON.stringify(user));
  }
}
