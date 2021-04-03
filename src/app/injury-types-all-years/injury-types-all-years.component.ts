import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportingProvider } from '../providers/reporting.provider';
import { InjuryTypesForPastYears } from '../models/Reporting/InjuryTypesForPastYears';
import { ISeriesNgX } from '../models/Reporting/MultiSeriesNgX';

import * as shape from 'd3';
import * as d3 from 'd3';

@Component({
  selector: 'app-injury-types-all-years',
  templateUrl: './injury-types-all-years.component.html',
  styleUrls: ['./injury-types-all-years.component.scss']
})
export class InjuryTypesAllYearsComponent implements OnInit {
  @ViewChild('totalCheckbox') totalCheckbox: ElementRef;

  multi: any[];
  multiWithTotal: any[];
  showWithTotal: boolean;
  view: [number, number] = [1100, 400];
  toggled = false;;
  // options
  legend = true;
  xTickFormat = d3.format('d'); //Removes commas from numbers
  curveStepBefore = shape.curveStepBefore;
  curveNatural = shape.curveNatural;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  gradient = true;
  showGridLines=  false;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Year';
  yAxisLabel = 'Number of Injuries';
  timeline = true;
  total: any[] = [];

  colorScheme = {
    domain: ['#A10A28','#C7B42C', '#aae3f5', '#AAAAAA', '#3e5560' ]
  };

  injuryTypes: InjuryTypesForPastYears[];

  constructor(private reportingProvider: ReportingProvider) { }

  toggleTotal() {
    this.showWithTotal = !this.showWithTotal;
  }

  ngOnInit(): void {
    this.getInjuryTypesAllYears();
  }

  toggleChart() {
    this.toggled = !this.toggled;
  }

  getInjuryTypesAllYears() {

    const fatalArray: Array<ISeriesNgX> = [];
    const seriousArray: Array<ISeriesNgX> = [];
    const minorArray: Array<ISeriesNgX> = [];
    const uninjuredArray: Array<ISeriesNgX> = [];
    const totalArray: Array<ISeriesNgX> = [];

    this.reportingProvider.getInjuryTypesAllYears().subscribe(
      res => {

        this.injuryTypes = res;

        let total: number;

        for (const injuryType of this.injuryTypes) {

          total =
            injuryType.injuries.fatal +
            injuryType.injuries.serious +
            injuryType.injuries.minor;

          const year = injuryType.year;

          fatalArray.push({name: year, value: injuryType.injuries.fatal });
          seriousArray.push({name: year, value: injuryType.injuries.serious });
          minorArray.push({name: year, value: injuryType.injuries.minor });
          uninjuredArray.push({name: year, value: injuryType.injuries.uninjured });

          totalArray.push({name: year, value: total });

        }

          this.multiWithTotal = [
            {
              name: 'Fatalities',
              series: fatalArray
            },
            {
              name: 'Serious',
              series: seriousArray
            },
            {
              name: 'Minor',
              series: minorArray
            },
            // {
            //   name: Uninjured,
            //   series: uninjuredArray
            // },
            {
              name: 'Total',
              series: totalArray
            }
          ];

          this.multi = [
            {
              name: 'Fatalities',
              series: fatalArray
            },
            {
              name: 'Serious',
              series: seriousArray
            },
            {
              name: 'Minor',
              series: minorArray
            },
            // {
            //   name: Uninjured,
            //   series: uninjuredArray
            // }
          ];

      },
      err => console.error(err)
    );

  }

}
