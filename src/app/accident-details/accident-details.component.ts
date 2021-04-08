import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Narrative } from '../models/narrative';
import { NtsbEvent } from '../models/ntsb-event';
import { Location } from '@angular/common';
import { AircraftImage } from '../models/aircraft-image';
import { Aircraft } from '../models/aircraft';
import { Title } from '@angular/platform-browser';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.scss']
})
export class AccidentDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('mapRef') mapElement: ElementRef;

  public aircraftRenamed: boolean;
  public eventId: string;
  public narrative: Narrative;
  public narrativeLoaded: boolean;
  public event: NtsbEvent;
  public aircraft: Aircraft;
  public loadingComplete: boolean;
  public aircraftImage: AircraftImage;

  private mapScriptCreated: boolean;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private location: Location,
    private titleService: Title) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      // Get our event ID from the URL
      this.eventId = params.id;

      // Replace the browswer URL with the current page
      //this.location.replaceState('/detail/' + this.eventId);

      this.titleService.setTitle(`Accident Details - ${this.eventId}`);

      this.getEvent(this.eventId);
      this.getNarrative(this.eventId);

    });

  }

  ngOnDestroy() {

    if (document.getElementById('google-map-script')) {
      document.getElementById('google-map-script')?.remove();
    }

  }

  getEvent(eventId: string) {

    this.eventService.getEventDetail(eventId).subscribe(
      event => {

        this.event = event;
        this.aircraft = this.event.aircraft[0];

        this.getAircraftImage();

        this.renderMap();

      }
    );
  }

  getNarrative(eventId: string) {

    this.eventService.getNarrative(eventId).subscribe(
      narrative => {
        this.narrative = narrative;
        this.narrativeLoaded = true;
      }
    );

  }

  renderMap() {

    this.createMapElement();

    console.log('renderMap called');

    window.initMap = () => {
      this.loadMap();
    };

  }

    createMapElement() {

    if (this.mapScriptCreated) {
      console.log('google-map-script exists in createMapElement - returning');
      return;
    }

    console.log('createMapElement');

    const s = window.document.createElement('script');

    s.id = 'google-map-script';
    s.type = 'text/javascript';
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAB_TCx0r3XRweCaJZ6-JT-O6F_mJ9Z_XY&callback=initMap';

    window.document.body.appendChild(s);

    this.mapScriptCreated = true;

    console.log('Map element created in createMapElement()');
  }

  getAircraftImage() {

    console.log('getting image');

    // TODO - Handle multiple aircraft
    this.eventService.getAircraftImage(this.aircraft.make, this.aircraft.model).subscribe(
      aci => {
          this.aircraftImage = aci;
          this.aircraftRenamed = (aci.renamedAircraft !== '');
      },
      error => {
        console.error('Could not get aircraft image for eventID' + this.eventId);
        console.error(error);
      }

    );
  }

  loadMap = () => {

    console.log('loadMap called');

    if (!this.mapElement) {
      console.error('could not find this.mapElement');
      return;
    }

    const map = new window.google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.event.latitude, lng: this.event.longitude },
      zoom: 15
    });

    map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE);

    new window.google.maps.Marker({
      position: { lat: this.event.latitude, lng: this.event.longitude },
      map,
      draggable: true,
      animation: window.google.maps.Animation.DROP
    });
  };

}
