import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private http: HttpClient) { }

  readonly URL = 'http://34.69.228.213:80';

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
