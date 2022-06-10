import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Core } from 'src/app/shared/models/core.model';
import { Status } from 'src/app/shared/models/status.enum';

@Component({
  selector: 'app-warmed-dialog',
  templateUrl: './warmed-dialog.component.html',
  styleUrls: ['./warmed-dialog.component.scss'],
})
export class WarmedDialogComponent implements OnInit {
  formGroup!: FormGroup;
  status = Status;

  constructor(
    public dialogRef: MatDialogRef<WarmedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Core
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      status: new FormControl(this.data.status, [Validators.required]),
      isWarmed: new FormControl(this.data.isWarmed, [Validators.required]),
      baseURL: new FormControl(this.data.baseURL, [Validators.required]),
      exampleURL: new FormControl(this.data.exampleURL, [Validators.required]),
    });
    this.formGroup.get('baseURL')?.disable();
    this.formGroup.get('exampleURL')?.disable();
  }

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
