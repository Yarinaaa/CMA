import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/shared/models/status.enum';

@Component({
  selector: 'app-not-active-dialog',
  templateUrl: './not-active-dialog.component.html',
  styleUrls: ['./not-active-dialog.component.scss'],
})
export class NotActiveDialogComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NotActiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    const baseURL = this.data;
    this.formGroup = new FormGroup({
      baseURL: new FormControl(baseURL, [Validators.required]),
      comment: new FormControl('', [Validators.required]),
    });
    this.formGroup.get('baseURL')?.disable();
  }

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        ...this.formGroup.value,
        status: Status.NotActive,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
