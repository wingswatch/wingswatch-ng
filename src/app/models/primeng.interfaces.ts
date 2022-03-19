export interface PrimeTableColumn {
    header: string;
    field: string;
    subField?: string;
    dateFormat?: string;
    isPhoneNumber?: boolean;
    filterType?: string;
    filterField?: string;
    linkbtn?: boolean;
    isCheckbox?: boolean;
    width?: string;
}
