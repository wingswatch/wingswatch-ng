import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportingProvider } from '../providers/reporting.provider';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

import * as shape from 'd3';

@Component({
  selector: 'app-chart-accidents-by-month',
  templateUrl: './chart-accidents-by-month.component.html',
  styleUrls: ['./chart-accidents-by-month.component.scss']
})
export class ChartAccidentsByMonthComponent implements OnInit {

  @ViewChild('selectYear') selectYear: ElementRef;

  multi: any[];
  view: any[] = [1100, 500];
  heatmapView: any[] = [500, 600];
  cardView: any[] = [700, 400];

  // options
  gradient: boolean = true;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  curve = shape.curveCardinal;
  polarCurve = shape.curveCardinalClosed;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Months';
  yAxisLabel: string = 'Number of Accidents';
  timeline: boolean = true;
  currentYear: any;
  yearsList: any[];
  monthlyAccidentSeries: any[];
  monthlyAccidentSeriesHeatmap: any[];
  monthlyAccidentSeriesFormatted: any[];
  monthlyAccidents: any = null;
  isFormatted: boolean = false;
  showGridLines: boolean = false;
  toggled = false;
  cardColor: string = '#232837';
  colorScheme = {
    domain: ['#A10A28','#C7B42C', '#aae3f5', '#AAAAAA', '#3e5560']
  };
  colorSchemeHeatmap = {
    //domain: ['#aae3f5', '#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d']
    domain: ['#A10A28','#C7B42C', '#aae3f5', '#AAAAAA', '#3e5560'].reverse()
  };
  colorSchemeNumberedCards = {
      domain: ['#aae3f5', '#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d']
  }

  constructor(
    private reportingProvider: ReportingProvider,
    private activatedRoute: ActivatedRoute) {
    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    // Add "All Time"
    this.yearsList.push(-1);

    for (let i = this.currentYear - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }
    //Object.assign(this, { multi });
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  private sub$: Subscription;

  ngOnInit() {
    this.sub$ = this.activatedRoute.params.subscribe(params => {
      const year: string = params['year'];
      this.getMonthlyAccidents(year);
      this.getInjuryTypesAllMonths(year);
    })
  }

  toggleChart() {
    this.toggled = !this.toggled;
  }


  convertToMonth(monthId: number) {
    var months = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sept",
      10: "Oct",
      11: "Nov",
      12: "Dec"
    };

    return months[monthId];
  }

  getInjuryTypesAllMonths(year?: string) {
    this.monthlyAccidents = null;
    year ? null : year = this.selectYear.nativeElement.value;

    this.reportingProvider.getInjuryTypesAllMonths(year).subscribe(
      res => {
        console.log(res)
        this.monthlyAccidents = res;
        let fatalArr = [];
        let seriousArr = [];
        let minorArr = [];

        fatalArr = this.monthlyAccidents.map((el) => {
          return {
            "name": this.convertToMonth(el.month),
            "value": el.injuries.fatal
          }
        })

        seriousArr = this.monthlyAccidents.map((el) => {
          return {
            "name": this.convertToMonth(el.month),
            "value": el.injuries.serious
          }
        })

        minorArr = this.monthlyAccidents.map((el) => {
          return {
            "name": this.convertToMonth(el.month),
            "value": el.injuries.minor
          }
        })

        this.monthlyAccidentSeries = [
          {
            "name": "Fatalities",
            "series": fatalArr
          },
          {
            "name": "Serious",
            "series": seriousArr
          },
          {
            "name": "Minor",
            "series": minorArr
          }
        ]
      console.log(this.monthlyAccidentSeriesHeatmap)
      },
      err => console.error(err)
    )
  }

  getMonthlyAccidents(year?: string) {

    // Used to ensure we see the loading spinner again when years are switched
    this.monthlyAccidents = null;

    year ? null : year = this.selectYear.nativeElement.value;

    this.reportingProvider.getAccidentsByMonth(year).subscribe(
      (accidents: any) => {
        this.monthlyAccidentSeries = accidents.map((el) => {
          return {
            "name": el.monthId,
            "value": el.accidentCount
          }
        }).sort((a, b) => { return a.name - b.name });

        this.monthlyAccidentSeriesFormatted = this.monthlyAccidentSeries.map((el) => {
          return {
            "name": this.convertToMonth(el.name),
            "value": el.value
          }
        })

        // this.monthlyAccidents = [{
        //   "name": "Total Accidents",
        //   "series": this.monthlyAccidentSeries
        // }]

      },
      error => console.log(error)
    );

  }

}

