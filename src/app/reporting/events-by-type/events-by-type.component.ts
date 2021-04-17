import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../services/reporting.service';
import { SeriesNgX } from 'src/app/models/Reporting/MultiSeriesNgX';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-events-by-type',
  templateUrl: './events-by-type.component.html',
  styleUrls: ['./events-by-type.component.scss']
})
export class EventsByTypeComponent implements OnInit {

  view: [number, number] = [900, 1500];
  eventsByType: SeriesNgX[];
  year = new Date().getFullYear() - 1;
  yearsList: Array<number> = [];

  yAxisLabel = 'Make/Model';
  xAxisLabel = 'Event Count';

  constructor(private reportingService: ReportingService, private title: Title) { }

  ngOnInit() {

    this.title.setTitle('Events by Type');

    for (let i = this.year; i >= 2008; i--) {
      this.yearsList.push(i);
    };

    this.getEvents(this.year);

  }

  getEvents(year: number): void {

    this.reportingService.getAccidentByType(year).subscribe(
      accidents => {
        this.eventsByType = accidents.map(el => (
          {
            name: el.makeModel,
            value: el.eventCount
          }
        ));
      }
    );

  }

  onChangeYear(target: EventTarget | null): void {

    if (target) {

      const el = target as HTMLInputElement;
      this.year = Number(el.value);

      this.getEvents(this.year);

    }

  }

}
