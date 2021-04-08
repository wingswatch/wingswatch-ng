import { Aircraft } from './aircraft';

export class NtsbEvent {
  eventId: string;
  eventDate: Date;
  airportCode: string;
  weatherCondition: string;
  reportingCountryCode: string;
  eventType: string;
  airportName: string;
  injurySeverity: string;
  location: string;
  accidentNumber: string;
  latitude?: number;
  longitude?: number;
  totalFatalInjuries?: number;
  totalSeriousInjuries?: number;
  totalMinorInjuries?: number;
  totalUninjured?: number;
  aircraft: Array<Aircraft>;
}
