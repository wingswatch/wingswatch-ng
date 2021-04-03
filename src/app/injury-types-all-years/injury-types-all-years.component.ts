import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportingProvider } from '../providers/reporting.provider';
import { InjuryTypesForPastYears } from '../models/Reporting/InjuryTypesForPastYears';
import { IMultiSeriesNgX } from '../models/Reporting/MultiSeriesNgX';

import * as shape from 'd3'
import * as d3 from 'd3'

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
  view: any[] = [1100, 400];
  toggled = false;;
  // options
  legend: boolean = true;
  xTickFormat = d3.format("d"); //Removes commas from numbers
  curveStepBefore = shape.curveStepBefore;
  curveNatural = shape.curveNatural;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  gradient = true;
  showGridLines = false;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Number of Injuries';
  timeline: boolean = true;
  total: any[] = [];

  colorScheme = {
    domain: ['#A10A28','#C7B42C', '#aae3f5', '#AAAAAA', '#3e5560' ]
  };

  injuryTypes: InjuryTypesForPastYears[];

  constructor(private reportingProvider: ReportingProvider) {
    //Array.assign(this, { multi });
  }

  toggleTotal() {
    this.showWithTotal = !this.showWithTotal;
  }

  onSelect(event) {
    console.log(event);
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnInit(): void {
    this.getInjuryTypesAllYears();
  }

  toggleChart() {
    this.toggled = !this.toggled;
  }

  getInjuryTypesAllYears() {
    this.injuryTypes = null;
    var fatalArray = [];
    var seriousArray = [];
    var minorArray = [];
    var uninjuredArray = [];
    var totalArray = [];
    this.reportingProvider.getInjuryTypesAllYears().subscribe(
      res => {
        this.injuryTypes = res;
        console.log(this.injuryTypes);
        var total;
        for (var i = 0; i < this.injuryTypes.length; i++) {
          total = 
          this.injuryTypes[i].injuries.fatal + 
          this.injuryTypes[i].injuries.serious + 
          this.injuryTypes[i].injuries.minor;
          //this.injuryTypes[i].injuries.uninjured;

          fatalArray.push({"name": this.injuryTypes[i].year, "value": this.injuryTypes[i].injuries.fatal} )      
          seriousArray.push({"name": this.injuryTypes[i].year, "value": this.injuryTypes[i].injuries.serious})
          minorArray.push({"name": this.injuryTypes[i].year, "value": this.injuryTypes[i].injuries.minor})     
          uninjuredArray.push({"name": this.injuryTypes[i].year, "value": this.injuryTypes[i].injuries.uninjured}) 
          totalArray.push({"name": this.injuryTypes[i].year, "value": total})
        }


          this.multiWithTotal = [
            {
              "name": "Fatalities",
              "series": fatalArray
            },
            {
              "name": "Serious",
              "series": seriousArray
            },
            {
              "name": "Minor",
              "series": minorArray
            },
            // {
            //   "name": "Uninjured",
            //   "series": uninjuredArray
            // },
            {
              "name": "Total",
              "series": totalArray
            }
          ]


          this.multi = [
            {
              "name": "Fatalities",
              "series": fatalArray
            },
            {
              "name": "Serious",
              "series": seriousArray
            },
            {
              "name": "Minor",
              "series": minorArray
            },
            // {
            //   "name": "Uninjured",
            //   "series": uninjuredArray
            // }
          ]

        console.log({fatalArray, seriousArray, minorArray, uninjuredArray, totalArray})

      },
      err => console.error(err)
    )

  }

}
