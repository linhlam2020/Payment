/**
* The Payment Portal implements an application that
* allows user to choose a payment method from the
* following options: PayPal, Cards, Zelle, ACH, RTP, UPI
*
* @author  Linh Lam
* @version 1.0
* @since   2019-08-16
*/

import { Component, OnInit } from '@angular/core';
import { CreditCardValidator } from 'angular-cc-library';
import { FormsModule, ReactiveFormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['../../app.component.css']
})
export class CardsComponent implements OnInit {
  paymentForm: FormGroup;
  submitted: boolean = false;
  status = '';
  api = '';
  invalidMessage = '';
  value = window.history.state.data;

  constructor(private _fb: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.paymentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      creditCard: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      cvc: new FormControl('', Validators.required)
    //---Validate Real Card Number---
      // creditCard: new FormControl('', <any>CreditCardValidator.validateCCNumber),
      // expirationDate: new FormControl('', <any>CreditCardValidator.validateExpDate),
      // cvc: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)]))
    })
  }

  onSubmit(form) {
    this.submitted = true;
    this.status = 'Card Status: ' + form.status;
    if (form.status == "VALID" && form.valid) {
      this.api = JSON.stringify({ "name": this.paymentForm.value.name, "cardNumber": this.paymentForm.value.creditCard,
        "expirationDate": this.paymentForm.value.expirationDate, "cvc": this.paymentForm.value.cvc});
      this.router.navigate(['/confirm'], {state: {account: this.paymentForm.value.creditCard, value: this.value}});

    }
    else
        this.invalidMessage = "Invalid Card Info. Please Check Again!"
    //console.log(this.api);
  }

  cancel(){
    this.router.navigate(['/home'], {state: {value: this.value}});
  }
}
