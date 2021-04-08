import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventCoordinates } from '../models/event-coordinates';
import { Observable } from 'rxjs/internal/Observable';
import { NtsbEvent } from '../models/ntsb-event';
import { MonthlyEvents } from '../models/Reporting/MonthlyEvents';
import { EventByType } from '../models/Reporting/EventByType';
import { EventLocationCount } from '../models/Reporting/EventLocationCount';
import { InjurySeverityByYear } from '../models/Reporting/InjurySeverityByYear';
import { InjuryTypesForPastMonths } from '../models/Reporting/InjuryTypeForPastMonths';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http: HttpClient) { }

  getAccidentsByMonth(year: number): Observable<MonthlyEvents[]> {
    return this.http.get<MonthlyEvents[]>(`${environment.apiBaseUrl}Reporting/EventsByMonth/${year}`);
  }

  getCoordinatesByYear(year: number): Observable<EventCoordinates[]> {
    return this.http.get<EventCoordinates[]>(`${environment.apiBaseUrl}Reporting/LatLon/${year}`);
  }

  getAccidentByType(year: number): Observable<EventByType[]> {
    return this.http.get<EventByType[]>(`${environment.apiBaseUrl}Reporting/EventsByType/${year}`);
  }

  getAccidentByLocation(year: number): Observable<EventLocationCount[]> {
    return this.http.get<EventLocationCount[]>(`${environment.apiBaseUrl}Reporting/AccidentsByLocation/${year}`);
  }

  getInjurySeverityByYear(year: number): Observable<InjurySeverityByYear> {
    return this.http.get<InjurySeverityByYear>(`${environment.apiBaseUrl}Reporting/GetInjuryTypesByYear/${year}`);
  }

  getInjuryTypesAllMonths(year: number): Observable<InjuryTypesForPastMonths[]>{
    return this.http.get<InjuryTypesForPastMonths[]>(`${environment.apiBaseUrl}Reporting/GetInjuryTypesByMonth/${year}`);
  }

}
