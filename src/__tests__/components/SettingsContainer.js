/* global jest, describe, it, expect */
jest.dontMock('../../components/SettingsContainer');

jest.setMock('../../alt', require('../../__mocks__/alt'));
jest.setMock('alt-container/native', require('../../__mocks__/native'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const SettingsContainer = require('../../components/SettingsContainer').SettingsContainer;

describe('SettingsContainer', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render data correctly', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<SettingsContainer />);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
