import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: any = {};
  errorMessage: string | undefined;
  isLoading: boolean | undefined = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.form);
  }
}
