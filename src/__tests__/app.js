/* global jest, describe, it, expect */
jest.dontMock('../app');
jest.setMock('alt-container/native', require('../__mocks__/native'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const App = require('../app').App;

describe('app.js', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<App/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
