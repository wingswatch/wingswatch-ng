export interface InjuryTypesForPastYears {
    year: number;
    injuries: {
        fatal: number;
        serious: number;
        minor: number;
        uninjured: number;
    };
}
