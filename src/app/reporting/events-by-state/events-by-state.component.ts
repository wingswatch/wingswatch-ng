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

  constructor(private reportingService: ReportingService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Events by State');
    this.getData();
  }

  getData(): void {

    this.stateEventCounts = [];

    this.reportingService.getEventsByState().subscribe(
      events => {
        this.stateEventCounts = events;
      }
    );

  }

}
