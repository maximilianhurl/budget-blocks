/* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlockItem');

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars
let { View, TextInput, TouchableHighlight, Text } = React; // eslint-disable-line no-unused-vars

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
    expect(output.props.children[0]).toEqual(
      <Text>Budget: { blockItem.title }</Text>
    );
    expect(output.props.children[1].props.value).toEqual(blockItem.title);
    expect(output.props.children[2]).toEqual(
      <Text>£{ blockItem.value }</Text>
    );
    expect(output.props.children[3].props.value).toEqual(blockItem.value);
  });

});
