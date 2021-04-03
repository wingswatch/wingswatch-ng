import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportingProvider } from '../providers/reporting.provider';
import { IInjurySeverityByYear } from '../models/Reporting/InjurySeverityByYear';
import { IMultiSeriesNgX, ISeriesNgX } from '../models/Reporting/MultiSeriesNgX';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-injury-severity-by-year',
  templateUrl: './injury-severity-by-year.component.html',
  styleUrls: ['./injury-severity-by-year.component.scss']
})
export class InjurySeverityByYearComponent implements OnInit {
  @ViewChild('selectYear') selectYear: ElementRef;
  sub$;
  currentYear;
  yearsList;
  multi: IMultiSeriesNgX[];
  view: any[] = [900, 300];
  injuryTypes: IInjurySeverityByYear;
  single: ISeriesNgX[];
  singleWithUninjured: ISeriesNgX[];
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

  constructor(private reportingProvider: ReportingProvider, private activatedRoute: ActivatedRoute) {
    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    // Add "All Time"
    this.yearsList.push(-1);

    for (let i = this.currentYear - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }

    //Object.assign(this, { single });
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

  ngOnInit(): void {
    this.sub$ = this.activatedRoute.params.subscribe(params => {
      const year: string = params['year'];
      this.getInjuryTypeByYear(year);
    })
  }

  toggleUninjured() {
    this.showWithUninjured = !this.showWithUninjured;
  }

  getInjuryTypeByYear(year?: string) {
    year ? null : year = this.selectYear.nativeElement.value;
    this.injuryTypes = null;
    this.reportingProvider.getInjurySeverityByYear(year).subscribe(
      res => {
        this.injuryTypes = res;

        this.singleWithUninjured = [
            {
              "name": "Fatal",
              "value": this.injuryTypes.fatal
            },
            {
              "name": "Serious",
              "value": this.injuryTypes.serious
            },
            {
              "name": "Minor",
              "value": this.injuryTypes.minor
            },
            {
              "name": "Uninjured",
              "value": this.injuryTypes.uninjured
            }
        ]

        this.single = [
          {
            "name": "Fatal",
            "value": this.injuryTypes.fatal
          },
          {
            "name": "Serious",
            "value": this.injuryTypes.serious
          },
          {
            "name": "Minor",
            "value": this.injuryTypes.minor
          }
        ]
      },
      err => {
        console.error(err);
      }
    )
  }
}
export var single = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  }
];

export var multi = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  },

  {
    "name": "France",
    "series": [
      {
        "name": "2010",
        "value": 5000002
      },
      {
        "name": "2011",
        "value": 5800000
      }
    ]
  }
];
