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
      onUpdateBudgetBlockItemValue: BudgetActions.UPDATE_BUDGET_BLOCK_ITEM_VALUE
    });
  }

  onAddBudgetBlock(title) {
    console.log('handleAddBlock ' + title);
    this.budgets[uuid()] = {
      'title': title,
      'subtotal': '0',
      'items': {}
    };
    this.recalculateBlockTotals();
  }

  onAddBudgetBlockOutgoing(blockId, title, value) {
    console.log('handleAddBlockOutgoing ' + title + ' ' + value);
    this.budgets[blockId][uuid()] = {
      'title': title,
      'value': value
    };
    this.recalculateBlockTotals();
  }

  onUpdateIncome(income) {
    this.income = income;
    this.recalculateBlockTotals();
  }

  onUpdateBudgetBlockItemValue(data) {

    this.budgets[data.blockId].items[data.blockItemId] = {
      'title': this.budgets[data.blockId].items[data.blockItemId].title,
      'value': minFloat(data.value)
    };

    this.recalculateBlockTotals();
  }

  recalculateBlockTotals() {

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

}

export default alt.createStore(BudgetStore, 'BudgetStore');
