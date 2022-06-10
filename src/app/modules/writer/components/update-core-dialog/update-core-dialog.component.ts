import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Core } from 'src/app/shared/models/core.model';
import { LinkType } from 'src/app/shared/models/linkType.enum';
import { Status } from 'src/app/shared/models/status.enum';

@Component({
  selector: 'app-update-core-dialog',
  templateUrl: './update-core-dialog.component.html',
  styleUrls: ['./update-core-dialog.component.scss'],
})
export class UpdateCoreDialogComponent implements OnInit {
  formGroup!: FormGroup;
  status = Status;
  linkType = LinkType;

  constructor(
    public dialogRef: MatDialogRef<UpdateCoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Core
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      status: new FormControl(this.data.status, [Validators.required]),
      registerNeeded: new FormControl(this.data.registerNeeded, [
        Validators.required,
      ]),
      linkType: new FormControl(this.data.linkType, [Validators.required]),
      baseURL: new FormControl(this.data.baseURL, [Validators.required]),
      exampleURL: new FormControl(this.data.exampleURL, [Validators.required]),
      login: new FormControl(this.data.login),
      password: new FormControl(this.data.password),
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
