import { Component, OnInit } from '@angular/core';
import { EventSearchResult } from '../models/event-search-result';
import { AccidentService } from '../services/accident.service';

@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.scss']
})
export class AccidentsComponent implements OnInit {

  accidents: EventSearchResult[];

  constructor(private service: AccidentService) { }

  ngOnInit() {

    const searchVal = (document.getElementById('nav_searchTerm') as HTMLInputElement).value;

    if (searchVal) {
      this.filterAccidents(searchVal);
    }
    else {
      this.getAccidents();
    }

  }

  getAccidents() {
    this.service.getAccidents().subscribe(
      result => this.accidents = result,
      error => console.error(error)
    );

  }

  filterAccidents(searchTerms: string) {

    if (!searchTerms) { return; }

    this.service.search(searchTerms).subscribe(
      result => this.accidents = result,
      error => console.error(error)
    );
  }

}
