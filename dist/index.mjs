import { swap } from 'smart-table-operators';
import pointer from 'smart-table-json-pointer';

function sortByProperty(prop) {
	const propGetter = pointer(prop).get;
	return (a, b) => {
		const aVal = propGetter(a);
		const bVal = propGetter(b);

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
	};
}

function sortFactory({pointer: pointer$$1, direction} = {}) {
	if (!pointer$$1 || direction === 'none') {
		return array => [...array];
	}

	const orderFunc = sortByProperty(pointer$$1);
	const compareFunc = direction === 'desc' ? swap(orderFunc) : orderFunc;

	return array => [...array].sort(compareFunc);
}

export default sortFactory;
