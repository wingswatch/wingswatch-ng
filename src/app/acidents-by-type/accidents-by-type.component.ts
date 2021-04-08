import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../services/reporting.service';
import { EventByType } from '../models/Reporting/EventByType';

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

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {

    // TODO - We need a date selection on this page
    this.reportingService.getAccidentByType(2020).subscribe(
      accidents => {
        this.accidentsByType = accidents.map(el => (
          {
            name: el.makeModel,
            value: el.accidentCount
          }
        ));
      }
    );

  }

}
