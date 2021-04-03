export interface IMultiSeriesNgX {
    name: string | number;
    series: ISeriesNgX[];
}

export interface ISeriesNgX {
    name: string | number;
    value: string | number;
}
