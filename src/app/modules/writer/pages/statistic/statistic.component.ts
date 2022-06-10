import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { EMPTY, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { User } from 'src/app/shared/models/user.model';
import { WriterService } from '../../services/writer.service';

@UntilDestroy()
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  multi!: any[];
  view: any = [1200, 700];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Count of comments';
  timeline: boolean = true;
  comments!: Comment[];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  range = new FormGroup({
    start: new FormControl(moment().startOf('month')),
    end: new FormControl(moment().endOf('month')),
  });

  constructor(private ws: WriterService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        untilDestroyed(this),
        switchMap((user: User) => {
          if (!user) return EMPTY;
          return this.ws.getCommentsByID(user?.id).pipe(untilDestroyed(this));
        })
      )
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
        this.multi = [this.generateData(comments)];
      });
    this.range.statusChanges.subscribe(() => {
      const dates: { start: moment.Moment; end: moment.Moment } =
        this.range.value;
      if (!!dates.start && !!dates.end) {
        this.multi = [this.generateData(this.comments)];
      }
    });
  }

  generateData(comments: Comment[]): any {
    const dates: { start: moment.Moment; end: moment.Moment } =
      this.range.value;
    let tempComments = comments.filter((comment) => {
      return (
        +moment(comment.added) >= +dates.start.startOf('day') &&
        +moment(comment.added) <= +dates.end.endOf('day')
      );
    });
    const data: { name: string; series: any[] } = {
      name: 'Comments',
      series: [],
    };
    const commentData = tempComments.reduce((acc: any, item: Comment) => {
      const key = moment(item.added).format('MM/DD/yy');
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
    data.series = Object.keys(commentData).map((key) => {
      return {
        name: moment(key).toDate(),
        value: commentData[key],
      };
    });
    return data;
  }
}
