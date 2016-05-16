/* global jest, describe, it, expect */
jest.dontMock('../../index.android');
jest.setMock('alt-container/native', require('../__mocks__/native'));
jest.setMock('../actions/PersistenceActions', require('../__mocks__/PersistenceActions'));
jest.setMock('react-native-vector-icons/Ionicons', require('../__mocks__/Ionicons'));


import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet

const BudgetBlocks = require('../../index.android').default;

describe('Index Android', function () {

  it('should render', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlocks/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
