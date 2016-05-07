/* global jest, describe, it, expect */
jest.dontMock('../../components/Settings');

import TestUtils from 'react-addons-test-utils';

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not Settings ES6 modules yet
const Settings = require('../../components/Settings').Settings;
import React from 'react';  // eslint-disable-line no-unused-vars

describe('Settings', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render data correctly', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<Settings uistore={{
      currencySymbol: '£'
    }}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
