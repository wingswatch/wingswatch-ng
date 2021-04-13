import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { InjurySeverityByYear } from '../../models/Reporting/InjurySeverityByYear';
import { MultiSeriesNgX, SeriesNgX } from '../../models/Reporting/MultiSeriesNgX';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-injury-severity-by-year',
  templateUrl: './injury-severity-by-year.component.html',
  styleUrls: ['./injury-severity-by-year.component.scss']
})
export class InjurySeverityByYearComponent implements OnInit {

  year: number;
  yearsList: Array<number>;
  multi: MultiSeriesNgX[];
  view: [number, number] = [900, 300];
  injuryTypes: InjurySeverityByYear;
  single: SeriesNgX[];
  singleWithUninjured: SeriesNgX[];
  showWithUninjured: boolean;

  xAxisLabel = 'Injuries';
  yAxisLabel = 'Number of Injuries';

  colorScheme = {
    domain: ['#A10A28','#C7B42C', '#AAAAAA', '#aae3f5', '#3e5560']
  };

  constructor(private reportingService: ReportingService, private title: Title) { }

  ngOnInit(): void {

    this.title.setTitle('WingsWatch - NTSB Event Database');

    this.year = new Date().getFullYear() - 1;
    this.yearsList = [];

    for (let i = this.year - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }

    this.getInjuryTypeByYear();

  }

  toggleUninjured(): void {
    this.showWithUninjured = !this.showWithUninjured;
  }

  onChangeYear(target: EventTarget | null) {

    if (target) {

      const el = target as HTMLInputElement;
      this.year = Number(el.value);

      this.getInjuryTypeByYear();

    }

  }

  getInjuryTypeByYear(): void {

    this.reportingService.getInjurySeverityByYear(this.year).subscribe(
      res => {
        this.injuryTypes = res;

        this.singleWithUninjured = [
            {
              name: 'Fatal',
              value: this.injuryTypes.fatal
            },
            {
              name: 'Serious',
              value: this.injuryTypes.serious
            },
            {
              name: 'Minor',
              value: this.injuryTypes.minor
            },
            {
              name: 'Uninjured',
              value: this.injuryTypes.uninjured
            }
        ];

        this.single = [
          {
            name: 'Fatal',
            value: this.injuryTypes.fatal
          },
          {
            name: 'Serious',
            value: this.injuryTypes.serious
          },
          {
            name: 'Minor',
            value: this.injuryTypes.minor
          }
        ];
      },
      err => {
        console.error(err);
      }
    );
  }
}
