import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [NgFor, RouterLink, FormsModule, NgIf],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
})
export class PaymentDetailsComponent implements OnInit {
  cards: any[] = [];
  isEdit: boolean = false;

  form: any = {
    cardOwnerName: '',
    cardNumber: '',
    validThrough: '',
    securityCode: '',
    userId: 0,
  };

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

  convertToSQLDate(inputString: string) {
    var parts = inputString.split('/');

    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[1], 10);

    var newDateString =
      year.toString() + '-' + month.toString().padStart(2, '0') + '-01';

    return newDateString;
  }

  editToggle(paymentId: number) {
    // this.isEdit = !this.isEdit;

    const selectedPayment = this.cards.find(
      (item: any) => item.paymentId === paymentId
    );

    if (!this.isEdit) {
      this.form = {
        ...this.form,
        paymentId: selectedPayment.paymentId,
        cardOwnerName: selectedPayment.cardOwnerName,
        cardNumber: selectedPayment.cardNumber,
        securityCode: selectedPayment.securityCode,
        validThrough: selectedPayment.validThrough,
        userId: selectedPayment.userId,
      };

      this.isEdit = true;
    } else {
      this.form = {
        cardOwnerName: '',
        cardNumber: '',
        securityCode: null,
        validThrough: '',
        userId: null,
      };

      this.isEdit = false;
    }
  }

  submit() {
    const newDate = this.convertToSQLDate(this.form.validThrough);
    console.log(newDate);

    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.form.userId = parseInt(JSON.parse(userData).userId);
    }

    if (this.isEdit) {
      this.http
        .put('https://localhost:7078/api/PaymentDetails', {
          ...this.form,
          validThrough: newDate,
        })
        .subscribe(
          (response) => {
            console.log('Payment submitted successfully:', response);
            this.resetForm();
          },
          (error) => {
            console.log('Error submitting payment:', error);
          }
        );
    } else {
      this.http
        .post('https://localhost:7078/api/PaymentDetails', {
          ...this.form,
          validThrough: newDate,
        })
        .subscribe(
          (response) => {
            console.log('Payment submitted successfully:', response);
            this.resetForm();
          },
          (error) => {
            console.log('Error submitting payment:', error);
          }
        );
    }
  }
  // editCard(card: any) {

  //   this.cardForm.patchValue({
  //     owner: card.cardOwnerName,
  //     number: card.cardNumber,
  //     expDate: card.validThrough,
  //     securityCode: card.securityCode
  //   });
  // }

  resetForm() {
    this.form = {
      cardOwnerName: '',
      cardNumber: '',
      securityCode: null,
      validThrough: '',
      userId: null,
    };

    if (this.isEdit) {
      this.isEdit = false;
    }
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
