import alt from '../alt';

export class PersistenceActions {

  loadPersistentState() {
    this.dispatch();
  }

  persistState() {
    this.dispatch();
  }
}

export default alt.createActions(PersistenceActions);
