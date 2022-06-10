import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { User } from 'src/app/shared/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-statistic-diagram',
  templateUrl: './statistic-diagram.component.html',
  styleUrls: ['./statistic-diagram.component.scss'],
})
export class StatisticDiagramComponent implements OnInit {
  @Input() multi!: any[];
  @Input() yAxisLabel!: string;
  @Input() users!: User[];
  @Input() title!: string;

  diagramMulti!: any[];
  view: any = [1200, 700];
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  userController!: FormControl;

  range = new FormGroup({
    start: new FormControl(moment().startOf('month')),
    end: new FormControl(moment().endOf('month')),
  });

  constructor() {}

  ngOnInit(): void {
    this.diagramMulti = this.multi;
    this.userController = new FormControl(this.users);
    this.userController.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((users: User[]) => {
        this.diagramMulti = users.map((user) => {
          const index = this.multi.findIndex(
            (data) => data.name === user.login
          );
          if (index > -1) {
            return {
              name: this.multi[index].name,
              series: this.generateData(this.multi[index].series),
            };
          }
          return { name: user.login, series: [] };
        });
        console.log(this.diagramMulti);
      });

    this.range.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      if (!this.range.value.start || !this.range.value.end) {
        return;
      }
      this.diagramMulti = this.userController.value.map((user: any) => {
        const index = this.multi.findIndex((data) => data.name === user.login);
        if (index > -1) {
          return {
            name: this.multi[index].name,
            series: this.generateData(this.multi[index].series),
          };
        }
        return { name: user.login, series: [] };
      });
      console.log(this.diagramMulti);
    });
  }

  generateData(diagramData: any[]): any {
    const dates: { start: moment.Moment; end: moment.Moment } =
      this.range.value;
    let tempData = diagramData.filter((item) => {
      return (
        +moment(item.name) >= +dates.start.startOf('day') &&
        +moment(item.name) <= +dates.end.endOf('day')
      );
    });
    return tempData;
  }
}
