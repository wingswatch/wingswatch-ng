import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accident } from '../models/accident';
import { Observable } from 'rxjs/internal/Observable';
import { AccidentDetails } from '../models/accident-details';
import { AircraftImage } from '../models/aircraft-image';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccidentProvider {

  accidents: Accident[];

  constructor(private http: HttpClient) { }

   getAccidents(): Observable<Accident[]> {
    return this.http.get<Accident[]>(environment.apiBaseUrl + 'accidents').pipe();
  }

  public getAccident(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(environment.apiBaseUrl + 'accidents/getaccident/' + eventId).pipe();
  }

  public getFullReport(eventId: string) {
    return this.http.get<AccidentDetails>(environment.apiBaseUrl + 'accidents/getfullreport/' + eventId).pipe();
  }

  public search(searchTerms: string): Observable<Accident[]> {

    return this.http.get<Accident[]>(environment.apiBaseUrl + 'accidents/search/' + searchTerms).pipe();

  }

  public getAircraftImage(eventId: string, make: string, model: string): Observable<AircraftImage> {

    const url = `${environment.apiBaseUrl}Accidents/GetAircraftImage/${eventId}/${make}/${model}`;

    return this.http.get<AircraftImage>(url).pipe();

  }

}
