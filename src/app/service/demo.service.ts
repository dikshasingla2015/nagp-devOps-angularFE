import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://nagp-xyz-LB-1601556795.us-east-1.elb.amazonaws.com';

  async getAllEmployees() {
    const res = await this.http.get(this.URL + '/getAllEmployees').toPromise()
    .then(res => res );
    return res;
  }

  async addEmployee(employee: Employee) {
    const res = await this.http.post(this.URL + '/addEmployee', employee).toPromise()
      .then(res => res = res);
    return res;
  }

}
