'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var smartTableOperators = require('smart-table-operators');
var pointer = _interopDefault(require('smart-table-json-pointer'));

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
(function (SortDirection) {
    SortDirection["ASC"] = "asc";
    SortDirection["DESC"] = "desc";
    SortDirection["NONE"] = "none";
})(exports.SortDirection || (exports.SortDirection = {}));
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
    const compareFunc = direction === "desc" /* DESC */ ? smartTableOperators.swap(orderFunc) : orderFunc;
    return (array) => [...array].sort(compareFunc);
};

exports.defaultSortFactory = defaultSortFactory;
