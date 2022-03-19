import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AccidentDetailsComponent implements OnInit, OnDestroy {

  public aircraftRenamed: boolean;
  public eventId: string;
  public narrative: Narrative;
  public narrativeLoaded: boolean;
  public event: NtsbEvent;
  public loadingComplete: boolean;
  public aircraftImage: AircraftImage;

  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };

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

    if (document.getElementById('google-map-script')) {
      document.getElementById('google-map-script')?.remove();
    }

  }

  getEvent() {

    this.eventService.getEventDetail(this.eventId).subscribe(
      event => {

        this.event = event;

        this.options.center = {lat: event.latitudeDecimal, lng: event.longitudeDecimal };

        this.getAircraftImage();

      }
    );
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
