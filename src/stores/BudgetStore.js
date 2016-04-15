import alt from '../alt';
import BudgetActions from '../actions/BudgetActions';
import uuid from '../utils/uuid';
import minFloat from '../utils/minFloat';
import objectMap from '../utils/objectMap';

export function orderedBlocks(blocks) {

  if (!blocks) {
    return [];
  }

  return objectMap(blocks).sort((a, b) => a.obj.order - b.obj.order);
}

export class BudgetStore {

  constructor () {
    this.budgets = {};
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
      onUpdateBudgetBlockItemTitle: BudgetActions.UPDATE_BUDGET_BLOCK_ITEM_TITLE,
      onReorderBudgetBlocks: BudgetActions.REORDER_BUDGET_BLOCKS
    });
  }

  _recalculateBlockTotals() {

    var incomeSubtotal = minFloat(this.income);

    for (let keyBlock of orderedBlocks(this.budgets)) {

      const blockKey = keyBlock.key;
      const block = keyBlock.obj;

      if (block.items) {
        for (let budgetKey of Object.keys(block.items)) {
          incomeSubtotal -= parseFloat(minFloat(block.items[budgetKey].value));
        }
      }

      this.budgets[blockKey].subtotal = incomeSubtotal;
    }
  }

  onUpdateIncome(income) {
    this.income = income;
    this._recalculateBlockTotals();
  }

  // Block actions

  onAddBudgetBlock(title) {
    this.budgets[uuid()] = {
      'title': title,
      'subtotal': '0',
      'order': Object.keys(this.budgets).length + 1,
      'items': {}
    };
    this._recalculateBlockTotals();
  }

  onRemoveBudgetBlock(blockId) {
    delete this.budgets[blockId];
    this._recalculateBlockTotals();
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
    this._recalculateBlockTotals();
  }

  onRemoveBudgetBlockItem(payload) {
    delete this.budgets[payload.blockId].items[payload.blockItemId];
    this._recalculateBlockTotals();
  }

  onUpdateBudgetBlockItemValue(payload) {
    this.budgets[payload.blockId].items[payload.blockItemId] = {
      'title': this.budgets[payload.blockId].items[payload.blockItemId].title,
      'value': payload.value
    };
    this._recalculateBlockTotals();
  }

  onUpdateBudgetBlockItemTitle(payload) {
    this.budgets[payload.blockId].items[payload.blockItemId] = {
      'title': payload.title,
      'value': this.budgets[payload.blockId].items[payload.blockItemId].value,
    };
  }

  onReorderBudgetBlocks(payload) {
    let replacedBlockOrder = this.budgets[payload.replacedBlockId].order;
    let movingBlockOrder = this.budgets[payload.movingBlockId].order;

    this.budgets[payload.movingBlockId].order = replacedBlockOrder;
    this.budgets[payload.replacedBlockId].order = movingBlockOrder;

    this._recalculateBlockTotals();
  }

}

export default alt.createStore(BudgetStore, 'BudgetStore');
