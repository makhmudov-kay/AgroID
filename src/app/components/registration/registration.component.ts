import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzFormTooltipIcon} from "ng-zorro-antd/form";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {
  validateForm!: FormGroup;
  toggle:boolean = true;
  buttonTxt = true;
  servicesList = [
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"},
    {img: "../../../assets/img/services/agrozaminService.svg"}
  ]
  validFullName = /(^[a-z\p{sc=Cyrillic}]+)((\s+)?(-+)?([a-z\p{sc=Cyrillic}]+)?)+?$/iu;
  validPhone = /(^\+\d\d\d\d\d\d\d\d\d\d\d\d)$/;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(this.validFullName)]],
      lastName: [null, [Validators.required, Validators.pattern(this.validFullName)]],
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumber: [null, [Validators.required, Validators.pattern(this.validPhone)]],
      email: [null, [Validators.email]],
      agree: [false, [Validators.required, Validators.requiredTrue]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  toggleInfo() {

    if(this.toggle === false) {
      this.validateForm.controls['email'].setValidators(null)
      this.validateForm.controls['email'].setValue(null)
      this.validateForm.controls['phoneNumber'].setValidators([Validators.required, Validators.pattern(this.validPhone)])
    } else {
      this.validateForm.controls['email'].setValidators([Validators.required, Validators.email])
      this.validateForm.controls['phoneNumber'].setValidators(null)
      this.validateForm.controls['phoneNumber'].setValue(null)

    }
    this.validateForm.controls['phoneNumber'].updateValueAndValidity()
    this.validateForm.controls['email'].updateValueAndValidity()
    this.toggle = !this.toggle;
    this.buttonTxt = !this.buttonTxt
  }

}
