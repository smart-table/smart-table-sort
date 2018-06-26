import test from 'zora';
import {defaultSortFactory as order} from '../dist/src/index';

test('order list by property value using alpha value', t => {
  const input = [{prop: 'foo'}, {prop: 'bar'}, {prop: 'woot'}];
  const output = order({pointer: 'prop'})(input);
  t.deepEqual(output, [{prop: 'bar'}, {prop: 'foo'}, {prop: 'woot'}]);
});

test('order list by property using numeric value', t => {
  const input = [{prop: 3}, {prop: 1}, {prop: 2}];
  const output = order({pointer: 'prop'})(input);
  t.deepEqual(output, [{prop: 1}, {prop: 2}, {prop: 3}]);
});

test('order should put undefined value at the end', t => {
  const input = [{prop: 3}, {foo: 'bar'}, {prop: 2}];
  const output = order({pointer: 'prop'})(input);
  t.deepEqual(output, [{prop: 2}, {prop: 3}, {foo: 'bar'}]);
});

test('order by reversing direction', t => {
  const input = [{prop: '3'}, {prop: 1}, {foo: 'bar'}];
  const output = order({pointer: 'prop', direction: 'desc'})(input);
  t.deepEqual(output, [{foo: 'bar'}, {prop: '3'}, {prop: 1}]);
});

test('order using nested property', t => {
  const input = [
    {foo: {bar: 'bcd'}},
    {foo: {bar: 'acd'}},
    {foo: {bar: 'abd'}}
  ];
  const output = order({pointer: 'foo.bar'})(input);
  t.deepEqual(output, [
    {foo: {bar: 'abd'}},
    {foo: {bar: 'acd'}},
    {foo: {bar: 'bcd'}}
  ]);
});

function caseInsensitiveCompare (aVal, bVal) {
  if (aVal === bVal) {
    return 0;
  }

  if (bVal === undefined) {
    return -1;
  }

  if (aVal === undefined) {
    return 1;
  }

  return aVal.localeCompare(bVal);
}

test('order list by property value using alpha value with case insensitive compare', t => {
  const input = [{prop: 'Foo'}, {prop: 'bar'}, {prop: 'woot'}];
  const output = order({pointer: 'prop', comparator: caseInsensitiveCompare})(input);
  t.deepEqual(output, [{prop: 'bar'}, {prop: 'Foo'}, {prop: 'woot'}]);
});

test('order using nested property', t => {
  const input = [
    {foo: {bar: 'bcd'}},
    {foo: {bar: 'Acd'}},
    {foo: {bar: 'abd'}}
  ];
  const output = order({pointer: 'foo.bar', comparator: caseInsensitiveCompare})(input);
  t.deepEqual(output, [
    {foo: {bar: 'abd'}},
    {foo: {bar: 'Acd'}},
    {foo: {bar: 'bcd'}}
  ]);
});