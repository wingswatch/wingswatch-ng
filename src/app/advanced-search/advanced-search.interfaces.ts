export interface AdvancedSearch {
    eventId?: string;
    ntsbNumber?: string;
    eventDate?: Date;
}

export interface AdvancedSearchResult {
    eventId: string;
    city: string;
    eventDate: Date;
}
