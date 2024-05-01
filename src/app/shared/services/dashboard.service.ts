import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly employeeURl: string = 'https://localhost:7078/api/Employee';
  private readonly policyURL: string = 'https://localhost:7078/api/Policy';

  constructor(private http: HttpClient) {}

  getEmployeeData() {
    return this.http.get(this.employeeURl + '/1');
  }

  getPolicyData() {
    return this.http.get(this.policyURL + '/1');
  }
}
