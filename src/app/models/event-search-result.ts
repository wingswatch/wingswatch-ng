export interface EventSearchResult {
    reportingCountryCode: string;
    eventId:              string;
    aircraft:             Aircraft[];
    eventTitle:           null;
    investigationType:    string;
    eventNumber:          string;
    eventDate:            string;
    city:                 string;
    state:                string;
    country:              string;
    latitude:             null;
    longitude:            null;
    airportCode:          null;
    airportName:          null;
    totalFatalInjuries:   number;
    totalSeriousInjuries: number;
    totalMinorInjuries:   number;
    totalUninjured:       number;
    weatherCondition:     null;
    make:                 null;
    model:                null;
    location:             string;
    injurySeverity:       string;
}

export interface Aircraft {
    aircraftKey:        number;
    aircraftCategory:   string;
    registrationNumber: string;
    make:               string;
    model:              string;
    amateurBuilt:       string;
    farPart:            string;
    schedule:           null;
    purposeOfFlight:    null;
    operator:           null;
    operatorDba:        null;
    aircraftDamage:     string;
}
export interface RecentEvent {
    eventId:            string;
    investigationType:  string;
    eventNumber:        string;
    eventDate:          string;
    city:               string;
    make:               string;
    model:              string;
    totalFatalInjuries: number;
    state:              string;
    location:           string;
    injurySeverity:     string;
}
