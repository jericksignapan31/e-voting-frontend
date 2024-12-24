import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl; 

  constructor(private http: HttpClient) {}

  // Fetch all users
  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/users`);
  }

  // Fetch a single user by ID
  public getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/users/${id}`);
  }

  // Create a new user
  public createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.url}/users`, user);
  }

  // Update an existing user
  public updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.url}/users/${id}`, user);
  }

  // Delete a user
  public deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/users/${id}`);
  }

  // Example: Login function (based on your provided example)
  public login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/auth-user/login`, { username, password });
  }

}
