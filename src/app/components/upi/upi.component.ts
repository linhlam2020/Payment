import { Component, OnInit } from '@angular/core';
import { CreditCardValidator } from 'angular-cc-library';
import { FormsModule, ReactiveFormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './upi.component.html',
  styleUrls: ['../../app.component.css']
})
export class UpiComponent implements OnInit {

  paymentForm: FormGroup;
  submitted: boolean = false;
  status = '';
  api = '';
  invalidMessage = '';

  constructor(private _fb: FormBuilder, private router: Router) {}

  ngOnInit() {

    this.paymentForm = new FormGroup({
      rtn: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required)
    })
  }

  onSubmit(form) {
    this.submitted = true;
    if (form.valid){
      let input = this.paymentForm.value.type;
      if (input == "email")
        this.api = JSON.stringify({ "rtn": this.paymentForm.value.rtn, "email": this.paymentForm.value.alias});
      else if (input == "phone")
        this.api = JSON.stringify({ "rtn": this.paymentForm.value.rtn, "phone": this.paymentForm.value.alias});
      this.router.navigate(['/confirm']);
      console.log(this.api);
    }
    else
      this.invalidMessage = "Please fill all fields!"
  }

}
