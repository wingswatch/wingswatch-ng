import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accident } from '../models/accident';
import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative';
import { environment } from 'src/environments/environment';
import { AircraftImage } from '../models/aircraft-image';
import { EventSearchResult } from '../models/event-search-result';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  accidents: Accident[];

  constructor(private http: HttpClient) { }

  public getAccidents(): Observable<EventSearchResult[]> {
    return this.http.get<EventSearchResult[]>(environment.apiBaseUrl + 'accidents');
  }

  public getAccidentDetail(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(environment.apiBaseUrl  + `accidents/accidentdetail/${eventId}`);
  }

  public getNarrative(eventId: string): Observable<Narrative> {
    return this.http.get<Narrative>(environment.apiBaseUrl  + `accidents/narrative/${eventId}`);
  }

  public search(searchTerms: string): Observable<EventSearchResult[]> {
    return this.http.get<EventSearchResult[]>(environment.apiBaseUrl + 'accidents/search/' + searchTerms);
  }

  public getAircraftImage(eventId: string, make: string, model: string): Observable<AircraftImage> {
    const url = `${environment.apiBaseUrl}Accidents/AircraftImage/${eventId}/${make}/${model}`;
    return this.http.get<AircraftImage>(url);
  }

}
