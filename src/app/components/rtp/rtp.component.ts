import { Component, OnInit } from '@angular/core';
import { CreditCardValidator } from 'angular-cc-library';
import { FormsModule, ReactiveFormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './rtp.component.html',
  styleUrls: ['../../app.component.css']
})
export class RtpComponent implements OnInit {

  paymentForm: FormGroup;
  submitted: boolean = false;
  status = '';
  api = '';
  invalidMessage = '';

  constructor(private _fb: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.paymentForm = new FormGroup({
      rtn: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required)
    })
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid){
      this.router.navigate(['/confirm']);
      this.api = JSON.stringify({ "rtn": this.paymentForm.value.rtn, "accountNumber": this.paymentForm.value.accountNumber});
      console.log(this.api);
    }
    else
      this.invalidMessage = "Please fill all fields!"
  }

}
