export interface MultiSeriesNgX {
    name: string;
    series: SeriesNgX[];
}

export interface SeriesNgX {
    name: string | number;
    value: number;
}
