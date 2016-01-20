/* global jest, describe, it, expect, beforeEach */

jest.dontMock('../../utils/minFloat');
jest.dontMock('../../utils/uuid');
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


  it('Should add, update title and remove block', function () {
    store.budgets = {};
    store.onUpdateIncome(200);
    expect(store.income).toEqual(200);
    store.onAddBudgetBlock('cats');
    expect(Object.keys(store.budgets).length).toEqual(1);
    let newBlockId = Object.keys(store.budgets)[0];
    expect(store.budgets[newBlockId].title).toEqual('cats');
    //update block title
    store.onUpdateBudgetBlockTitle({
      blockId: newBlockId,
      title: 'not cats'
    });
    expect(store.budgets[newBlockId].title).toEqual('not cats');
    //remove and now should be empty
    store.onRemoveBudgetBlock(newBlockId);
    expect(Object.keys(store.budgets).length).toEqual(0);
  });

  it('Should add and remove block item', function () {
    store.budgets = {};
    store.onUpdateIncome(200);

    store.onAddBudgetBlock('cats');
    let blockId = Object.keys(store.budgets)[0];

    // add block item
    store.onAddBudgetBlockItem({
      blockId: blockId,
      title: 'cat food',
      value: '75'
    });
    expect(store.budgets[blockId].subtotal).toEqual(125);
    expect(Object.keys(store.budgets[blockId].items).length).toEqual(1);

    //remove
    store.onRemoveBudgetBlockItem({
      blockId: blockId,
      blockItemId: Object.keys(store.budgets[blockId].items)[0],
    });
    expect(store.budgets[blockId].subtotal).toEqual(200);
    expect(Object.keys(store.budgets[blockId].items).length).toEqual(0);
  });

  it('Should update budget block item values', function () {
    store.budgets = {};
    store.onUpdateIncome(200);

    store.onAddBudgetBlock('cats');
    let blockId = Object.keys(store.budgets)[0];

    // add block item
    store.onAddBudgetBlockItem({
      blockId: blockId,
      title: 'cat food',
      value: '75'
    });
    expect(store.budgets[blockId].subtotal).toEqual(125);
    expect(Object.keys(store.budgets[blockId].items).length).toEqual(1);

    //update value
    store.onUpdateBudgetBlockItemValue({
      blockId: blockId,
      blockItemId: Object.keys(store.budgets[blockId].items)[0],
      value: 100
    });
    expect(store.budgets[blockId].subtotal).toEqual(100);

    //update text
    store.onUpdateBudgetBlockItemTitle({
      blockId: blockId,
      blockItemId: Object.keys(store.budgets[blockId].items)[0],
      title: 'cat cat cat food'
    });
  });

});