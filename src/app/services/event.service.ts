import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NtsbEvent } from '../models/ntsb-event';
import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative';
import { environment } from 'src/environments/environment';
import { AircraftImage } from '../models/aircraft-image';
import { EventSearchResult } from '../models/event-search-result';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public getEvents(): Observable<EventSearchResult[]> {
    return this.http.get<EventSearchResult[]>(environment.apiBaseUrl + 'events');
  }

  public getEventDetail(eventId: string): Observable<NtsbEvent> {
    return this.http.get<NtsbEvent>(environment.apiBaseUrl  + `events/detail/${eventId}`);
  }

  public getNarrative(eventId: string): Observable<Narrative> {
    return this.http.get<Narrative>(environment.apiBaseUrl  + `events/narrative/${eventId}`);
  }

  public search(searchTerms: string): Observable<EventSearchResult[]> {
    return this.http.get<EventSearchResult[]>(environment.apiBaseUrl + 'events/search/' + searchTerms);
  }

  public getAircraftImage(make: string, model: string): Observable<AircraftImage> {
    const url = `${environment.apiBaseUrl}events/AircraftImage/${make}/${model}`;
    return this.http.get<AircraftImage>(url);
  }

}
