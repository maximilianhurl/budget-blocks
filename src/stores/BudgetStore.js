import alt from '../alt';

import BudgetActions from '../actions/BudgetActions';
import uuid from '../utils/uuid';
import minFloat from '../utils/minFloat';

export class BudgetStore {

  constructor () {
    this.budgets = {
      '1': {
        'id': '1',
        'title': 'cat',
        'items': {
          '2' : {
            'title': 'cat food',
            'value': '10'
          },
          '3' : {
            'title': 'dog food',
            'value': '40'
          }
        },
        'subtotal': '-20'
      },
    };

    this.income = '0';

    //could do `this.bindActions(BudgetActions);` instead
    this.bindListeners({
      onUpdateIncome: BudgetActions.UPDATE_INCOME,
      onAddBudgetBlock: BudgetActions.ADD_BUDGET_BLOCK,
      onRemoveBudgetBlock: BudgetActions.REMOVE_BUDGET_BLOCK,
      onUpdateBudgetBlockTitle: BudgetActions.UPDATE_BUDGET_BLOCK_TITLE,
      onAddBudgetBlockItem: BudgetActions.ADD_BUDGET_BLOCK_ITEM,
      onRemoveBudgetBlockItem: BudgetActions.REMOVE_BUDGET_BLOCK_ITEM,
      onUpdateBudgetBlockItemValue: BudgetActions.UPDATE_BUDGET_BLOCK_ITEM_VALUE,
      onUpdateBudgetBlockItemTitle: BudgetActions.UPDATE_BUDGET_BLOCK_ITEM_TITLE
    });
  }

  _recalculateBlockTotals() {

    var incomeSubtotal = minFloat(this.income);

    for (let key of Object.keys(this.budgets)) {
      var block = this.budgets[key];
      if (block.items) {
        for (let budgetKey of Object.keys(block.items)) {
          incomeSubtotal -= parseFloat(block.items[budgetKey].value);
        }
      }

      block.subtotal = incomeSubtotal;
    }
  }

  onUpdateIncome(income) {
    this.income = income;
    this._recalculateBlockTotals();
  }

  // Block actions

  onAddBudgetBlock(title) {
    console.log('handleAddBlock ' + title);
    this.budgets[uuid()] = {
      'title': title,
      'subtotal': '0',
      'items': {}
    };
    this._recalculateBlockTotals();
  }

  onRemoveBudgetBlock(blockId) {
    delete this.budgets[blockId];
  }

  onUpdateBudgetBlockTitle(payload) {
    this.budgets[payload.blockId].title = payload.title;
  }

  // Block Item actions

  onAddBudgetBlockItem(payload) {
    this.budgets[payload.blockId].items[uuid()] = {
      'title': payload.title,
      'value': payload.value
    };
  }

  onRemoveBudgetBlockItem(payload) {
    delete this.budgets[payload.blockId].items[payload.blockItemId];
  }

  onUpdateBudgetBlockItemValue(payload) {
    this.budgets[payload.blockId].items[payload.blockItemId] = {
      'title': this.budgets[payload.blockId].items[payload.blockItemId].title,
      'value': minFloat(payload.value)
    };
    this._recalculateBlockTotals();
  }

  onUpdateBudgetBlockItemTitle(payload) {
    this.budgets[payload.blockId].items[payload.blockItemId] = {
      'title': payload.title,
      'value': this.budgets[payload.blockId].items[payload.blockItemId].value,
    };
  }

}

export default alt.createStore(BudgetStore, 'BudgetStore');
