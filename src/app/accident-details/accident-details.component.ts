import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AccidentDetails } from '../models/accident-details';
import { AccidentProvider } from '../providers/accident.provider';
import { Accident } from '../models/accident';
import { Location } from '@angular/common';
import { AircraftImage } from '../models/aircraft-image';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.scss']
})
export class AccidentDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('mapRef') mapElement: ElementRef;

  public aircraftRenamed: boolean;
  public eventId: string;
  public accidentDetails: AccidentDetails;
  public accident: Accident;
  public loadingComplete: boolean;
  public reportIssued: boolean;
  public aircraftImage: AircraftImage;

  constructor(
    private route: ActivatedRoute,
    private accidentProvider: AccidentProvider,
    private location: Location) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      // Get our event ID from the URL
      this.eventId = params.id;

      // Replace the browswer URL with the current page
      this.location.replaceState('/accident-details/' + this.eventId);

      this.getAccident(this.eventId);
      this.getFullReport(this.eventId);

    });

  }

  ngOnDestroy() {

    if (document.getElementById('google-map-script')) {
      document.getElementById('google-map-script')?.remove();
    }

  }

  getAccident(eventId: string) {

    if (this.accident) {
      return;
    }

    console.log('getAccident');

    this.accidentProvider.getAccident(eventId).subscribe(
      result => {
        this.accident = result;
      },
      error => {
        if (!error.ok) {
          return;
        }
        else {
          console.log(error);
        }
      }
    );
  }

  getFullReport(eventId: string) {

    this.accidentProvider.getFullReport(eventId).subscribe(
      result => {
        this.accidentDetails = result;
        this.loadingComplete = (this.accident !== null) && (this.accidentDetails !== null);
        this.reportIssued = this.loadingComplete && 
        (this.accidentDetails !== null && this.accidentDetails.analysis !== 'No report currently issued.');

        if (this.loadingComplete) {
          this.getAircraftImage(this.eventId);
          this.renderMap();
        }

      },
      error => console.error(error)
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

    if (window.document.getElementById('google-map-script')) {
      console.log('google-map-script exists in createMapElement - returning');
      return;
    }

    console.log('createMapElement');

    const s = window.document.createElement('script');

    s.id = 'google-map-script';
    s.type = 'text/javascript';
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAB_TCx0r3XRweCaJZ6-JT-O6F_mJ9Z_XY&callback=initMap';

    window.document.body.appendChild(s);

    console.log('Map element created in createMapElement()');
  }

  getAircraftImage(eventId: string) {

    this.accidentProvider.getAircraftImage(eventId, this.accident.make, this.accident.model).subscribe(
      result => {
        this.aircraftImage = result;
        this.aircraftRenamed = (result.renamedAircraft !== '');
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
      center: { lat: this.accident.latitude, lng: this.accident.longitude },
      zoom: 15
    });

    map.setMapTypeId(window.google.maps.MapTypeId.SATELLITE);

    new window.google.maps.Marker({
      position: { lat: this.accident.latitude, lng: this.accident.longitude },
      map,
      draggable: true,
      animation: window.google.maps.Animation.DROP
    });
  };

}
