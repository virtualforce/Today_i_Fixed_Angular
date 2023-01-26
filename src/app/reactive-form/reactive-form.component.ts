import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactveFormComponent implements OnInit {

  contactForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    acceptTerms: new FormControl(false, [Validators.required])
  });

  submitted: boolean = false;

  user: any;
  constructor() {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.contactForm)
  }


  onReset(){
    this.contactForm.reset();
  }

  passwordMatchValidator(frm: FormGroup, controlName: string, matchingControlName: string) {
    if(this.submitted && frm.controls[controlName].value !== frm.controls[matchingControlName].value){
      return true;
    } else{
      return false;
    }
  }


}
