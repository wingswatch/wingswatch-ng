import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Narrative } from '../../models/narrative';
import { NtsbEvent } from '../../models/ntsb-event';
import { AircraftImage } from '../../models/aircraft-image';
import { EventService } from '../../services/event.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-accident-details',
  templateUrl: './accident-details.component.html',
  styleUrls: ['./accident-details.component.scss']
})
export class AccidentDetailsComponent implements OnInit {

  public aircraftRenamed: boolean;
  public eventId: string;
  public narrative: Narrative;
  public narrativeLoaded: boolean;
  public event: NtsbEvent;
  public aircraftImage: AircraftImage;
  public loading = true;

  public map: Microsoft.Maps.Map;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private metaService: MetaService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      // Get our event ID from the URL
      this.eventId = params.id;

      this.getEvent();
      this.getNarrative();

    });

  }

  getEvent() {

    this.eventService.getEventDetail(this.eventId).subscribe(
      event => {

        this.event = event;

        this.metaService.updateTitle(`Accident Details - ${this.event.eventNumber}`);
        this.metaService.updateMetaInfo(`Accident Details - ${this.event.eventNumber}`, `NTSB, Event, ${this.event.eventNumber}`);

        this.getAircraftImage();

        this.enableMap();

        this.loading = false;

      }
    );
  }

  enableMap(): void {

    // Show the map when scrolled into view
    var observer = new IntersectionObserver(entries => {
      // isIntersecting is true when element and viewport are overlapping
      // isIntersecting is false when element and viewport don't overlap
      if(entries[0].isIntersecting === true)
        this.renderMap();
    }, { threshold: [0] });

    observer.observe(document.querySelector('#myMap') as Element);

  };
    
  renderMap(): void {

    // First, move our map to the correct position inside the location table
    // We need to do this because the div must be outside of any ngIf blocks on
    // initial page load in order to properly instantiate.  After that, we can move
    // it inside the conditional table.
    const mapDiv = document.getElementById('map-body') as Element;
    const map = document.getElementById('myMap') as Element;

    mapDiv.appendChild(map);

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
