import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WriterService } from 'src/app/modules/writer/services/writer.service';
import { Core } from 'src/app/shared/models/core.model';

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
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Core> = new MatTableDataSource();
  constructor(private writerService: WriterService) {}

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
}
