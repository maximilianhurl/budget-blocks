/* global jest, describe, it, expect */
jest.dontMock('../../components/BudgetList');
jest.dontMock('../../utils/objectMap');

import TestUtils from 'react-addons-test-utils';
import React from 'react-native'; // eslint-disable-line no-unused-vars

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet
const BudgetList = require('../../components/BudgetList').BudgetList;

describe('BudgetList', function () {

  const ReactNotNative = require('react'); // eslint-disable-line no-unused-vars

  it('should render data correctly', function () {

    var budgetstore = {
      budgets: {
        id1: {},
        id2: {}
      },
      income: 120
    };

    var budgetactions = {
      addBudgetBlock: () => {},
      updateIncome: () => {}
    };

    var persistenceactions = {
      persistState: () => {},
      loadPersistentState: () => {}
    };

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetstore={budgetstore}
      budgetactions={budgetactions}
      persistenceactions={persistenceactions}/>);
    var output = shallowRenderer.getRenderOutput();
    expect(output).toBeTruthy();
  });

  it('should add budget block', function () {
    var budgetstore = {
      budgets: {}
    };

    var actions = {
      addBudgetBlock: jest.genMockFunction()
    };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={actions}
      budgetstore={budgetstore} />);
    var output = shallowRenderer.getRenderOutput();
    output.props.children[3].props.onPress();
    expect(actions.addBudgetBlock).toBeCalledWith('New outgoing block');
  });

  it('should add budget block', function () {
    var budgetstore = {
      budgets: {}
    };

    var actions = {
      updateIncome: jest.genMockFunction()
    };
    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(<BudgetList
      budgetactions={actions}
      budgetstore={budgetstore} />);
    var output = shallowRenderer.getRenderOutput();
    output.props.children[1].props.onChangeText('cats');
    expect(actions.updateIncome).toBeCalledWith('cats');
  });

});
