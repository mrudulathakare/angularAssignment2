import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DashboardService } from '../shared/services/dashboard.service';

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

  constructor(private dashboardService: DashboardService) {}

  employee: any = [];
  policy: any = [];

  ngOnInit() {
    this.dashboardService.getEmployeeData().subscribe(
      (data) => {
        this.employee.push(data);
        console.log(data);
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );

    this.dashboardService.getPolicyData().subscribe(
      (data) => {
        this.policy = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }
}
