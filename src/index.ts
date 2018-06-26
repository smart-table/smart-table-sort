import {swap} from 'smart-table-operators';
import pointer from 'smart-table-json-pointer';

const defaultComparator = (a, b) => {
    if (a === b) {
        return 0;
    }

    if (a === undefined) {
        return 1;
    }

    if (b === undefined) {
        return -1;
    }

    return a < b ? -1 : 1;
};

export const enum SortDirection {
    ASC = 'asc',
    DESC = 'desc',
    NONE = 'none'
}

export interface SortConfiguration {
    pointer?: string;
    direction?: SortDirection,
    comparator?: <T>(a: T, b: T) => number;
}

function sortByProperty(prop, comparator) {
    const propGetter = pointer(prop).get;
    return (a, b) => comparator(propGetter(a), propGetter(b));
}

export const defaultSortFactory = <T>(conf: SortConfiguration): (array: T[]) => T[] => {
    const {pointer, direction = SortDirection.ASC, comparator = defaultComparator} = conf;

    if (!pointer || direction === SortDirection.NONE) {
        return (array: T[]): T[] => [...array];
    }

    const orderFunc = sortByProperty(pointer, comparator);
    const compareFunc = direction === SortDirection.DESC ? swap(orderFunc) : orderFunc;
    return (array: T[]): T[] => [...array].sort(compareFunc);
};