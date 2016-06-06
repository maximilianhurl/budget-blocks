/* global jest, describe, it, expect, beforeEach */
jest.dontMock('../../components/BudgetList');
jest.dontMock('../../stores/BudgetStore');
jest.dontMock('../../utils/objectMap');

jest.setMock('react-native-vector-icons/Ionicons', require('../../__mocks__/Ionicons'));

import TestUtils from 'react-addons-test-utils';
import React from 'react';  // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const BudgetList = require('../../components/BudgetList').BudgetList;

describe('BudgetList', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  var uistore, budgetstore, budgetactions;

  beforeEach(function() {

    budgetactions = {
      addBudgetBlock: jest.genMockFunction(),
      updateIncome: jest.genMockFunction(),
      reorderBudgetBlocks: jest.genMockFunction(),
      addBlockLayout: jest.genMockFunction(),
    };

    uistore = {
      currencySymbol: '£'
    };

    budgetstore = {
      budgets: {}
    };
  });

  it('should render data correctly', function () {

    budgetstore = {
      budgets: {
        id1: {},
        id2: {}
      },
      income: 120
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetstore={budgetstore}
      uistore={uistore}
      budgetactions={budgetactions}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

  it('should add budget block', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={budgetactions}
      uistore={uistore}
      budgetstore={budgetstore} />);
    var output = shallowRenderer.getRenderOutput();
    output.props.children[2].props.onPress();
    expect(budgetactions.addBudgetBlock).toBeCalledWith('');
  });

  it('should update income', function () {
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={budgetactions}
      uistore={uistore}
      budgetstore={budgetstore} />);
    var output = shallowRenderer.getRenderOutput();
    output.props.children[0].props.children[1].props.onChangeText('cats');
    expect(budgetactions.updateIncome).toBeCalledWith('cats');
  });

  it('should attach listeners to scroll view', function () {
    budgetstore = {};

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={budgetactions}
      uistore={uistore}
      budgetstore={budgetstore} />);
    var output = shallowRenderer.getRenderOutput();
    var instance = shallowRenderer._instance._instance;

    instance.onScroll = jest.genMockFunction();
    instance.onLayout = jest.genMockFunction();

    output.props.onScroll('cat');
    output.props.onLayout('seagull');

    expect(instance.onScroll).toBeCalledWith('cat');
    expect(instance.onLayout).toBeCalledWith('seagull');
  });

  it('should attach listeners to block items view', function () {
    budgetstore = {
      budgets: {
        id1: {},
      },
      income: 120
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={budgetactions}
      uistore={uistore}
      budgetstore={budgetstore} />);
    var output = shallowRenderer.getRenderOutput();
    var instance = shallowRenderer._instance._instance;

    let blocks = output.props.children[1];

    instance.handleItemLayout = jest.genMockFunction();
    instance.dragStartCallback = jest.genMockFunction();
    instance.dragEndedCallback = jest.genMockFunction();
    instance.dragMoveCallback = jest.genMockFunction();

    blocks[0].props.onLayout('cat1');
    blocks[0].props.dragStartCallback();
    blocks[0].props.dragEndedCallback();
    blocks[0].props.dragMoveCallback('cat4', 'cat5', 'cat6');

    expect(instance.handleItemLayout ).toBeCalledWith('cat1', 'id1');
    expect(instance.dragStartCallback).toBeCalled();
    expect(instance.dragEndedCallback).toBeCalled();
    expect(instance.dragMoveCallback ).toBeCalledWith('cat4', 'cat5', 'cat6');
  });

  it('should handle event call backs', function () {
    budgetstore = {
      budgets: {},
      income: 0
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={budgetactions}
      uistore={uistore}
      budgetstore={budgetstore} />);
    shallowRenderer.getRenderOutput();
    var instance = shallowRenderer._instance._instance;
    // scroll
    instance.onScroll({
      nativeEvent: {
        contentOffset: {
          y: '120'
        }
      }
    });
    expect(instance.scrollOffset).toEqual('120');
    // layout
    instance.onLayout({
      nativeEvent: {
        layout: {
          y: '110'
        }
      }
    });
    expect(instance.yPos).toEqual('110');
    // drag end callback
    instance.dragStartCallback();
    expect(instance.state.reordering).toEqual(true);
    // drag start callback
    instance.dragEndedCallback();
    expect(instance.state.reordering).toEqual(false);
    // handleItemLayout
    instance.handleItemLayout({
      nativeEvent: {
        layout: 'cat layout'
      }
    }, 'cat');
    expect(budgetactions.addBlockLayout).toBeCalledWith('cat', 'cat layout');
  });

  it('should attach listeners to block items view', function () {
    budgetstore = {
      budgets: {
        id1: {},
      },
      blockLayouts: {
        cats1: {
          y: 0,
          height: 100
        },
        cats2: {
          y: 200,
          height: 100
        }
      },
      income: 120
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      uistore={uistore}
      budgetactions={budgetactions}
      budgetstore={budgetstore} />);
    shallowRenderer.getRenderOutput();
    var instance = shallowRenderer._instance._instance;

    instance.scrollOffset = 10;
    instance.yPos = 20;

    instance.dragMoveCallback('cats1', 149, true);
    jest.runAllTimers();

    expect(budgetactions.reorderBudgetBlocks).not.toBeCalled();

    instance.dragMoveCallback('cats1', 160, true);
    jest.runAllTimers();

    expect(budgetactions.reorderBudgetBlocks).toBeCalledWith('cats1', 'cats2');
  });

});
