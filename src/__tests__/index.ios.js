/* global jest, describe, it, expect */
jest.dontMock('../../index.ios');
jest.setMock('alt-container/native', require('../__mocks__/native'));
jest.setMock('../actions/PersistenceActions', require('../__mocks__/PersistenceActions'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const BudgetBlocks = require('../../index.ios').default;

describe('Index iOS', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render data correctly', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlocks/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
