import {swap} from 'smart-table-operators';
import pointer from 'smart-table-json-pointer';

function standardComparator(aVal, bVal) {
	if (aVal === bVal) {
		return 0;
	}

	if (bVal === undefined) {
		return -1;
	}

	if (aVal === undefined) {
		return 1;
	}

	return aVal < bVal ? -1 : 1;
}

function compareByProperty(prop, comparator) {
	const propGetter = pointer(prop).get;
	return (a, b) => {
		const aVal = propGetter(a);
		const bVal = propGetter(b);

		return comparator(aVal, bVal);
	};
}

export default function sortFactory({pointer, direction, comparator} = {}) {
	if (!comparator) {
		comparator = standardComparator;
	}
	if (!pointer || direction === 'none') {
		return array => [...array];
	}

	const orderFunc = compareByProperty(pointer, comparator);
	const compareFunc = direction === 'desc' ? swap(orderFunc) : orderFunc;

	return array => [...array].sort(compareFunc);
}
