# smart-table-sort

[![CircleCI](https://circleci.com/gh/smart-table/smart-table-sort.svg?style=svg)](https://circleci.com/gh/smart-table/smart-table-sort)

takes a sort configuration object and returns a sort function operating on arrays (returning a new array without modifying the input array). For nodejs and browsers.

## Installation

### npm

``npm install smart-table-sort --save``

### yarn

``yarn add smart-table-sort``

## Usage

```Javascript
import sorter from 'smart-table-sort';

const input = [{prop: 'foo'}, {prop: 'bar'}, {prop: 'woot'}];

const sort = sorter({pointer:'prop', direction:'desc'}) // default direction is "asc"
const output = sort(input);
// > [{foo: 'woot'}, {prop: 'foo'}, {prop: 'bar'}]
```

it works on nested properties as well

```Javascript
import sorter from 'smart-table-sort';

const input = [
  {foo: {bar: 'bcd'}},
  {foo: {bar: 'acd'}},
  {foo: {bar: 'abd'}}
];

const output = sorter({pointer: 'foo.bar'})(input);
// > [{foo: {bar: 'abd'}},{foo: {bar: 'acd'}},{foo: {bar: 'bcd'}}]);
```

### object conf

* pointer: the property to use for ordering the collection (can be a nested property)
* direction: 'asc', 'desc', 'none' (default is 'asc', 'none' will returned in the order of the input array untouched)

## Contributing

### Test

``npm test``

or

``yarn test``

### Issues

Only **bugs** and must come with a **running reproduction** of the issue
