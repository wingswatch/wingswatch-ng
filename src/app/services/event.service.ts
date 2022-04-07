import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NtsbEvent } from '../models/ntsb-event';
import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative';
import { environment } from 'src/environments/environment';
import { AircraftImage } from '../models/aircraft-image';
import { EventSearchResult, RecentEvent } from '../models/event-search-result';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public getRecentEvents(): Observable<RecentEvent[]> {
    const url = `${environment.apiBaseUrl}events/recents`;
    return this.http.get<RecentEvent[]>(url);
  }

  public getEventDetail(eventId: string): Observable<NtsbEvent> {
    const url = `${environment.apiBaseUrl}events/detail/${eventId}`;
    return this.http.get<NtsbEvent>(url);
  }

  public getNarrative(eventId: string): Observable<Narrative> {
    const url = `${environment.apiBaseUrl}events/narrative/${eventId}`;
    return this.http.get<Narrative>(url);
  }

  public search(searchTerms: string): Observable<EventSearchResult[]> {
    let params = new HttpParams();
    params = params.append('searchTerms', searchTerms);
    const url = `${environment.apiBaseUrl}events/search`;
    return this.http.get<EventSearchResult[]>(url, { params });
  }

  public getAircraftImage(make: string, model: string): Observable<AircraftImage> {
    const url = `${environment.apiBaseUrl}events/AircraftImage/${make}/${model}`;
    return this.http.get<AircraftImage>(url);
  }

}
