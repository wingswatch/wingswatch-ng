export interface AdvancedSearch {
    eventId?: string;
    ntsbNumber?: string;
    eventDate?: Date;
    investigationType?: string;
    make?: string;
    model?: string;
    city?: string;
    state?: string;
}

export interface AdvancedSearchResult {
    eventId: string;
    city: string;
    eventDate: Date;
    injurySeverity?: string;
    investigationType: string;
    ntsbNumber: string;
    aircraftType?: string;
    location: string;
}
