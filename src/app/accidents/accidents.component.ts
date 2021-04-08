import { Component, OnInit } from '@angular/core';
import { EventSearchResult } from '../models/event-search-result';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.scss']
})
export class AccidentsComponent implements OnInit {

  accidents: EventSearchResult[];

  constructor(private service: EventService) { }

  ngOnInit(): void {

    const searchVal = (document.getElementById('nav_searchTerm') as HTMLInputElement).value;

    if (searchVal) {
      this.filterEvents(searchVal);
    }
    else {
      this.getEvents();
    }

  }

  getEvents(): void {
    this.service.getEvents().subscribe(
      events => this.accidents = events
    );

  }

  filterEvents(searchTerms: string): void {

    if (!searchTerms) { return; }

    this.service.search(searchTerms).subscribe(
      result => this.accidents = result
    );
  }

}
