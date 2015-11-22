import alt from '../alt';

import BudgetActions from '../actions/BudgetActions';

export class BudgetStore {

  constructor () {
    this.budgets = [
        {'title': 'cat'}
    ];

    this.bindListeners({
      handleUpdateBudgets: BudgetActions.UPDATE_BUDGETS,
    });
  }

  handleUpdateBudgets(budgets) {
    this.budgets = budgets;
  }

}

export default alt.createStore(BudgetStore, 'BudgetStore');
