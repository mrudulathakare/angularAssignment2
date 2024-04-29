import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  authService: any;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.authService.login(this.form.email, this.form.password).subscribe(
      (response: any) => {
        console.log('Authentication successful:', response);
        this.authService.storeUserDetails(response);
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Authentication failed:', error);
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    );
  }
}
