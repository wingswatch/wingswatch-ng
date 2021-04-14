import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EventSearchResult } from '../../models/event-search-result';
import { EventService } from '../../services/event.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: EventSearchResult[];

  constructor(private eventService: EventService, private searchService: SearchService, private title: Title) { }

  ngOnInit(): void {

    this.title.setTitle('WingsWatch - Events');

    this.searchService.currentSearchTerm$.subscribe(
      searchTerms => {
        this.performSearch(searchTerms);
      }
    );

    this.getEvents();

  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      events => this.events = events
    );

  }

  performSearch(searchTerms: string): void {

    // TODO: Add aircraft damage to result
    this.eventService.search(searchTerms).subscribe(
      result => this.events = result
    );
  }

}
