import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Core } from 'src/app/shared/models/core.model';
import { UpdateCoreDialogComponent } from '../../components/update-core-dialog/update-core-dialog.component';
import { WriterService } from '../../services/writer.service';

@UntilDestroy()
@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
})
export class CoreComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'baseURL',
    'exampleURL',
    'credits',
    'linkType',
    'status',
    'addedBy',
    'added',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Core> = new MatTableDataSource();
  constructor(
    private writerService: WriterService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllCore();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCore() {
    this.writerService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((data: Core[]) => {
        this.dataSource.data = data;
        console.log(data);
      });
  }

  editCore(core: Core) {
    const dialogRef = this.dialog.open(UpdateCoreDialogComponent, {
      data: core,
    });
    dialogRef.afterClosed().subscribe((result: Partial<Core>) => {
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
