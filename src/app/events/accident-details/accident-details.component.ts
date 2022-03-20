import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Narrative } from '../../models/narrative';
import { NtsbEvent } from '../../models/ntsb-event';
import { AircraftImage } from '../../models/aircraft-image';
import { Title } from '@angular/platform-browser';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.scss']
})
export class AccidentDetailsComponent implements OnInit, OnDestroy, AfterContentInit {

  public aircraftRenamed: boolean;
  public eventId: string;
  public narrative: Narrative;
  public narrativeLoaded: boolean;
  public event: NtsbEvent;
  public aircraftImage: AircraftImage;

  public map: Microsoft.Maps.Map;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private titleService: Title) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      // Get our event ID from the URL
      this.eventId = params.id;

      this.titleService.setTitle(`Accident Details - ${this.eventId}`);

      this.getEvent();
      this.getNarrative();

    });

  }

  ngOnDestroy() {

  }

  getEvent() {

    this.eventService.getEventDetail(this.eventId).subscribe(
      event => {

        this.event = event;

        this.getAircraftImage();

      }
    );
  }

  ngAfterContentInit(): void {
    window.addEventListener("load", () => this.renderMap());
  };
    
  renderMap(): void {

    if (!document.getElementById('myMap')) {
      throw new Error('map not found');
    }

    this.map = new Microsoft.Maps.Map('#myMap', {
      credentials: 'AuOjYiA3CEx_BGeplil9bCw0i_jE5XnfLwTmzcB6l7TxFRX7OBXhKzyxc_XbGGG6',
      center: new Microsoft.Maps.Location(this.event.latitudeDecimal, this.event.longitudeDecimal)
    });

    var pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter());
    this.map.entities.push(pushpin);

  }

  getNarrative() {

    this.eventService.getNarrative(this.eventId).subscribe(
      narrative => {
        this.narrative = narrative;
        this.narrativeLoaded = true;
      }
    );

  }

  getAircraftImage() {

    // TODO - Handle multiple aircraft
    this.eventService.getAircraftImage(this.event.aircraft[0].make, this.event.aircraft[0].model).subscribe(
      aci => {
          this.aircraftImage = aci;
          this.aircraftRenamed = (aci.renamedAircraft !== '');
      },
      error => {
        console.error(error);
      }

    );
  }

}
