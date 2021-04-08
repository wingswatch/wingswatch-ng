import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { InjuryTypesForPastMonths } from '../../models/Reporting/InjuryTypeForPastMonths';
import { SeriesNgX } from '../../models/Reporting/MultiSeriesNgX';

import * as shape from 'd3';

@Component({
  selector: 'app-chart-accidents-by-month',
  templateUrl: './chart-accidents-by-month.component.html',
  styleUrls: ['./chart-accidents-by-month.component.scss']
})
export class ChartAccidentsByMonthComponent implements OnInit {
  @ViewChild('selectYear') selectYear: ElementRef;

  multi: any[];
  view: [number, number] = [1100, 500];
  heatmapView: [number, number] = [500, 600];
  cardView: [number, number] = [700, 400];

  curve = shape.curveCardinal;
  polarCurve = shape.curveCardinalClosed;
  xAxisLabel: 'Months';
  yAxisLabel: 'Number of Accidents';
  currentYear: number;
  yearsList: Array<number>;
  monthlyEventSeries: any[];
  injuryTypes: InjuryTypesForPastMonths[];
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

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {

    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    for (let i = this.currentYear - 1; i >= 2008; i--) {
      this.yearsList.push(i);
    };

    this.getMonthlyAccidents(this.currentYear - 1);

  }

  onChangeYear(target: EventTarget | null) {

    if (target) {

      const el = target as HTMLInputElement;
      const year = Number(el.value);

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

  getInjuryTypesAllMonths(year: number): void {

    this.reportingService.getInjuryTypesAllMonths(year).subscribe(
      injuryTypes => {

        this.injuryTypes = injuryTypes;

        const fatalArr: SeriesNgX[] = this.injuryTypes.map(i => (
          {
            name: this.convertToMonth(i.month),
            value: i.injuries.fatal
          }
        ));

        const seriousArr: SeriesNgX[] = this.injuryTypes.map(i => (
          {
            name: this.convertToMonth(i.month),
            value: i.injuries.serious
          }
        ));

        const minorArr: SeriesNgX[] = this.injuryTypes.map(i => (
          {
            name: this.convertToMonth(i.month),
            value: i.injuries.minor
          }
        ));

        this.monthlyEventSeries = [
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

    this.reportingService.getAccidentsByMonth(year).subscribe(
      accidents => {

        this.monthlyEventSeries = accidents.map((el) => (
           {
             name: el.monthId,
             value: el.eventCount
            }
          )
        ).sort((a, b) => a.name - b.name);

        this.getInjuryTypesAllMonths(year);

      }
    );

  }

}