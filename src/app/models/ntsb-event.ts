import { Aircraft } from './aircraft';

export class NtsbEvent {
  eventId: string;
  eventNumber: string;
  eventDate: Date;
  airportCode: string;
  weatherCondition: string;
  reportingCountryCode: string;
  eventType: string;
  airportName: string;
  injurySeverity: string;
  location: string;
  latitude: string;
  longitude?: string;
  latitudeDecimal: number;
  longitudeDecimal: number;
  totalFatalInjuries?: number;
  totalSeriousInjuries?: number;
  totalMinorInjuries?: number;
  totalUninjured?: number;
  aircraft: Array<Aircraft>;
  eventTime: string;
}
