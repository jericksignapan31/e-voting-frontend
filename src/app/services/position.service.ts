import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public createUser(position: any): Observable<any> {
    return this.http.post(this.url + '/position', position);
  }

  public getAllPositions(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/position');
  }

  public updatePosition(id: string, data: any): Observable<any> {
    return this.http.patch(this.url + `/position/${id}`, data);
  }

  public deletePosition(id: string): Observable<void> {
    return this.http.delete<void>(this.url + `/position/${id}`);
  }
}
