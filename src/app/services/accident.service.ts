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

  constructor(private http: HttpClient) { }

  public getAccidents(): Observable<Accident[]> {
    const url = 'http://wingswatch-api.azurewebsites.net/api/accidents';
    return this.http.get<Accident[]>(url).pipe();
  }

  public getAccident(eventId: string): Observable<Accident> {
    return this.http.get<Accident>('api/Accidents/GetAccident/' + eventId).pipe();
  }

  public getFullReport(eventId: string) {
    return this.http.get<AccidentDetails>('api/Accidents/GetFullReport/' + eventId).pipe();
  }

}
