import alt from '../alt';

var React = require('react-native');
var { AsyncStorage } = React;
import PersistenceActions from '../actions/PersistenceActions';

const STORAGE_KEY = '@BasicBudgets:state-data';

export class PersistenceStore {

  constructor () {

    this.bindListeners({
      handlePersistState: PersistenceActions.PERSIST_STATE,
      handlelLoadPersistentState: PersistenceActions.LOAD_PERSISTENT_STATE,
    });
  }

  /*

  ==========
  TO DO
  ==========

  ASYNC code should taken out of here and put in seperate actions
  or should use the alt.js datasource (http://alt.js.org/docs/async/)

  If as actions it should have an action for loadingPersistState and
  dispatch another for loadedPersistantState.

  */

  handlePersistState() {
    console.log('persist state');
    let snapshot = alt.takeSnapshot();
    console.log(snapshot);

    AsyncStorage.setItem(STORAGE_KEY, snapshot).then(() => {
      console.log('State persisted');
    }).catch((error) => {
      console.error(error);
    });
  }

  handlelLoadPersistentState() {
    console.log('load state');

    AsyncStorage.getItem(STORAGE_KEY).then((persistentState) => {
      console.log('State loaded from disk');
      console.log(persistentState);
      if (persistentState) {
        alt.bootstrap(persistentState);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}

export default alt.createStore(PersistenceStore, 'PersistenceStore');
