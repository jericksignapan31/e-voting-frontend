import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public login(username: string, password: string ): Observable<any>{
    return this.http.post(`${this.url}/auth-user/login`, { username: username, password: password })
  }

}
