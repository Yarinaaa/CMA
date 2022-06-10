import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  formGroup!: FormGroup;
  @Output() onFormSubmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.onFormSubmit.next(this.formGroup.value);
    }
  }
}
