import { Component, OnInit } from '@angular/core';
import { EventSearchResult } from '../../models/event-search-result';
import { EventService } from '../../services/event.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.scss']
})
export class AccidentsComponent implements OnInit {

  events: EventSearchResult[];

  constructor(private eventService: EventService, private searchService: SearchService) { }

  ngOnInit(): void {

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
