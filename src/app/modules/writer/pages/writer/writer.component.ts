import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { SureDialogComponent } from 'src/app/core/components/sure-dialog/sure-dialog.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotActiveDialogComponent } from 'src/app/modules/writer/components/not-active-dialog/not-active-dialog.component';
import { Core } from 'src/app/shared/models/core.model';
import { Status } from 'src/app/shared/models/status.enum';
import { WriterCommentDialogComponent } from '../../components/writer-comment-dialog/writer-comment-dialog.component';
import { WriterService } from '../../services/writer.service';
@UntilDestroy()
@Component({
  selector: 'app-writer',
  templateUrl: './writer.component.html',
  styleUrls: ['./writer.component.scss'],
})
export class WriterComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'baseURL',
    'exampleURL',
    'credits',
    'comments',
    'lastComment',
    'action',
  ];
  dataSource: MatTableDataSource<Core> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private writerService: WriterService,
    public dialog: MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getNowWarmed();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getNowWarmed() {
    this.writerService
      .getNotWarmed()
      .pipe(untilDestroyed(this))
      .subscribe((data: Core[]) => {
        this.dataSource.data = this.filterDateSource(data);
        console.log(data);
      });
  }

  filterDateSource(data: Core[]): Core[] {
    return data
      .filter((core) => {
        let max;
        if (data.length > 0) {
          max = Math.max(
            ...core.comments.map((comment) => +new Date(comment.added))
          );
          core.lastCommentUpdate = moment(max).toDate();
        }
        const daysDiff = moment().diff(moment(max), 'days');
        if (Number.isNaN(daysDiff) || daysDiff > 6) return true;
        return false;
      })
      .sort((core1, core2) => {
        if (core1.comments.length === 0 && core2.comments.length === 1) {
          return -1;
        }
        if (core2.comments.length === 0 && core1.comments.length === 1) {
          return 1;
        }
        if (core1.comments.length === 0 && core2.comments.length === 0) {
          return 0;
        }
        const max1 = Math.max(
          ...core1.comments.map((comment) => +new Date(comment.added))
        );
        const max2 = Math.max(
          ...core2.comments.map((comment) => +new Date(comment.added))
        );
        if (max1 > max2) {
          return 1;
        }
        if (max2 > max1) {
          return -1;
        }
        return 0;
      });
  }

  makeWarmed(core: Core) {
    const dialogRef = this.dialog.open(SureDialogComponent, {
      data: `Are you sure that ${core.baseURL} no need to warm?`,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.writerService
          .makeWarmed(core.id)
          .pipe(untilDestroyed(this))
          .subscribe((data: any) => {
            this.dataSource.data = this.dataSource.data.filter(
              (dataCore: any) => dataCore.id !== core.id
            );
          });
      }
    });
  }

  openAddComment(core: Core) {
    const dialogRef = this.dialog.open(WriterCommentDialogComponent, {
      data: core.baseURL,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.writerService
          .addComment({
            ...result,
            domain: core.id,
            addedBy: this.auth.user?.id,
          })
          .pipe(untilDestroyed(this))
          .subscribe((data: any) => {
            core.comments.push(data);
            this.dataSource.data = this.filterDateSource(this.dataSource.data);
          });
      }
    });
  }

  notActive(core: Core) {
    const dialogRef = this.dialog.open(NotActiveDialogComponent, {
      data: core.baseURL,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.writerService
          .updateCoreById(core.id, result)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (dataCore: any) => dataCore.id !== core.id
            );
          });
      }
    });
  }
}
