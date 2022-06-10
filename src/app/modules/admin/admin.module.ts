import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './pages/core/core.component';
import { BlockerComponent } from './pages/blocker/blocker.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { UsersComponent } from './pages/users/users.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { StatisticDiagramComponent } from './components/statistic-diagram/statistic-diagram.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    CoreComponent,
    BlockerComponent,
    CommentsComponent,
    UsersComponent,
    StatisticComponent,
    UserDialogComponent,
    StatisticDiagramComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxChartsModule,
  ],
})
export class AdminModule {}
