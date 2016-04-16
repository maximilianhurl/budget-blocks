/* global jest, describe, it, expect, beforeEach */

jest.dontMock('../../utils/minFloat');
jest.dontMock('../../utils/uuid');
jest.setMock('../../alt', require('../../__mocks__/alt'));
jest.setMock('../../actions/BudgetActions', require('../../__mocks__/BudgetActions'));
jest.dontMock('../../stores/BudgetStore');
jest.dontMock('../../utils/objectMap');

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

  it('Should re-order blocks', function () {
    store.budgets = {};
    store.onUpdateIncome(200);

    store.onAddBudgetBlock('cats');
    const block1Id = Object.keys(store.budgets)[0];
    // add block item
    store.onAddBudgetBlockItem({
      blockId: block1Id,
      title: 'cat food',
      value: '75'
    });
    expect(store.budgets[block1Id].subtotal).toEqual(125);
    expect(store.budgets[block1Id].order).toEqual(1);

    store.onAddBudgetBlock('bills');
    const block2Id = Object.keys(store.budgets)[1];
    // add block item
    store.onAddBudgetBlockItem({
      blockId: block2Id,
      title: 'vet bills',
      value: '100'
    });
    expect(store.budgets[block2Id].subtotal).toEqual(25);
    expect(store.budgets[block2Id].order).toEqual(2);

    //reorder blocks
    store.onReorderBudgetBlocks({
      replacedBlockId: block2Id,
      movingBlockId: block1Id
    });

    expect(store.budgets[block2Id].subtotal).toEqual(100);
    expect(store.budgets[block2Id].order).toEqual(1);

    expect(store.budgets[block1Id].subtotal).toEqual(25);
    expect(store.budgets[block1Id].order).toEqual(2);
  });

  it('Should set layout and delete when block removed', function () {
    store.budgets = {};
    store.onUpdateIncome(200);
    store.onAddBudgetBlock('cats');
    let blockId = Object.keys(store.budgets)[0];
    const layout = {
      blockId: blockId,
      layout: 'cats'
    };
    store.onAddBlockLayout(layout);
    expect(store.blockLayouts).toEqual({[blockId]: layout.layout});
    store.onRemoveBudgetBlock(blockId);
    expect(store.blockLayouts).toEqual({});
  });

  it('should re-order blocks on remove', function () {
    store.budgets = {};
    store.onUpdateIncome(200);
    store.onAddBudgetBlock('cats');
    let block1Id = Object.keys(store.budgets)[0];
    store.onAddBudgetBlock('dogs');
    let block2Id = Object.keys(store.budgets)[1];

    expect(store.budgets[block1Id].order).toEqual(1);
    expect(store.budgets[block2Id].order).toEqual(2);
    store.onRemoveBudgetBlock(block1Id);
    expect(store.budgets[block2Id].order).toEqual(1);
  });

});
