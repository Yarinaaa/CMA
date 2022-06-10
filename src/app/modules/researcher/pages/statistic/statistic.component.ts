import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { EMPTY, switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Core } from 'src/app/shared/models/core.model';
import { User } from 'src/app/shared/models/user.model';
import { ResearchService } from '../../services/research.service';

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
  yAxisLabel: string = 'Count of cores';
  timeline: boolean = true;
  core!: Core[];

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  range = new FormGroup({
    start: new FormControl(moment().startOf('month')),
    end: new FormControl(moment().endOf('month')),
  });

  constructor(private rs: ResearchService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        untilDestroyed(this),
        switchMap((user: User) => {
          if (!user) return EMPTY;
          return this.rs.getCoreByID(user?.id).pipe(untilDestroyed(this));
        })
      )
      .subscribe((core: Core[]) => {
        this.core = core;
        this.multi = [this.generateData(core)];
      });
    this.range.statusChanges.subscribe(() => {
      const dates: { start: moment.Moment; end: moment.Moment } =
        this.range.value;
      if (!!dates.start && !!dates.end) {
        this.multi = [this.generateData(this.core)];
      }
    });
  }

  generateData(core: Core[]): any {
    const dates: { start: moment.Moment; end: moment.Moment } =
      this.range.value;
    let tempCore = core.filter((core) => {
      return (
        +moment(core.updated) >= +dates.start.startOf('day') &&
        +moment(core.updated) <= +dates.end.endOf('day')
      );
    });
    const data: { name: string; series: any[] } = {
      name: 'Cores',
      series: [],
    };
    const coreData = tempCore.reduce((acc: any, item: Core) => {
      const key = moment(item.updated).format('MM/DD/yy');
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});
    data.series = Object.keys(coreData).map((key) => {
      return {
        name: moment(key).toDate(),
        value: coreData[key],
      };
    });
    return data;
  }
}
