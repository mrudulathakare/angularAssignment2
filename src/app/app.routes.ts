import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'payment-details',
    component: PaymentDetailsComponent,
  },
];
