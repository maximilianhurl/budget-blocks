import alt from '../alt';

import BudgetActions from '../actions/BudgetActions';

export class BudgetStore {

  constructor () {
    this.budgets = [
      {
        'id': '1',
        'title': 'cat',
        'outgoings': [
          {
            'title': 'cat food',
            'value': '10'
          }
        ]
      }
    ];

    this.income = '0';

    //could do `this.bindActions(BudgetActions);` instead
    this.bindListeners({
      handleUpdateIncome: BudgetActions.UPDATE_INCOME,
      handleAddBudgetBlock: BudgetActions.ADD_BUDGET_BLOCK
    });
  }

  handleAddBudgetBlock(title) {
    console.log('handleAddBlock ' + title);
    this.budgets.push({
      'id': '1',
      'title': title,
      'outgoings': []
    });
  }

  handleAddBudgetBlockOutgoing(blockId, title, value) {
    console.log('handleAddBlockOutgoing ' + title + ' ' + value);
  }

  handleUpdateIncome(income) {
    this.income = income;
  }

}

export default alt.createStore(BudgetStore, 'BudgetStore');
