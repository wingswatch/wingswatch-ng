import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAccidentCoordinates } from '../models/accident-coordinates';
import { Observable } from 'rxjs/internal/Observable';
import { Accident } from '../models/accident';
import { MonthlyAccidents } from '../models/Reporting/MonthlyAccidents';
import { AccidentByType } from '../models/Reporting/AccidentByType';
import { AccidentLocationCount } from '../models/Reporting/AccidentLocationCount';
import { IInjurySeverityByYear } from '../models/Reporting/InjurySeverityByYear';
import { InjuryTypesForPastYears } from '../models/Reporting/InjuryTypesForPastYears';
import { InjuryTypesForPastMonths } from '../models/Reporting/InjuryTypeForPastMonths';

@Injectable({
  providedIn: 'root'
})
export class ReportingProvider {
  constructor(private http: HttpClient) { }

  getAccidentsByMonth(year: string): Observable<MonthlyAccidents[]> {
    return this.http.get<MonthlyAccidents[]>(`api/Reporting/AccidentsByMonth/${year}`).pipe();
  }

  getCoordinatesByYear(year: string): Observable<IAccidentCoordinates[]> {
    return this.http.get<IAccidentCoordinates[]>(`api/Reporting/LatLon/${year}`).pipe();
  }

  getAccidentByEventId(eventId: string): Observable<Accident> {
    return this.http.get<Accident>(`api/Reporting/GetAccidentByEventId/${eventId}`).pipe();
  }

  getAccidentByType(): Observable<AccidentByType[]> {
    return this.http.get<AccidentByType[]>(`api/Reporting/AccidentsByType`).pipe();
  }

  getAccidentByLocation(year: string): Observable<AccidentLocationCount[]> {
    return this.http.get<AccidentLocationCount[]>(`api/Reporting/AccidentsByLocation/${year}`).pipe();
  }

  getInjurySeverityByYear(year: string): Observable<IInjurySeverityByYear> {
    return this.http.get<IInjurySeverityByYear>(`api/Reporting/GetInjuryTypesByYear/${year}`).pipe();
  }

  getInjuryTypesAllYears(): Observable<InjuryTypesForPastYears[]>{
    return this.http.get<InjuryTypesForPastYears[]>(`api/Reporting/GetInjuryTypesAllYears`).pipe();
  }

  getInjuryTypesAllMonths(year: string): Observable<InjuryTypesForPastMonths[]>{
    return this.http.get<InjuryTypesForPastMonths[]>(`api/Reporting/GetInjuryTypesByMonth/${year}`).pipe();
  }

}
