import { Component, OnInit } from '@angular/core';
import { Accident } from '../models/accident';
import { AccidentService } from '../services/accident.service';

@Component({
  selector: 'app-accidents',
  templateUrl: './accidents.component.html',
  styleUrls: ['./accidents.component.css']
})
export class AccidentsComponent implements OnInit {

  accidents: Accident[];

  constructor(private accidentService: AccidentService) { }

  ngOnInit() {

    console.log('Getting all reports');
    this.getAccidents();

  }

  getAccidents() {
    this.accidentService.getAccidents().subscribe(
      result => this.accidents = result,
      error => console.error(error)
    );

  }

}
