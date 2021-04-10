import { Component, Input, OnInit } from '@angular/core';
import { Aircraft } from 'src/app/models/aircraft';

@Component({
  selector: 'app-event-details-aircraft',
  templateUrl: './event-details-aircraft.component.html',
  styleUrls: ['./event-details-aircraft.component.scss']
})
export class EventDetailsAircraftComponent implements OnInit {

   @Input() eventAircraft: Aircraft[];

  constructor() { }

  ngOnInit(): void {
  }

}
