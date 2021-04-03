export class Accident {
  eventId: string;
  airport: string;
  injurySeverity: string;
  make: string;
  model: string;
  location: string;
  accidentNumber: string;
  latitude?: number;
  longitude?: number;
  totalFatalInjuries?: number;
  totalSeriousInjuries?: number;
  totalMinorInjuries?: number;
  totalUninjured?: number;
}
