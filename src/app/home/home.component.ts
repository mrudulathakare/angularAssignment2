import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly APIUrl = 'https://localhost:7078/api/Employee';
  readonly APIUrl_1 = 'https://localhost:7078/api/Policy';

  constructor(private http: HttpClient) {}

  employee: any = [];
  policy: any = [];

  getEmployeeData() {
    this.http.get(this.APIUrl + '/1').subscribe((data) => {
      this.employee.push(data);
    });
  }

  getPolicyData() {
    this.http.get(this.APIUrl_1 + '/1').subscribe((data) => {
      this.policy = data;
    });
  }

  ngOnInit() {
    this.getEmployeeData();
    this.getPolicyData();
  }
}
