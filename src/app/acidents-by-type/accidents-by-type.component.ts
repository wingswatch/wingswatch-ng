import { Component, OnInit } from '@angular/core';
import { ReportingProvider } from '../providers/reporting.provider';
import { AccidentByType } from '../models/Reporting/AccidentByType';

@Component({
  selector: 'app-accidents-by-type',
  templateUrl: './accidents-by-type.component.html',
  styleUrls: ['./accidents-by-type.component.scss']
})
export class AccidentsByTypeComponent implements OnInit {

  view: [number, number] = [900, 1500];
  accidentsByType: any;

  colorScheme = {
    domain: ['#7887AB', '#4F628E', '#2E4272', '#162955', '#061539']
  };

  cardColor = '#232837';

  constructor(private reportingProvider: ReportingProvider) { }

  ngOnInit() {
    this.reportingProvider.getAccidentByType().subscribe(
      (accidents: AccidentByType[]) => {
        this.accidentsByType = accidents.map(el => (
          {
            name: el.makeModel,
            value: el.accidentCount
          }
        ));
      },
      error => console.log(error)
    );
  }

}
