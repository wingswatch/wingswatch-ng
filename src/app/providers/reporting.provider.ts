import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccidentCoordinates } from '../models/accident-coordinates';
import { Observable } from 'rxjs/internal/Observable';
import { Accident } from '../models/accident';
import { MonthlyAccidents } from '../models/Reporting/MonthlyAccidents';
import { AccidentByType } from '../models/Reporting/AccidentByType';
import { AccidentLocationCount } from '../models/Reporting/AccidentLocationCount';
import { InjurySeverityByYear } from '../models/Reporting/InjurySeverityByYear';
import { InjuryTypesForPastYears } from '../models/Reporting/InjuryTypesForPastYears';
import { InjuryTypesForPastMonths } from '../models/Reporting/InjuryTypeForPastMonths';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingProvider {
  constructor(private http: HttpClient) { }

  getAccidentsByMonth(year: string): Observable<MonthlyAccidents[]> {
    return this.http.get<MonthlyAccidents[]>(`${environment.apiBaseUrl}Reporting/AccidentsByMonth/${year}`).pipe();
  }

  getCoordinatesByYear(year: string): Observable<IAccidentCoordinates[]> {
    return this.http.get<IAccidentCoordinates[]>(`${environment.apiBaseUrl}Reporting/LatLon/${year}`).pipe();
  }

  getAccidentByEventId(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(`${environment.apiBaseUrl}Reporting/GetAccidentByEventId/${eventId}`).pipe();
  }

  getAccidentByType(): Observable<AccidentByType[]> {
    return this.http.get<AccidentByType[]>(`${environment.apiBaseUrl}Reporting/AccidentsByType`).pipe();
  }

  getAccidentByLocation(year: string): Observable<AccidentLocationCount[]> {
    return this.http.get<AccidentLocationCount[]>(`${environment.apiBaseUrl}Reporting/AccidentsByLocation/${year}`).pipe();
  }

  getInjurySeverityByYear(year: string): Observable<InjurySeverityByYear> {
    return this.http.get<InjurySeverityByYear>(`${environment.apiBaseUrl}Reporting/GetInjuryTypesByYear/${year}`).pipe();
  }

  getInjuryTypesAllYears(): Observable<InjuryTypesForPastYears[]>{
    return this.http.get<InjuryTypesForPastYears[]>(`${environment.apiBaseUrl}Reporting/GetInjuryTypesAllYears`).pipe();
  }

  getInjuryTypesAllMonths(year: string): Observable<InjuryTypesForPastMonths[]>{
    return this.http.get<InjuryTypesForPastMonths[]>(`${environment.apiBaseUrl}Reporting/GetInjuryTypesByMonth/${year}`).pipe();
  }

}
