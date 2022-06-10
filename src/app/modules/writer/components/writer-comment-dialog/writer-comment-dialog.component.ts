import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-writer-comment-dialog',
  templateUrl: './writer-comment-dialog.component.html',
  styleUrls: ['./writer-comment-dialog.component.scss'],
})
export class WriterCommentDialogComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<WriterCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      domain: new FormControl(this.data),
      URL: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
    this.formGroup.get('domain')?.disable();
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
