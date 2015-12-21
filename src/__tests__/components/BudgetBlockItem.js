/* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlockItem');
jest.dontMock('../../utils/objectMap');

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const BudgetBlockItem = require('../../components/BudgetBlockItem').BudgetBlockItem;

describe('BudgetBlockItem', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  var blockId = 'id1';
  var blockItemId = 'idItem1';
  var blockItem = {
    title: 'cat',
    value: 10
  };

  it('should render data correctly', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlockItem
      blockId={blockId}
      blockItemId={blockItemId}
      blockItem={blockItem}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

});
