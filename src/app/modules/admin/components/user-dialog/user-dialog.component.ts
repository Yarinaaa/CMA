import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: User
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl(this.data?.login, [Validators.required]),
      password: new FormControl(this.data?.password, [Validators.required]),
      role: new FormControl(this.data?.role, [Validators.required]),
    });
    if (this.data) {
      this.formGroup.get('login')?.disable();
    }
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
