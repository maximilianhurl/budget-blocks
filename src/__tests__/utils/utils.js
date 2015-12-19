/* global jest, describe, it, expect */
jest.dontMock('../../utils/objectMap');
jest.dontMock('../../utils/minFloat');
jest.dontMock('../../utils/uuid');

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const objectMap = require('../../utils/objectMap').default;
const minFloat = require('../../utils/minFloat').default;
const uuid = require('../../utils/uuid').default;

describe('uuid', function () {

  it('should generate a UUID', function () {
    var uuid1 = uuid();
    var uuid2 = uuid();
    expect(uuid1).not.toEqual(uuid2);
    expect(uuid1.length).toEqual(36);
    expect(uuid2.length).toEqual(36);
  });

});

describe('minfloat', function () {

  it('convert values to float', function () {
    expect(minFloat('5')).toEqual(5);
    expect(minFloat('100')).toEqual(100);
    expect(minFloat('cat')).toEqual(0);
    expect(minFloat('')).toEqual(0);
  });

});

describe('objectMap', function () {

  it('convert object to generator', function () {
    expect(objectMap({
      cat1: '1',
      cat2: '2'
    })).toEqual([
      {key: 'cat1', obj: '1'},
      {key: 'cat2', obj: '2'}
    ]);
  });

});
