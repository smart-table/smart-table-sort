// Type definitions for smart-table-sort

export as namespace smartTableSort;

export = SmartTableSort;

declare function SmartTableSort(input:SmartTableSort.SortInput): Array<any>;

declare namespace SmartTableSort {

    export const enum SortDirection {
        ASC = 'asc',
        DESC = 'desc',
        NONE = 'none'
    }

    export interface SortInput {
        direction?: SortDirection;
        pointer?: string;
        comparator?(aVal, bVal) : number;
    }
}