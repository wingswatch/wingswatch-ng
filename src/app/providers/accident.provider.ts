import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accident } from '../models/accident';
import { Observable } from 'rxjs/internal/Observable';
import { Narrative } from '../models/narrative';
import { AircraftImage } from '../models/aircraft-image';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccidentProvider {

  accidents: Accident[];

  constructor(private http: HttpClient) { }

   getAccidents(): Observable<Accident[]> {
    return this.http.get<Accident[]>(environment.apiBaseUrl + 'accidents');
  }

  public getAccident(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(environment.apiBaseUrl + 'accidents/accident/' + eventId);
  }

  public getNarrative(eventId: string) {
    return this.http.get<Narrative>(environment.apiBaseUrl + 'accidents/narrative/' + eventId);
  }

  public search(searchTerms: string): Observable<Accident[]> {
    return this.http.get<Accident[]>(environment.apiBaseUrl + 'accidents/search/' + searchTerms);
  }

  public getAircraftImage(eventId: string, make: string, model: string): Observable<AircraftImage> {
    const url = `${environment.apiBaseUrl}Accidents/AircraftImage/${eventId}/${make}/${model}`;
    return this.http.get<AircraftImage>(url);
  }

}
