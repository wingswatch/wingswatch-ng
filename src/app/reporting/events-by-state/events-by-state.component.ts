import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventsByState } from 'src/app/models/Reporting/EventsByState';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-events-by-state',
  templateUrl: './events-by-state.component.html',
  styleUrls: ['./events-by-state.component.scss']
})
export class EventsByStateComponent implements OnInit {

  stateEventCounts: EventsByState[];
  year = new Date().getFullYear() - 1;

  constructor(private reportingService: ReportingService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Events by State');
  }

  getData(year: number): void {

    this.stateEventCounts = [];

    this.reportingService.getEventsByState(year).subscribe(
      events => {
        this.stateEventCounts = events;
      }
    );

  }

  onChangeYear(selectedYear: number): void {
    this.year = selectedYear;
    this.getData(selectedYear);
  }

}
