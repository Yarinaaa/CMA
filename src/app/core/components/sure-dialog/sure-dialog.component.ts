import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sure-dialog',
  templateUrl: './sure-dialog.component.html',
  styleUrls: ['./sure-dialog.component.scss'],
})
export class SureDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
