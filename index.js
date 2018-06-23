import {swap} from 'smart-table-operators';
import pointer from 'smart-table-json-pointer';

/**
 * Standard comparator that uses default comparison operator
 *
 * @param aVal
 * @param bVal the two values to compare
 * @return -1 if aVal is to be before after bVal, 1 if bVal is before aVal
 */
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

/**
 * Return a compartor that reads the property given by prop to compare two values
 * @param prop - the path to the property
 * @param comparator - the comparator to use to compare values
 */
function compareByProperty(prop, comparator) {
	const propGetter = pointer(prop).get;
	return (a, b) => {
		const aVal = propGetter(a);
		const bVal = propGetter(b);

		return comparator(aVal, bVal);
	};
}

/**
 * Create a sort function that sorts an array according to one property
 * @param pointer - the path to the property used for sorting
 * @param direction - the direction; 'asc', 'desc', or 'none'
 * @param comparator - optional comparator function used for sorting
 */
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
