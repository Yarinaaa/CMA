import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WriterService } from 'src/app/modules/writer/services/writer.service';

@UntilDestroy()
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'baseURL', 'text', 'addedBy', 'added'];
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
      .getAllComments()
      .pipe(untilDestroyed(this))
      .subscribe((data: any[]) => {
        this.dataSource.data = data;
        console.log(data);
      });
  }
}
