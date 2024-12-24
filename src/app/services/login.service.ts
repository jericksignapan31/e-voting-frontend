import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.baseUrl;
  constructor(private http : HttpClient) { }
  public login(username: string, password: string ): Observable<any>{
    return this.http.post(`${this.url}/auth-user/login`, { username: username, password: password })
  }
}
