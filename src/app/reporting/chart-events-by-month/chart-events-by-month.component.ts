import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { MultiSeriesNgX, SeriesNgX } from '../../models/Reporting/MultiSeriesNgX';
import { Title } from '@angular/platform-browser';

import * as shape from 'd3';

@Component({
  selector: 'app-chart-events-by-month',
  templateUrl: './chart-events-by-month.component.html',
  styleUrls: ['./chart-events-by-month.component.scss']
})
export class ChartEventsByMonthComponent implements OnInit {

  multi: any[];
  view: [number, number] = [1100, 500];
  heatmapView: [number, number] = [500, 600];
  cardView: [number, number] = [700, 400];

  curve = shape.curveCardinal;
  polarCurve = shape.curveCardinalClosed;
  xAxisLabel: 'Months';
  yAxisLabel: 'Number of Events';
  currentYear: number;
  yearsList: Array<number>;

  injuryHeatmap: MultiSeriesNgX[];

  loading = true;

  constructor(private reportingService: ReportingService, private title: Title) { }

  ngOnInit() {

    this.title.setTitle('Events by Month');

    const d = new Date();
    this.currentYear = d.getFullYear() - 1;
    this.yearsList = [];

    for (let i = this.currentYear; i >= 2008; i--) {
      this.yearsList.push(i);
    };

    this.getInjuryTypesAllMonths(this.currentYear);


  }

  onChangeYear(selectedYear: number): void {
    this.getInjuryTypesAllMonths(selectedYear);
  }

  convertToMonth(monthId: number): string {

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];

    return months[monthId - 1];

  }

  getInjuryTypesAllMonths(year: number): void {

    this.reportingService.getInjuryTypesAllMonths(year).subscribe(
      injuryTypes => {

        const fatalArr: SeriesNgX[] = injuryTypes.map(i => (
          {
            name: this.convertToMonth(i.month),
            value: i.injuries.fatal
          }
        ));

        const seriousArr: SeriesNgX[] = injuryTypes.map(i => (
          {
            name: this.convertToMonth(i.month),
            value: i.injuries.serious
          }
        ));

        const minorArr: SeriesNgX[] = injuryTypes.map(i => (
          {
            name: this.convertToMonth(i.month),
            value: i.injuries.minor
          }
        ));

        this.injuryHeatmap = [
          {
            name: 'Fatalities',
            series: fatalArr
          },
          {
            name: 'Serious',
            series: seriousArr
          },
          {
            name: 'Minor',
            series: minorArr
          }
        ];

        this.loading = false;

      }
    );
  }

}
