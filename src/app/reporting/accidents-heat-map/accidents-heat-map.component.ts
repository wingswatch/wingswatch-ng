import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ReportingService } from '../../services/reporting.service';
import { EventCoordinates } from '../../models/event-coordinates';

declare global {
  interface Window {
    initMap: any;
    google: any;
  }
}

@Component({
  selector: 'app-accidents-heat-map',
  templateUrl: './accidents-heat-map.component.html',
  styleUrls: ['./accidents-heat-map.component.scss']
})
export class AccidentsHeatMapComponent implements OnDestroy {
  @ViewChild('mapRef') mapElement: ElementRef;
  @ViewChild('selectYear') selectYear: ElementRef;

  coordinates: EventCoordinates[];
  usCenter = { lat: 39.8282, lng: -98.5795 };
  yearsList: Array<number> = [];
  currentYear: number;

  private mapLoaded: boolean;

  constructor(
    private reportingService: ReportingService,
    private location: Location) {

    this.currentYear = new Date().getFullYear();

    for (let i = this.currentYear; i >= 1985; i--) {
      this.yearsList.push(i);
    }

   }

  ngOnDestroy() {
    window.document.getElementById('google-map-script')?.remove();
  }

  getCoordinatesByYear() {

    const year = this.selectYear.nativeElement.value as number;

    this.location.replaceState(`heat-map/${year}`);

    this.reportingService.getCoordinatesByYear(year).subscribe(
      ec => {
        this.coordinates = ec;
        this.renderMap();
      }
    );
  }

  renderMap() {
      console.log('renderMap');

      window.initMap = () => {
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

  createMapElement() {

    console.log('createMapElement');

    const s = window.document.createElement('script');

    s.id = 'google-map-script';
    s.type = 'text/javascript';
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAB_TCx0r3XRweCaJZ6-JT-O6F_mJ9Z_XY&libraries=visualization&callback=initMap';

    window.document.body.appendChild(s);

  }

  loadMap = () => {

    console.log('loadMap');

    if (!this.mapElement) {
      this.createMapElement();
    }

    const map = new window.google.maps.Map(this.mapElement.nativeElement, {
      center: this.usCenter,
      zoom: 4,
      mapTypeId: window.google.maps.MapTypeId.SATELLITE
    });

    const heatmap = new window.google.maps.visualization.HeatmapLayer({
      map,
      data: this.getCoordinates(),
      opacity: 1,
    });

    const markers = this.generateMarkers();
    const infowindow = new window.google.maps.InfoWindow();

    const updateOnZoom = () => {
      if (map.zoom > 8) {
        // hide the heatmap, show the markers
        heatmap.setMap(null);

        markers.forEach((el) => {
          el.setMap(map);

          el.addListener('click', () => {
              infowindow.close(); // Close previously opened infowindow
              infowindow.setContent(`
              <div id='popup' style='color: #000; padding: 5px;'>
                <h4>${el.location}</h4>
                <hr />
                <p><strong>Accident Number:</strong> ${el.accidentNumber}</p>
                <p><strong>Make:</strong> ${el.make}</p>
                <p><strong>Model:</strong> ${el.model}</p>
                <a title='Detailed Analysis' target='_blank' href=${el.url}>See Detailed Analysis</a>
              </div>
            `);
              infowindow.open(map, el);
            });
        });
      }
      else if (map.zoom < 8) {
        infowindow.close(); // Close previously opened infowindow
        heatmap.setMap(map); // hide the markers, show the heatmap
        markers.forEach((el) => {
          el.setMap(null);
        });
      }
      else if (map.zoom >= 5) {
        heatmap.set('maxIntensity', true);
      }
      else {
        heatmap.set('radius', 10);
        heatmap.set('maxIntensity', false);
      }
    };

    window.google.maps.event.addListener(map, 'zoom_changed', updateOnZoom);

    this.mapLoaded = true;

  };

  getCoordinates() {
    return this.coordinates.map((element) => (
      new window.google.maps.LatLng(element.latitude, element.longitude)
    ));
  }

  generateMarkers() {
    return this.coordinates.map((el) => (
      new window.google.maps.Marker({
        position: { lat: el.latitude, lng: el.longitude },
        url: `event-detail/${el.eventID}`,
        location: el.location,
        make: el.make,
        model: el.model,
        accidentNumber: el.accidentNumber}
      )
    ));
  }

}
