import alt from '../alt';

const PersistenceActions = alt.generateActions(
  'loadPersistentState', 'persistState'
);

export default alt.createActions(PersistenceActions);
