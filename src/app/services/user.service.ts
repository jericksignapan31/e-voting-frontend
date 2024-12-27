import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/users`);
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/users/${id}`);
  }

  public createUser(user: any): Observable<any> {
    return this.http.post(this.url + '/users', user);
  }

  public updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${id}`, user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/users/${id}`);
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth-user/login`, {
      username,
      password,
    });
  }
}
