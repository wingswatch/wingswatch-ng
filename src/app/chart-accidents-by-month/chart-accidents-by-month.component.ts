import { Component, ViewChild, ElementRef } from '@angular/core';
import { ReportingProvider } from '../providers/reporting.provider';
import { MonthlyAccidents } from '../models/Reporting/MonthlyAccidents';
import { InjuryTypesForPastMonths } from '../models/Reporting/InjuryTypeForPastMonths';

import * as shape from 'd3';

@Component({
  selector: 'app-chart-accidents-by-month',
  templateUrl: './chart-accidents-by-month.component.html',
  styleUrls: ['./chart-accidents-by-month.component.scss']
})
export class ChartAccidentsByMonthComponent {
  @ViewChild('selectYear') selectYear: ElementRef;

  multi: any[];
  view: [number, number] = [1100, 500];
  heatmapView: [number, number] = [500, 600];
  cardView: [number, number] = [700, 400];

  // options
  gradient = true;
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  curve = shape.curveCardinal;
  polarCurve = shape.curveCardinalClosed;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel: 'Months';
  yAxisLabel: 'Number of Accidents';
  timeline = true;
  currentYear: any;
  yearsList: Array<number>;
  monthlyAccidentSeries: any[];
  monthlyAccidentSeriesHeatmap: any[];
  monthlyAccidentSeriesFormatted: any[];
  monthlyAccidents: InjuryTypesForPastMonths[];
  isFormatted: boolean;
  showGridLines: boolean;
  loading: boolean;

  cardColor: '#232837';

  colorScheme = {
    domain: ['#A10A28','#C7B42C', '#aae3f5', '#AAAAAA', '#3e5560']
  };
  colorSchemeHeatmap = {
    domain: ['#A10A28','#C7B42C', '#aae3f5', '#AAAAAA', '#3e5560'].reverse()
  };
  colorSchemeNumberedCards = {
      domain: ['#aae3f5', '#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d']
  };

  constructor(private reportingProvider: ReportingProvider) {

    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    for (let i = this.currentYear - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }

  }

  onChangeYear(target: EventTarget | null) {

    if (target) {

      const year: number = (target as HTMLInputElement).value as unknown as number;

      this.getMonthlyAccidents(year);

    }

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

  getInjuryTypesAllMonths(year: number) {

    this.reportingProvider.getInjuryTypesAllMonths(year).subscribe(
      res => {

        this.monthlyAccidents = res;

        let fatalArr = [];
        let seriousArr = [];
        let minorArr = [];

        fatalArr = this.monthlyAccidents.map((el) => (
          {
            name: this.convertToMonth(el.month),
            value: el.injuries.fatal
          }
        ));

        seriousArr = this.monthlyAccidents.map((el) => (
          {
            name: this.convertToMonth(el.month),
            value: el.injuries.serious
          }
        ));

        minorArr = this.monthlyAccidents.map((el) => (
          {
            name: this.convertToMonth(el.month),
            value: el.injuries.minor
          }
        ));

        this.monthlyAccidentSeries = [
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

  getMonthlyAccidents(year: number) {

    this.loading = true;

    this.reportingProvider.getAccidentsByMonth(year).subscribe(
      (accidents: MonthlyAccidents[]) => {

        this.monthlyAccidentSeries = accidents.map((el) => (
           {
             name: el.monthId,
             value: el.accidentCount
            }
          )
        ).sort((a, b) => a.name - b.name);

        this.monthlyAccidentSeriesFormatted = this.monthlyAccidentSeries.map((el) => (
         {
            name: this.convertToMonth(el.name),
            value: el.value
         }
        ));

        this.getInjuryTypesAllMonths(year);

      },
      error => console.log(error)
    );

  }

}
