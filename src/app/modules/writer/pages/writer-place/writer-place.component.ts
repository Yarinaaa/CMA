import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { Core } from 'src/app/shared/models/core.model';
import { Status } from 'src/app/shared/models/status.enum';
import { WarmedDialogComponent } from '../../components/warmed-dialog/warmed-dialog.component';
import { WriterService } from '../../services/writer.service';

@UntilDestroy()
@Component({
  selector: 'app-writer-place',
  templateUrl: './writer-place.component.html',
  styleUrls: ['./writer-place.component.scss'],
})
export class WriterPlaceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'baseURL',
    'exampleURL',
    'credits',
    'linkType',
    'status',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Core> = new MatTableDataSource();
  constructor(private writerService: WriterService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCore();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCore() {
    this.writerService
      .getAllWarmed()
      .pipe(untilDestroyed(this))
      .subscribe((data: Core[]) => {
        this.dataSource.data = this.filterDateSource(data);
        console.log(data);
      });
  }

  filterDateSource(data: Core[]) {
    return data.filter(
      (core) => core.status === Status.Active && core.isWarmed
    );
  }

  editCore(core: Core) {
    const dialogRef = this.dialog.open(WarmedDialogComponent, {
      data: core,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.writerService
          .updateCoreById(core.id, result)
          .pipe(untilDestroyed(this))
          .subscribe((core: any) => {
            this.getAllCore();
          });
      }
    });
  }
}
