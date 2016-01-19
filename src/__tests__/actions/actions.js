/* global jest, describe, it, expect, beforeEach */

jest.dontMock('../../actions/BudgetActions');
jest.setMock('alt', require('../../__mocks__/alt'));


describe('Test BudgetActions', function () {

  var BudgetActions;

  beforeEach(function() {
    BudgetActions = require('../../actions/BudgetActions').default;
  });

  it('should generate actions', function () {
    expect(Object.getOwnPropertyNames(Object.getPrototypeOf(BudgetActions))).toEqual([
      'constructor',
      'updateIncome',
      'addBudgetBlock',
      'removeBudgetBlock',
      'updateBudgetBlockTitle',
      'addBudgetBlockItem',
      'removeBudgetBlockItem',
      'updateBudgetBlockItemValue',
      'updateBudgetBlockItemTitle'
    ]);
  });

});

describe('Test PersistenceActions', function () {

  var PersistenceActions;

  beforeEach(function() {
    PersistenceActions = require('../../actions/PersistenceActions').default;
  });

  it('should generate actions', function () {
    expect(PersistenceActions).toEqual([]);
  });

});

