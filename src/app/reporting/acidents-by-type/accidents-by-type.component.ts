import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { SeriesNgX } from 'src/app/models/Reporting/MultiSeriesNgX';

@Component({
  selector: 'app-accidents-by-type',
  templateUrl: './accidents-by-type.component.html',
  styleUrls: ['./accidents-by-type.component.scss']
})
export class AccidentsByTypeComponent implements OnInit {

  view: [number, number] = [900, 1500];
  eventsByType: SeriesNgX[];
  year = new Date().getFullYear() - 1;
  yearsList: Array<number> = [];

  yAxisLabel = 'Make/Model';
  xAxisLabel = 'Event Count';

  colorScheme = {
    domain: ['#7887AB', '#4F628E', '#2E4272', '#162955', '#061539']
  };

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {

    for (let i = this.year; i >= 2008; i--) {
      this.yearsList.push(i);
    };

    this.getEvents(this.year);

  }

  getEvents(year: number): void {

    this.reportingService.getAccidentByType(year).subscribe(
      accidents => {
        console.log(accidents);
        this.eventsByType = accidents.map(el => (
          {
            name: el.makeModel,
            value: el.eventCount
          }
        ));

        console.log(this.eventsByType);
      }
    );

  }

  onChangeYear(target: EventTarget | null): void {

    if (target) {

      const el = target as HTMLInputElement;
      const year = Number(el.value);

      this.getEvents(year);

    }

  }

}
