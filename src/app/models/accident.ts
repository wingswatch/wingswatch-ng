import { Aircraft } from './aircraft';

export class Accident {
  eventId: string;
  eventDate: Date;
  reportStatus: string;
  accidentTitle: string;
  registrationNumber: string;
  airportCode: string;
  weatherCondition: string;
  reportingCountryCode: string;
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
