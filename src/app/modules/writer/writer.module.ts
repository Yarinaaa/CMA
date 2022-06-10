import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WriterComponent } from './pages/writer/writer.component';
import { WriterPlaceComponent } from './pages/writer-place/writer-place.component';
import { WriterCommentDialogComponent } from './components/writer-comment-dialog/writer-comment-dialog.component';
import { WriterRoutingModule } from './writer-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NotActiveDialogComponent } from './components/not-active-dialog/not-active-dialog.component';
import { UpdateCoreDialogComponent } from './components/update-core-dialog/update-core-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { CoreComponent } from './pages/core/core.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { WarmedDialogComponent } from './components/warmed-dialog/warmed-dialog.component';

@NgModule({
  declarations: [
    WriterComponent,
    WriterPlaceComponent,
    WriterCommentDialogComponent,
    StatisticComponent,
    NotActiveDialogComponent,
    UpdateCoreDialogComponent,
    CoreComponent,
    WarmedDialogComponent,
  ],
  imports: [
    CommonModule,
    WriterRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    NgxChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
})
export class WriterModule {}
