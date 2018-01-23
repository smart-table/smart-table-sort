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
			return partial(target, [...parts])
		},
		set
	}
}

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
//# sourceMappingURL=smart-table-sort.es.js.map
