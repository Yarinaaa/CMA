import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WriterService } from 'src/app/modules/writer/services/writer.service';

@UntilDestroy()
@Component({
  selector: 'app-blocker',
  templateUrl: './blocker.component.html',
  styleUrls: ['./blocker.component.scss'],
})
export class BlockerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'baseURL', 'addedBy', 'added'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  constructor(private writerService: WriterService) {}

  ngOnInit(): void {
    this.getAllCore();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllCore() {
    this.writerService
      .getAllBlockers()
      .pipe(untilDestroyed(this))
      .subscribe((data: any[]) => {
        this.dataSource.data = data;
        console.log(data);
      });
  }
}
