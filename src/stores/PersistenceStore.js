import alt from '../alt';
import React from 'react-native';
import PersistenceActions from '../actions/PersistenceActions';
import BudgetActions from '../actions/BudgetActions';
import BudgetStore from '../stores/BudgetStore';

const { AsyncStorage } = React;

const STORAGE_KEY = '@BudgetBlocks:state-data';

export class PersistenceStore {

  constructor () {
    this.bindActions(PersistenceActions);
    this.bindListeners({
      onPersistState: [
        BudgetActions.updateIncome,
        BudgetActions.addBudgetBlock,
        BudgetActions.removeBudgetBlock,
        BudgetActions.updateBudgetBlockTitle,
        BudgetActions.addBudgetBlockItem,
        BudgetActions.removeBudgetBlockItem,
        BudgetActions.updateBudgetBlockItemValue,
        BudgetActions.updateBudgetBlockItemTitle,
        BudgetActions.reorderBudgetBlocks,
      ]
    });
  }

  /*

  ==========
  TO DO
  ==========

  ASYNC code should taken out of here and put in seperate actions
  or should use the alt.js datasource (http://alt.js.org/docs/async/)

  If as actions it should have an action for loadingPersistState and
  dispatch another for loadedPersistantState. (http://alt.js.org/guide/async/)

  */

  onPersistState() {
    this.waitFor(BudgetStore);

    let snapshot = alt.takeSnapshot();

    AsyncStorage.setItem(STORAGE_KEY, snapshot).then(() => {
    }).catch((error) => {
      console.error(error);
    });
  }

  onLoadPersistentState() {

    AsyncStorage.getItem(STORAGE_KEY).then((persistentState) => {
      if (persistentState) {
        alt.bootstrap(persistentState);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}

export default alt.createStore(PersistenceStore, 'PersistenceStore');
