import { Component, OnInit } from '@angular/core';
import { EventLocationCount } from '../../models/Reporting/EventLocationCount';
import { ReportingService } from '../../services/reporting.service';

@Component({
  selector: 'app-accidents-by-location',
  templateUrl: './accidents-by-location.component.html',
  styleUrls: ['./accidents-by-location.component.scss']
})
export class AccidentsByLocationComponent implements OnInit {

  eventLocationCounts: EventLocationCount[];

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {

    this.reportingService.getAccidentByLocation().subscribe(
      events => {
        this.eventLocationCounts = events;
      }
    );

  }
}
