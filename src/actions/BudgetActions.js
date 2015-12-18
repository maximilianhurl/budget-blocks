import alt from '../alt';

/*

Could be simplified to the following as they have no transforms

const PersistenceActions = alt.generateActions(
  'updateIncome', 'addBudgetBlock', 'updateBudgetBlockItemValue'
);

*/

export class BudgetActions {

  updateIncome(income) {
    return income;
  }

  addBudgetBlock(title) {
    return title;
  }

  updateBudgetBlockItemValue(blockId, blockItemId, value) {
    return {
      blockId: blockId,
      blockItemId: blockItemId,
      value: value
    };
  }
}

export default alt.createActions(BudgetActions);
