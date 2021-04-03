export interface InjuryTypesForPastMonths {
    month: number;
    injuries: {
        fatal: number;
        serious: number;
        minor: number;
        uninjured: number;
    };
}
