import alt from '../alt';

export class BudgetActions {

  addBudgetBlock(title) {
    this.dispatch(title);
  }

  updateIncome(income) {
    this.dispatch(income);
  }
}

export default alt.createActions(BudgetActions);
