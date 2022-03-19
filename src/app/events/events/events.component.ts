import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PrimeTableColumn } from 'src/app/models/primeng.interfaces';
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

  constructor(private eventService: EventService, private title: Title) { }

  ngOnInit(): void {

    this.title.setTitle('WingsWatch - Events');

    this.eventService.getRecentEvents().subscribe(events => this.events = events);
   }
  
}
