import { Component, OnInit } from '@angular/core';
import { Accident } from '../models/accident';
import { AccidentProvider } from '../providers/accident.provider';

@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.scss']
})
export class AccidentsComponent implements OnInit {

  accidents: Accident[];

  constructor(private accidentsProvider: AccidentProvider) { }

  ngOnInit() {

    const searchVal = (document.getElementById("nav_searchTerm") as HTMLInputElement).value;

    if (searchVal) {
      this.filterAccidents(searchVal);
    }
    else {
      console.log("Getting all reports");
      this.getAccidents();
    }

  }

  getAccidents() {
    this.accidentsProvider.getAccidents().subscribe(
      result => this.accidents = result,
      error => console.error(error)
    );

  }

  filterAccidents(searchTerms: string) {

    if (!searchTerms) { return; }

    this.accidentsProvider.search(searchTerms).subscribe(
      result => this.accidents = result,
      error => console.error(error)
    );
  }

  clickHeader(event) {
    console.log(event.srcElement.innerHTML);
  }

}
