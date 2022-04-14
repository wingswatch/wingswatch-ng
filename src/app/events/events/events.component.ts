import { Component, OnInit } from '@angular/core';
import { PrimeTableColumn } from 'src/app/models/primeng.interfaces';
import { MetaService } from 'src/app/services/meta.service';
import { RecentEvent } from '../../models/event-search-result';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: RecentEvent[];

  columns: PrimeTableColumn[] = [
    { header: 'Event', field: 'eventNumber', filterType: 'text' },
    { header: 'Event Date', field: 'eventDate', filterType: 'date' },
    { header: 'Event Type', field: 'investigationType', filterType: 'text' },
    { header: 'Aircraft Type', field: 'make', filterType: 'text' },
  ];

  constructor(private eventService: EventService, private metaService: MetaService) { }

  ngOnInit(): void {

    this.metaService.updateTitle('Events');

    this.eventService
      .getRecentEvents()
      .subscribe(events => this.events = events);

   }
  
}
