export interface Sort {
    customSort?: boolean,
    sortDirection?: string,
    name?: string,
    field: any,
    _static?: boolean,
    _translateName?: string,
    _renderFor?: string
}
