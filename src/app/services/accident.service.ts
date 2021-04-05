import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accident } from '../models/accident';
import { Observable } from 'rxjs';
import { Narrative } from '../models/narrative';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  accidents: Accident[];

  constructor(private http: HttpClient) { }

  public getAccidents(): Observable<Accident[]> {
    return this.http.get<Accident[]>(environment.apiBaseUrl + 'accidents');
  }

  public getAccident(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(environment.apiBaseUrl  + `accidents/getaccident/${eventId}`);
  }

  public getNarrative(eventId: string): Observable<Narrative> {
    return this.http.get<Narrative>(environment.apiBaseUrl  + `accidents/narrative/${eventId}`);
  }

}
