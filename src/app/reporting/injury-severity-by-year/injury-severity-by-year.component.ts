import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { InjurySeverityByYear } from '../../models/Reporting/InjurySeverityByYear';
import { MultiSeriesNgX, SeriesNgX } from '../../models/Reporting/MultiSeriesNgX';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-injury-severity-by-year',
  templateUrl: './injury-severity-by-year.component.html',
  styleUrls: ['./injury-severity-by-year.component.scss']
})
export class InjurySeverityByYearComponent implements OnInit {
  @ViewChild('selectYear') selectYear: ElementRef;

  currentYear: number;
  yearsList: Array<number>;
  multi: MultiSeriesNgX[];
  view: [number, number] = [900, 300];
  injuryTypes: InjurySeverityByYear;
  single: SeriesNgX[];
  singleWithUninjured: SeriesNgX[];
  showWithUninjured: boolean;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showGridLines = false;
  showXAxisLabel = true;
  xAxisLabel = 'Injuries';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Injuries';

  colorScheme = {
    domain: ['#A10A28','#C7B42C', '#AAAAAA', '#aae3f5', '#3e5560']
  };

  constructor(private reportingService: ReportingService, private activatedRoute: ActivatedRoute) {

    const d = new Date();

    this.currentYear = d.getFullYear();
    this.yearsList = [];

    for (let i = this.currentYear - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      const year = params.year as number;
      this.getInjuryTypeByYear(year);

    });
  }

  toggleUninjured(): void {
    this.showWithUninjured = !this.showWithUninjured;
  }

  getInjuryTypeByYear(year?: number): void {

    let selectedYear: number;

    if (!year) {
      selectedYear = this.selectYear.nativeElement.value;
    } else {
      selectedYear = year as number;
    }

    this.reportingService.getInjurySeverityByYear(selectedYear).subscribe(
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