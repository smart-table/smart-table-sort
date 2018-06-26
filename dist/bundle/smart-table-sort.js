var smartTableSort = (function (exports) {
	'use strict';

	const swap = f => (a, b) => f(b, a);

	function pointer(path) {
		const parts = path.split('.');

		function partial(obj = {}, parts = []) {
			const p = parts.shift();
			const current = obj[p];
			return (current === undefined || parts.length === 0) ?
				current : partial(current, parts);
		}

		function set(target, newTree) {
			let current = target;
			const [leaf, ...intermediate] = parts.reverse();
			for (const key of intermediate.reverse()) {
				if (current[key] === undefined) {
					current[key] = {};
					current = current[key];
				}
			}
			current[leaf] = Object.assign(current[leaf] || {}, newTree);
			return target;
		}

		return {
			get(target) {
				return partial(target, [...parts]);
			},
			set
		};
	}

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
	    const compareFunc = direction === "desc" /* DESC */ ? swap(orderFunc) : orderFunc;
	    return (array) => [...array].sort(compareFunc);
	};

	exports.defaultSortFactory = defaultSortFactory;

	return exports;

}({}));
//# sourceMappingURL=smart-table-sort.js.map
