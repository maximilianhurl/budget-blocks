/* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetBlockItem');

jest.setMock('react-native-vector-icons/Ionicons', require('../../__mocks__/Ionicons'));

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

let { View, TextInput, TouchableOpacity, Text } = React; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
var BudgetBlockItem = require('../../components/BudgetBlockItem').BudgetBlockItem;

describe('BudgetBlockItem', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  var blockId = 'id1';
  var blockItemId = 'idItem1';
  var blockItem = {
    title: 'cat',
    value: 10
  };

  var uistore = {
    editControlsVisible: true
  };

  it('should render data correctly', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlockItem
      blockId={blockId}
      blockItemId={blockItemId}
      uistore={uistore}
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

  it('should update title', function () {
    var actions = {
      updateBudgetBlockItemTitle: jest.genMockFunction()
    };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlockItem
      blockId={blockId}
      blockItemId={blockItemId}
      budgetactions={actions}
      uistore={uistore}
      blockItem={blockItem}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    output.props.children[1].props.onChangeText('cats');
    expect(actions.updateBudgetBlockItemTitle).toBeCalledWith(blockId, blockItemId, 'cats');
  });

  it('should update value', function () {
    var actions = {
      updateBudgetBlockItemValue: jest.genMockFunction()
    };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlockItem
      blockId={blockId}
      blockItemId={blockItemId}
      budgetactions={actions}
      uistore={uistore}
      blockItem={blockItem}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    output.props.children[3].props.onChangeText('cats');
    expect(actions.updateBudgetBlockItemValue).toBeCalledWith(blockId, blockItemId, 'cats');
  });

  it('should remove block', function () {
    var actions = {
      removeBudgetBlockItem: jest.genMockFunction()
    };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetBlockItem
      blockId={blockId}
      blockItemId={blockItemId}
      uistore={uistore}
      budgetactions={actions}
      blockItem={blockItem}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
    output.props.children[4].props.onPress();
    expect(actions.removeBudgetBlockItem).toBeCalledWith(blockId, blockItemId);
  });


});
