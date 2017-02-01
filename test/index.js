import zora from 'zora';
import order from '../index';

export default zora()
  .test('order list by property value using alpha value', function* (t) {
    const input = [{prop: 'foo'}, {prop: 'bar'}, {prop: 'woot'}];
    const output = order({pointer: 'prop'})(input);
    t.deepEqual(output, [{prop: 'bar'}, {prop: 'foo'}, {prop: 'woot'}]);
  })
  .test('order list by property using numeric value', function* (t) {
    const input = [{prop: 3}, {prop: 1}, {prop: 2}];
    const output = order({pointer: 'prop'})(input);
    t.deepEqual(output, [{prop: 1}, {prop: 2}, {prop: 3}]);
  })
  .test('order should put undefined value at the end', function* (t) {
    const input = [{prop: 3}, {foo: 'bar'}, {prop: 2}];
    const output = order({pointer: 'prop'})(input);
    t.deepEqual(output, [{prop: 2}, {prop: 3}, {foo: 'bar'}]);
  })
  .test('order by reversing direction', function* (t) {
    const input = [{prop: '3'}, {prop: 1}, {foo: 'bar'}];
    const output = order({pointer: 'prop', direction: 'desc'})(input);
    t.deepEqual(output, [{foo: 'bar'}, {prop: '3'}, {prop: 1}]);
  })
  .test('order using nested property', function* (t) {
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
  })
  .run();
