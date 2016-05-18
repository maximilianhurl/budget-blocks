/* global jest, describe, it, expect */
jest.dontMock('../../index.ios');
jest.setMock('alt-container/native', require('../__mocks__/native'));
jest.setMock('../actions/PersistenceActions', require('../__mocks__/PersistenceActions'));
jest.setMock('react-native-vector-icons/Ionicons', require('../__mocks__/Ionicons'));

import TestUtils from 'react-addons-test-utils';
import React from 'react'; // eslint-disable-line no-unused-vars

const BudgetBlocks = require('../../index.ios').default;

describe('Index iOS', function () {

  it('should render', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlocks/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
