import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccidentDetails } from '../models/accident-details';
import { AccidentService } from '../services/accident.service';
import { Accident } from '../models/accident';
import { Location } from '@angular/common';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.css']
})
export class AccidentDetailsComponent implements OnInit {

  @ViewChild('mapRef', { static: false }) mapElement: ElementRef;

  public eventId: string;
  public accidentDetails: AccidentDetails;
  public accident: Accident;
  public loadingComplete: boolean;
  public reportIssued: boolean;

  private mapLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private accidentService: AccidentService,
    private location: Location) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {

      // Get our event ID from the URL
      this.eventId = params.id;

      // Replace the browswer URL with the current page
      this.location.replaceState('/accident-details/' + this.eventId);

      this.getAccident(this.eventId);
      this.getFullReport(this.eventId);

    });

  }

  getAccident(eventId: string) {
    console.log('getAccident');
    this.accidentService.getAccident(eventId).subscribe(
      result => {
        this.accident = result;
        console.log('Accident retrieved successfully');
        this.loadingComplete = (this.accident != null) && (this.accidentDetails != null);

        if (this.loadingComplete) {
          this.renderMap();
        }

      },
      error => console.error(error)
    );
  }

  getFullReport(eventId: string) {

    console.log('getFullReport');

    this.accidentService.getFullReport(eventId).subscribe(
      result => {
        this.accidentDetails = result;
        console.log('Full report retreived succesfully.');
        this.loadingComplete = (this.accident != null) && (this.accidentDetails != null);
        this.reportIssued = this.loadingComplete &&
        (this.accidentDetails != null &&
          this.accidentDetails.analysis !== 'No report currently issued.');

        if (this.loadingComplete) {
          this.renderMap();
        }

      },
      error => console.error(error)
    );

  }

  renderMap() {

    if (this.accident && this.accident.latitude && this.accident.longitude) {

      console.log('renderMap');

      (window as any).initMap = () => {
        this.loadMap();
      };

      if (!window.document.getElementById('google-map-script')) {
        if (!this.mapLoaded) {
          this.createMapElement();
        }
      } else {
        this.loadMap();
      }

    }

  }

  createMapElement() {

    console.log('createMapElement');

    const scriptElements = window.document.getElementsByTagName('script');

    for (let i = 0; i < scriptElements.length - 1; i++) {
      if (scriptElements[i].id === 'google-map-script') {
        console.log('google-map-script detected, removing');
        scriptElements[i].remove();
      }
    }

    const s = window.document.createElement('script');

    s.id = 'google-map-script';
    s.type = 'text/javascript';
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAB_TCx0r3XRweCaJZ6-JT-O6F_mJ9Z_XY&callback=initMap';

    window.document.body.appendChild(s);

  }


  loadMap = () => {

    console.log('loadMap');

    const google = (window as any).google;

    if (!this.mapElement) {
      this.createMapElement();
    }

    if (!this.mapElement || this.mapLoaded) {

      if (!this.mapElement) {
        console.log('No mapElement, returning');
      } else {
        console.log('mapLoaded, returning.');
      }

      return;

    }

    const map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: this.accident.latitude, lng: this.accident.longitude },
      zoom: 15
    });

    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);

    const marker = new google.maps.Marker({
      position: { lat: this.accident.latitude, lng: this.accident.longitude },
      map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });


    this.mapLoaded = true;

  };

}
