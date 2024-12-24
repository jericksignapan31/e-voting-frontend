import { Injectable, signal } from '@angular/core';
import { environment } from '../../environment/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { UserModel } from '../interface/UserModel';
import { Router } from '@angular/router';
import { AlertServiceService } from './alert-service.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.baseUrl;
  userInfo: UserModel | null = null;
  user = signal<UserModel | null>(null);
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem(environment.tokenName);
  }

  constructor(
    private http: HttpClient,
    private _login: LoginService,
    private _alert: AlertServiceService,
    private router: Router,
  ) {
    this._isLoggedIn$.next(!!this.token);
    this.userInfo = this.getUser(this.token);
  }

  hasRole(role: string): boolean {
    return this.userInfo?.userType === role;
  }

  userInfoIdDecoded = signal<number>(0);
  login(username: any, password: any) {
    return this._login.login(username, password).pipe(
      tap((response: any) => {
        if (!response.access_token) {
          return;
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(environment.tokenName, response.access_token);
        this.userInfo = this.getUser(response.access_token);
        this.user.set(this.getUser(response.access_token));

        //  this.userInfoIdDecoded.set(this.userInfo.id)
      }),
    );
  }

  public getUser(token: string): UserModel | null {
    if (!token) {
      this.router.navigate(['']);
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }

  isLogin() {
    return this.isLoggedIn$;
  }

  private readonly TOKEN_NAME = environment.tokenName;
  logout() {
    this._alert.simpleAlert(
      'warning',
      'Warning',
      'Are you sure you want to logout?',
      () => {
        this._isLoggedIn$.next(false);
        localStorage.removeItem(this.TOKEN_NAME);
        this.router.navigate([''])
        window.location.reload();
      }
    )
  }

  public isloggedin() {
    return localStorage.getItem(environment.tokenName) != null;
  }

 public getrole() {
    return sessionStorage.getItem('role') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  
}
}
