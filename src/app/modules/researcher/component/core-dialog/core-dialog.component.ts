import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Core } from 'src/app/shared/models/core.model';
import { LinkType } from 'src/app/shared/models/linkType.enum';
import { Status } from 'src/app/shared/models/status.enum';

@Component({
  selector: 'app-core-dialog',
  templateUrl: './core-dialog.component.html',
  styleUrls: ['./core-dialog.component.scss'],
})
export class CoreDialogComponent implements OnInit {
  formGroup!: FormGroup;
  status = Status;
  linkType = LinkType;

  constructor(
    public dialogRef: MatDialogRef<CoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Core>
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      status: new FormControl(
        this.data.status ? this.data.status : this.status.Active,
        [Validators.required]
      ),
      registerNeeded: new FormControl(
        this.data.registerNeeded ? this.data.registerNeeded : false,
        [Validators.required]
      ),
      linkType: new FormControl(
        this.data.linkType ? this.data.linkType : this.linkType['Do-follow'],
        [Validators.required]
      ),
      baseURL: new FormControl(this.data.baseURL, [Validators.required]),
      exampleURL: new FormControl(this.data.exampleURL, [Validators.required]),
      login: new FormControl(this.data.login || ''),
      password: new FormControl(this.data.password || ''),
    });
    this.formGroup.get('baseURL')?.disable();
    this.formGroup.get('exampleURL')?.disable();
  }

  getControl(name: string) {
    return this.formGroup.get(name) as FormControl;
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        ...this.formGroup.value,
        exampleURL: this.data.exampleURL,
        baseURL: this.data.baseURL,
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
