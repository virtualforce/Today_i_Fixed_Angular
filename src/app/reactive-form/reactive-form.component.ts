import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactveFormComponent implements OnInit {

  contactForm: any;
  constructor() {
    this.contactForm = this.initializeForm();
  }

  ngOnInit(): void {
   this.confirmValidator();
  }
  onSubmit() {
    console.log(this.contactForm)
  }

  private initializeForm(){
    return new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      acceptTerms: new FormControl(false, [Validators.required])
    });
  }

  onReset(){
    this.contactForm.reset();    
  }

  private confirmValidator(){
    this.contactForm.valueChanges.subscribe((form: any) => {
      const password = form.password;
      const confirm = form.confirmPassword;
      if (password !== confirm) {
        this.contactForm.get('confirmPassword').setErrors({ confirmedValidator: true });
      }
    });
  }
}
