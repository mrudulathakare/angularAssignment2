import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7078/api/Login';
  isAuthenticated: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  login(form: any) {
    this.http
      .post<any>(`${this.apiUrl}`, {
        email: form.email,
        password: form.password,
      })
      .subscribe(
        (response) => {
          console.log(response);

          localStorage.setItem('currentUser', JSON.stringify(response));
          this.isAuthenticated = true;

          alert('Logged in successfully');

          this.router.navigate(['']);
        },
        (error) => {
          console.log('Login failed: ', error.error);

          alert(error.error);
        }
      );
  }

  // getUserId () {
  //   const currentUser = localStorage.getItem("currentUser");

  //   if (currentUser) {
  //     let userData = JSON.parse(currentUser);

  //     let usedId = userData.
  //   }
  // }

  initAuthStateListener(): Promise<void> {
    return new Promise<void>((resolve) => {
      const currentUser = localStorage.getItem('currentUser') !== null;

      if (currentUser) {
        console.log('User is already signed in');

        this.isAuthenticated = true;
        resolve();
      }
    });
  }
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
