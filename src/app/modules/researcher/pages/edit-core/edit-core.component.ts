import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { WriterService } from 'src/app/modules/writer/services/writer.service';
import { Core } from 'src/app/shared/models/core.model';
import { User } from 'src/app/shared/models/user.model';
import { CoreDialogComponent } from '../../component/core-dialog/core-dialog.component';
import { ResearchService } from '../../services/research.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-core',
  templateUrl: './edit-core.component.html',
  styleUrls: ['./edit-core.component.scss'],
})
export class EditCoreComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'baseURL',
    'exampleURL',
    'credits',
    'linkType',
    'status',
    'added',
    'action',
  ];
  dataSource: MatTableDataSource<Core> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rs: ResearchService,
    private auth: AuthService,
    public dialog: MatDialog,
    private ws: WriterService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getLast500Core();
  }

  getLast500Core() {
    this.auth.user$
      .pipe(
        untilDestroyed(this),
        switchMap((user: User) => {
          if (!user) return EMPTY;
          return this.rs.getCoreByID(user?.id, 500).pipe(untilDestroyed(this));
        })
      )
      .subscribe((data: Core[]) => {
        this.dataSource.data = data;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editStatus(core: Core) {
    const dialogRef = this.dialog.open(CoreDialogComponent, {
      data: core,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ws
          .updateCoreById(core.id, result)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            const index = this.dataSource.data.findIndex(
              (item) => item.id === core.id
            );
            this.dataSource.data[index] = { ...core, ...result };
            this.dataSource.data = [...this.dataSource.data];
            this.cd.detectChanges();
          });
      }
    });
  }
}
