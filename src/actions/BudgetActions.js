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

  removeBudgetBlock(blockId) {
    return blockId;
  }

  updateBudgetBlockTitle(blockId, title) {
    return {
      blockId: blockId,
      title: title
    };
  }

  addBudgetBlockItem(blockId, title, value) {
    return {
      blockId: blockId,
      title: title,
      value: value
    };
  }

  updateBudgetBlockItemValue(blockId, blockItemId, value) {
    return {
      blockId: blockId,
      blockItemId: blockItemId,
      value: value
    };
  }

  updateBudgetBlockItemTitle(blockId, blockItemId, title) {
    return {
      blockId: blockId,
      blockItemId: blockItemId,
      title: title
    };
  }
}

export default alt.createActions(BudgetActions);
