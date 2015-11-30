import alt from '../alt';

import BudgetActions from '../actions/BudgetActions';
import uuid from '../utils/uuid';

export class BudgetStore {

  constructor () {
    this.budgets = {
      '1': {
        'id': '1',
        'title': 'cat',
        'outgoings': {
          '2' : {
            'title': 'cat food',
            'value': '10'
          },
          '3' : {
            'title': 'dog food',
            'value': '10'
          }
        }
      },
    };

    this.income = '0';

    //could do `this.bindActions(BudgetActions);` instead
    this.bindListeners({
      handleUpdateIncome: BudgetActions.UPDATE_INCOME,
      handleAddBudgetBlock: BudgetActions.ADD_BUDGET_BLOCK
    });
  }

  handleAddBudgetBlock(title) {
    console.log('handleAddBlock ' + title);
    this.budgets[uuid()] = {
      'title': title,
      'outgoings': {}
    };
  }

  handleAddBudgetBlockOutgoing(blockId, title, value) {
    console.log('handleAddBlockOutgoing ' + title + ' ' + value);
    this.budgets[blockId][uuid] = {
      'title': title,
      'value': value
    };
  }

  handleUpdateIncome(income) {
    this.income = income;
  }

}

export default alt.createStore(BudgetStore, 'BudgetStore');
