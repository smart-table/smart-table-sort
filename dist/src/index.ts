import {swap} from 'smart-table-operators';
import {pointer} from 'smart-table-json-pointer';

const defaultComparator = <T>(a: T, b: T) => {
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

interface Comparator<T> {
    (a: T, b: T): number;
}

export interface SortConfiguration<T> {
    pointer?: string;
    direction?: SortDirection,
    comparator?: Comparator<T>;
}

const sortByProperty = <T>(prop, comparator) => {
    const propGetter = pointer<T>(prop).get;
    return (a: T, b: T) => comparator(propGetter(a), propGetter(b));
};

export const defaultSortFactory = <T>(conf: SortConfiguration<T>): (array: T[]) => T[] => {
    const {pointer, direction = SortDirection.ASC, comparator = defaultComparator} = conf;

    if (!pointer || direction === SortDirection.NONE) {
        return (array: T[]): T[] => [...array];
    }

    const orderFunc = sortByProperty<T>(pointer, comparator);
    const compareFunc = direction === SortDirection.DESC ? <Comparator<T>>swap(orderFunc) : orderFunc;
    return (array: T[]): T[] => [...array].sort(compareFunc);
};
