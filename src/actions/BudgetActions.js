import alt from '../alt';

export class BudgetActions {

  updateBudgets(messages) {
    this.dispatch(messages);
  }

}

export default alt.createActions(BudgetActions);
