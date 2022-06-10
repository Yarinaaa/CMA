import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { UsersService } from 'src/app/core/services/users.service';
import { WriterService } from 'src/app/modules/writer/services/writer.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { Core } from 'src/app/shared/models/core.model';
import { User } from 'src/app/shared/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  multiComments!: any[];
  multiCore!: any[];
  users!: User[];

  usersWriter!: User[];
  usersResearch!: User[];

  // options

  comments!: Comment[];
  core!: Core[];

  constructor(private ws: WriterService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
    this.getComments();
    this.getCore();
  }

  getUsers() {
    this.usersService
      .getAllUsers()
      .pipe(untilDestroyed(this))
      .subscribe((users) => {
        this.users = users;
        this.usersWriter = this.users.filter((user) => user.role === 'wr');
        this.usersResearch = this.users.filter((user) => user.role === 'rs');
        if (this.comments) {
          this.multiComments = this.generateDiagramData(
            this.comments,
            this.usersWriter
          );
        }
        if (this.core) {
          this.multiCore = this.generateDiagramData(
            this.core,
            this.usersResearch
          );
        }
      });
  }

  getComments() {
    this.ws
      .getAllComments()
      .pipe(untilDestroyed(this))
      .subscribe((comments) => {
        this.comments = comments;
        if (this.usersWriter) {
          this.multiComments = this.generateDiagramData(
            this.comments,
            this.usersWriter
          );
        }
      });
  }

  getCore() {
    this.ws
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((core) => {
        this.core = core;
        if (this.usersResearch) {
          this.multiCore = this.generateDiagramData(
            this.core,
            this.usersResearch
          );
        }
      });
  }

  generateDiagramData(diagramData: any[], users: User[]) {
    const data = users.map((user) => {
      return {
        name: user.login,
        series: this.generateData(diagramData, user.id),
      };
    });
    return data;
  }

  generateData(tempData: any[], id: number): any {
    const newData = tempData.reduce(
      (acc: any, item: { added: string; addedBy: User }) => {
        if (item?.addedBy?.id !== id) {
          return acc;
        }
        const key = moment(item.added).format('MM/DD/yy');
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key]++;
        return acc;
      },
      {}
    );
    return Object.keys(newData).map((key) => {
      return {
        name: moment(key).toDate(),
        value: newData[key],
      };
    });
  }
}
