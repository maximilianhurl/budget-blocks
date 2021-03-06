/* global jest, describe, it, expect, beforeEach */

jest.dontMock('../../actions/BudgetActions');
jest.dontMock('../../actions/UIActions');
jest.dontMock('../../actions/PersistenceActions');
jest.setMock('alt', require('../../__mocks__/alt'));


describe('Test BudgetActions', function () {

  var BudgetActions, RawBudgetActions;

  beforeEach(function() {
    BudgetActions = require('../../actions/BudgetActions').default;
    RawBudgetActions = require('../../actions/BudgetActions').BudgetActions;
  });

  it('should generate actions', function () {
    const generatedactions = Object.getOwnPropertyNames(Object.getPrototypeOf(BudgetActions));
    const actions = [
      'constructor',
      'updateIncome',
      'updateBudgetBlockItemTitle',
      'reorderBudgetBlocks',
      'addBlockLayout',
      'addBudgetBlock',
      'removeBudgetBlock',
      'updateBudgetBlockTitle',
      'addBudgetBlockItem',
      'removeBudgetBlockItem',
      'updateBudgetBlockItemValue'
    ];
    actions.forEach((action) => expect(generatedactions).toContain(action));
  });

  it('actions should return correct data', function () {
    const data = 'cats';
    const data2 = 'cats2';
    const data3 = 'cats3';
    let actions = new RawBudgetActions();
    expect(actions.updateIncome(data)).toEqual(data);
    expect(actions.addBudgetBlock(data)).toEqual(data);
    expect(actions.removeBudgetBlock(data)).toEqual(data);
    expect(actions.updateBudgetBlockTitle(data, data2)).toEqual({
      blockId: data,
      title: data2
    });
    expect(actions.addBudgetBlockItem(data, data2, data3)).toEqual({
      blockId: data,
      title: data2,
      value: data3
    });
    expect(actions.removeBudgetBlockItem(data, data2)).toEqual({
      blockId: data,
      blockItemId: data2
    });
    expect(actions.updateBudgetBlockItemValue(data, data2, data3)).toEqual({
      blockId: data,
      blockItemId: data2,
      value: data3
    });
    expect(actions.updateBudgetBlockItemTitle(data, data2, data3)).toEqual({
      blockId: data,
      blockItemId: data2,
      title: data3
    });
    expect(actions.reorderBudgetBlocks(data, data2)).toEqual({
      movingBlockId: data,
      replacedBlockId: data2
    });
  });

});

describe('Test PersistenceActions', function () {

  var PersistenceActions;

  beforeEach(function() {
    PersistenceActions = require('../../actions/PersistenceActions').default;
  });

  it('should generate actions', function () {
    expect(PersistenceActions).toEqual(['loadPersistentState', 'persistState']);
  });

});


describe('Test UIActions', function () {

  var UIActions;

  beforeEach(function() {
    UIActions = require('../../actions/UIActions').default;
  });

  it('should generate actions', function () {
    expect(UIActions).toEqual(['toggleCurrencyPicker', 'setCurrencySymbol', 'toggleEditControls']);
  });

});

