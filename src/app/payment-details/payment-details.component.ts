import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
})
export class PaymentComponent implements OnInit {
  cards: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPaymentDetails();
  }

  fetchPaymentDetails() {
    this.http.get<any[]>('https://localhost:7078/api/PaymentDetails').subscribe(
      (response) => {
        this.cards = response;
      },
      (error) => {
        console.log('Error fetching payment details:', error);
      }
    );
  }

  submitPayment() {
    const paymentDetails = this.cards.map((card) => ({
      cardOwnerName: card.owner,
      cardNumber: card.number,
      validThrough: card.expDate,
      securityCode: card.securityCode,
    }));

    this.http.post('payment-api-endpoint', paymentDetails).subscribe(
      (response) => {
        console.log('Payment submitted successfully:', response);
        this.clearForm();
      },
      (error) => {
        console.log('Error submitting payment:', error);
      }
    );
  }

  clearForm() {
    this.cards.forEach((card) => {
      card.owner = '';
      card.number = '';
      card.expDate = '';
      card.securityCode = '';
    });
  }

  removeCard(cardId: number) {
    const index = this.cards.findIndex((card) => card.id === cardId);
    if (index !== -1) {
      this.cards.splice(index, 1);
      console.log('Card removed:', cardId);
    } else {
      console.log('Card not found with ID:', cardId);
    }
  }
}
