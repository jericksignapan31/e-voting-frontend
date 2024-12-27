import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private studentData: any;

  setStudent(data: any): void {
    this.studentData = data;
  }

  getStudent(): any {
    return this.studentData;
  }

}
