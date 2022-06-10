import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SureDialogComponent } from './components/sure-dialog/sure-dialog.component';

@NgModule({
  declarations: [HeaderComponent, SureDialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
