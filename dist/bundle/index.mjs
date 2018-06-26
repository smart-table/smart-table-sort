import { swap } from 'smart-table-operators';
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
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
    SortDirection["NONE"] = "none";
})(SortDirection || (SortDirection = {}));
function sortByProperty(prop, comparator) {
    const propGetter = pointer(prop).get;
    return (a, b) => comparator(propGetter(a), propGetter(b));
}
const defaultSortFactory = (conf) => {
    const { pointer: pointer$$1, direction = "asc" /* ASC */, comparator = defaultComparator } = conf;
    if (!pointer$$1 || direction === "none" /* NONE */) {
        return (array) => [...array];
    }
    const orderFunc = sortByProperty(pointer$$1, comparator);
    const compareFunc = direction === "desc" /* DESC */ ? swap(orderFunc) : orderFunc;
    return (array) => [...array].sort(compareFunc);
};

export { SortDirection, defaultSortFactory };
