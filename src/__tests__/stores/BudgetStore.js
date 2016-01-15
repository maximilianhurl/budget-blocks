/* global jest, describe, it, expect, beforeEach */

jest.dontMock('../../utils/minFloat');
jest.setMock('../../alt', require('../../__mocks__/alt'));
jest.setMock('../../actions/BudgetActions', require('../../__mocks__/BudgetActions'));
jest.dontMock('../../stores/BudgetStore');

describe('Test BudgetStore', function () {

  var store;

  beforeEach(function () {
    require('../../stores/BudgetStore').default;
    const BudgetStore = require('../../stores/BudgetStore').BudgetStore;
    BudgetStore.prototype.bindListeners = jest.genMockFunction();
    store = new BudgetStore();
  });

  it('Should set actions', function () {
    expect(store.bindListeners).lastCalledWith({
      onAddBudgetBlock: 'ADD_BUDGET_BLOCK',
      onAddBudgetBlockItem: 'ADD_BUDGET_BLOCK_ITEM',
      onRemoveBudgetBlock: 'REMOVE_BUDGET_BLOCK',
      onRemoveBudgetBlockItem: 'REMOVE_BUDGET_BLOCK_ITEM',
      onUpdateBudgetBlockItemTitle: 'UPDATE_BUDGET_BLOCK_ITEM_TITLE',
      onUpdateBudgetBlockItemValue: 'UPDATE_BUDGET_BLOCK_ITEM_VALUE',
      onUpdateBudgetBlockTitle: 'UPDATE_BUDGET_BLOCK_TITLE',
      onUpdateIncome: 'UPDATE_INCOME'
    });
  });

  it('Should update income', function () {
    expect(store.income).toEqual(store.income);
    store.onUpdateIncome(200);
    expect(store.income).toEqual(200);
  });

});
