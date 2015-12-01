import alt from '../alt';

export class BudgetActions {

  updateIncome(income) {
    this.dispatch(income);
  }

  addBudgetBlock(title) {
    this.dispatch(title);
  }

  updateBudgetBlockItemValue(blockId, blockItemId, value) {
    this.dispatch({
      blockId: blockId,
      blockItemId: blockItemId,
      value: value
    });
  }
}

export default alt.createActions(BudgetActions);
