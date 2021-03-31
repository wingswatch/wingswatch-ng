import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accident } from '../models/accident';
import { Observable } from 'rxjs';
import { AccidentDetails } from '../models/accident-details';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  accidents: Accident[];

  private apiPrefix = 'https://wingswatch-api.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  public getAccidents(): Observable<Accident[]> {
    return this.http.get<Accident[]>(this.apiPrefix + 'accidents/');
  }

  public getAccident(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(this.apiPrefix + `accidents/getaccident/${eventId}`);
  }

  public getFullReport(eventId: string): Observable<AccidentDetails> {
    return this.http.get<AccidentDetails>(this.apiPrefix + `/accidents/getfullreport/${eventId}`);
  }

}
