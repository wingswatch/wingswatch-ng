import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accident } from '../models/accident';
import { Observable } from 'rxjs/internal/Observable';
import { AccidentDetails } from '../models/accident-details';
import { AircraftImage } from '../models/aircraft-image';

@Injectable({
  providedIn: 'root'
})
export class AccidentProvider {

  constructor(private http: HttpClient) { }

  accidents: Accident[];

  public getAccidents(): Observable<Accident[]> {
    return this.http.get<Accident[]>('api/Accidents').pipe();
  }

  public getAccident(eventId: string): Observable<Accident> {
    return this.http.get<Accident>('api/Accidents/GetAccident/' + eventId).pipe();
  }

  public getFullReport(eventId: string) {
    return this.http.get<AccidentDetails>('api/Accidents/GetFullReport/' + eventId).pipe();
  }

  public search(searchTerms: string): Observable<Accident[]> {

    return this.http.get<Accident[]>('api/Accidents/Search/' + searchTerms).pipe();

  }

  public getAircraftImage(eventId: string, make: string, model: string): Observable<AircraftImage> {

    const url = `api/Accidents/GetAircraftImage/${eventId}/${make}/${model}`;

    console.log('API URL: ' + url);

    return this.http.get<AircraftImage>(url).pipe();

  }

}
